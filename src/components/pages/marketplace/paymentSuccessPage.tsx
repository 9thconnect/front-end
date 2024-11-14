"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { LottieComponentProps } from "lottie-react";
import { Skeleton } from "@/components/ui/skeleton";

import successAnimation from "@/components/lotties/success.json";
import errorAnimation from "@/components/lotties/error.json";
import loadingAnimation from "@/components/lotties/loading.json";
import PaymentReceipt from "@/components/common/paymentReceipt";
import { BaseResponse, SingleTransactionData } from "@/type/common";
import { Printer, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import requests from "@/utils/requests";

const Lottie = dynamic<LottieComponentProps>(() => import("lottie-react"), {
  ssr: false,
});

const fetchPaymentData = async (): Promise<
  BaseResponse<SingleTransactionData>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        message: "yes yes ye",
        data: {
          _id: "66e3860dc548b6294ef05bca",
          customer: {
            _id: "66c4d700bdb4cd1259f1dd84",
            fullName: "Praise Amadi",
            avatar:
              "https://res.cloudinary.com/dd3skpojo/image/upload/v1724174175/Nav_Component_q3n6kk.png",
          },
          invoiceRef: "MCD-1726187034201",
          payerName: "Praise Amadi",
          payerEmail: "o.ayomikun@gmail.com",
          payerPhoneNumber: "08188693232",
          amount: 8000,
          paymentCompleted: true,
          paymentDate: "2024-09-13T00:23:41.345Z",
          order: {
            _id: "66e3860dc548b6294ef05bc8",
            orderItems: [
              {
                name: "Belland",
                quantity: 1,
                image:
                  "https://res.cloudinary.com/dddofgfei/image/upload/v1721951829/b7qkzrk58st2i4buggkx.jpg",
                price: 8000,
                productId: "66d38b26d93d3d1abaf80604",
                seller: "66afcc440497b2b04cd038de",
                MCDFee: 160,
                sellerPay: 7840,
                total: 8000,
                _id: "66e3860ec548b6294ef05bcf",
              },
            ],
            orderID: "MCD3655005",
            status: "cancelled",
          },
          paymentFor: "order",
          status: "approved",
          createdAt: "2024-09-13T00:23:42.314Z",
          updatedAt: "2024-09-13T00:24:30.323Z",
          ipAddress: "52.209.154.143",
          payment_options: "card",
        },
      });
    }, 3000);
  });
};

const ReceiptSkeleton = () => (
  <div className="w-full max-w-2xl mx-auto mt-8 space-y-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/3" />
    </div>

    <div className="space-y-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>

    <div className="space-y-2">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);

const PaymentStatusPage: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] =
    useState<any>(loadingAnimation);
  const [isLoading, setIsLoading] = useState(true);
  const [isReceiptLoading, setIsReceiptLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Processing Payment..."
  );
  const [paymentData, setPaymentData] = useState<SingleTransactionData | null>(
    null
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const code = searchParams.get("code");
  const ref = searchParams.get("linkingreference");

  const handleDownload = async () => {
    if (!receiptRef.current || !paymentData) return;

    setIsDownloading(true);
    try {
      // Clone the receipt element for PDF generation
      const receiptElement = receiptRef.current;
      const clone = receiptElement.cloneNode(true) as HTMLElement;

      // Apply specific styles for PDF generation
      clone.style.width = "210mm"; // A4 width
      clone.style.margin = "0";
      clone.style.padding = "20px";
      clone.style.backgroundColor = "white";

      // Temporarily append clone to document for capturing
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      document.body.appendChild(clone);

      // Capture the receipt as canvas
      const canvas = await html2canvas(clone, {
        scale: 3, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // Additional style fixes in the cloned document
          const styleEl = clonedDoc.createElement("style");
          styleEl.innerHTML = `
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `;
          clonedDoc.head.appendChild(styleEl);
        },
      });

      // Remove the clone after capturing
      document.body.removeChild(clone);

      // Create PDF with proper dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      // Add image to PDF with proper scaling
      const margins = {
        top: 10,
        left: 0,
      };

      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        margins.left,
        margins.top,
        imgWidth,
        imgHeight,
        undefined,
        "MEDIUM"
      );

      // If content exceeds page height, handle multiple pages
      if (imgHeight > pageHeight - margins.top * 2) {
        let remainingHeight = imgHeight;
        let currentPage = 1;

        while (remainingHeight > 0) {
          remainingHeight -= pageHeight - margins.top * 2;
          if (remainingHeight > 0) {
            pdf.addPage();
            currentPage++;
            pdf.addImage(
              canvas.toDataURL("image/jpeg", 1.0),
              "JPEG",
              margins.left,
              -(pageHeight - margins.top * 2) * (currentPage - 1) + margins.top,
              imgWidth,
              imgHeight,
              undefined,
              "MEDIUM"
            );
          }
        }
      }

      // Generate filename with current date
      const fileName = `receipt-${paymentData.invoiceRef}-${format(
        new Date(),
        "yyyy-MM-dd"
      )}.pdf`;

      // Download PDF
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!receiptRef.current) return;

    // Create a new window for printing
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    // Get all stylesheets from the current document
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          const cssRules = Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
          return cssRules;
        } catch (e) {
          // Skip external stylesheets that might cause CORS issues
          return "";
        }
      })
      .join("\n");

    // Add necessary styles for the receipt
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            ${styles}
            
            /* Additional print-specific styles */
            @media print {
              body {
                margin: 0;
                padding: 20px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: A4;
                margin: 20mm;
              }
            }
            /* Container styles */
            .print-container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            /* Hide any elements we don't want to print */
            .no-print {
              display: none !important;
            }
          </style>
          <!-- Include Tailwind directly -->
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div class="print-container">
            ${receiptRef.current.outerHTML}
          </div>
          <script>
            // Auto print when content is loaded
            window.onload = function() {
              // Small delay to ensure styles are applied
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 500);
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  useEffect(() => {
    const loadData = async () => {
      if (
        !ref ||
        (status && status !== "successful") ||
        (code && code !== "00")
      ) {
        setCurrentAnimation(errorAnimation);
        setStatusMessage("Payment Error");
        setIsLoading(false);
        setIsReceiptLoading(false);
        return;
      }

      try {
        // First show success animation
        setCurrentAnimation(successAnimation);
        setStatusMessage("Payment Successful");
        setIsLoading(false);

        // Then fetch receipt data
        const response = await requests.get<SingleTransactionData>(
          `payment/${ref}`
        );
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setStatusMessage("Error loading receipt");
      } finally {
        setIsReceiptLoading(false);
      }
    };

    loadData();
  }, [status, code]);

  console.log(status, code);

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="bg-white rounded-2xl py-12 px-6 w-full max-w-2xl flex justify-center items-center flex-col mb-5">
        <div className="w-64 h-64">
          <Lottie animationData={currentAnimation} loop />
        </div>
        <p className="text-2xl font-bold mt-4 mb-8">{statusMessage}</p>
      </div>

      {(status === "successful" || code === "00") && (
        <>
          {isReceiptLoading ? (
            <ReceiptSkeleton />
          ) : (
            paymentData && (
              <div className="w-full max-w-2xl">
                <div className="flex gap-4 justify-end mb-4">
                  <Button
                    variant="outline"
                    onClick={handlePrint}
                    className="flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print Receipt
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </Button>
                </div>
                <div ref={receiptRef}>
                  <PaymentReceipt paymentData={paymentData} />
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default PaymentStatusPage;
