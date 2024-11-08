import React from "react";
import { MapPin } from "lucide-react";
import SectionContainer from "@/components/cards/common/sectionContainer";

const PhysicalMarketPage = () => {
  return (
    <SectionContainer className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 border">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Physical Market
          </h1>
          <div className="flex items-center justify-center text-gray-600 mb-8">
            <MapPin className="h-5 w-5 mr-2" />
            <p className="text-lg">
              Enugu State International Building Materials Market, Uguwaji,
              Enugu
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video Section */}
          <div className="rounded-lg shadow-xl bg-white p-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-lg"
                src="https://www.youtube.com/embed/L6PNwSg9nkY"
                title="Market Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Everything You Need Under One Roof
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to 9th Marketplace's physical location at Enugu State
                International Building Materials Market. Our market hosts
                numerous vendors offering a comprehensive selection of building
                materials and home improvement products.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Wide range of building materials</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Quality products from trusted vendors</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Expert advice and guidance</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <p className="text-blue-800 font-medium">
                Take a virtual tour through our market to discover the extensive
                range of products we offer for building your dream home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PhysicalMarketPage;
