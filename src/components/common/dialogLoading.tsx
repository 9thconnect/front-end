import { Copy, CheckCircle, XCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type DialogLoadingProps = {
  open: boolean;
  status: "idle" | "success" | "error" | "loading";
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  successDescription?: string;
  errorDescription?: string;
  onSuccessButtonClick?: () => void;
  onErrorButtonClick?: () => void;
  onClose?: () => void;
  successButtonText?: string;
  errorButtonText?: string;
  cancelButtonText?: string;
  hideCancelButton?: boolean;
};

export function DialogLoading({
  open,
  status,
  successMessage = "Success!",
  errorMessage = "An error occurred",
  loadingMessage = "Loading, please wait...",
  successDescription,
  errorDescription,
  onSuccessButtonClick,
  onErrorButtonClick,
  onClose,
  successButtonText = "Next Action",
  errorButtonText = "Retry",
  cancelButtonText = "Cancel",
  hideCancelButton = false,
}: DialogLoadingProps) {
  const renderIcon = () => {
    if (status === "loading")
      return (
        <div className="flex flex-col items-center justify-center">
          <LoaderCircle className="h-14 w-14 animate-spin" />
          <p className="mt-4 text-offBlack text-lg mb-10">{loadingMessage}</p>
        </div>
      );

    if (status === "success")
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#2AA44B1A] inline-block p-2 rounded-full">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
          <div className="text-center">
            <p className="mt-4 text-offBlack text-2xl">{successMessage}</p>
            {successDescription && <p className="mt-2">{successDescription}</p>}
            <div className="grid grid-cols-3 items-center gap-2 mt-10">
              <Button className="col-span-2" onClick={onSuccessButtonClick}>
                {successButtonText}
              </Button>
              {!hideCancelButton && (
                <Button
                  variant={"outline"}
                  className="col-span-1"
                  onClick={onClose}
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );

    if (status === "error")
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#a42a2e1a] inline-block p-2 rounded-full">
            <XCircle className="h-14 w-14 text-red-500" />
          </div>
          <div className="text-center">
            <p className="mt-4 text-offBlack text-2xl">{errorMessage}</p>
            {errorDescription && <p className="mt-2">{errorDescription}</p>}
            <div className="grid grid-cols-3 items-center gap-2 mt-10">
              <Button className="col-span-2" onClick={onErrorButtonClick}>
                {errorButtonText}
              </Button>
              {!hideCancelButton && (
                <Button
                  variant={"outline"}
                  className="col-span-1"
                  onClick={onClose}
                >
                  {cancelButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );

    return (
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle className="h-14 w-14 animate-spin" />
        <p className="mt-4 text-offBlack text-lg mb-10">MC DONALD</p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex justify-center items-center pt-24 pb-2">
        {renderIcon()}
      </DialogContent>
    </Dialog>
  );
}

{
  /* <DialogLoading
  open={true}
  status="loading"
  loadingMessage="Processing your request..."
/>
<DialogLoading
  open={true}
  status="error"
  errorMessage="Failed to Update"
  errorDescription="There was an error updating your profile."
  onErrorButtonClick={() => console.log("Retry action")}
  onClose={() => console.log("Close dialog")}
/>

<DialogLoading
  open={true}
  status="success"
  successMessage="Profile Updated"
  successDescription="Your profile has been successfully updated."
  onSuccessButtonClick={() => console.log("Next action")}
  onClose={() => console.log("Close dialog")}
/> */
}
