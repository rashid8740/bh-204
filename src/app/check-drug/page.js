"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { useImage } from "@/context/ImageContext";

export default function CheckDrug() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "camera";
  const { setCapturedImage } = useImage();
  const fileInputRef = useRef(null);

  const handleBackClick = () => {
    router.push("/");
  };

  const handleTakePicture = () => {
    router.push("/check-drug/camera-permission");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        router.push("/check-drug/preview");
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCameraMode = () => (
    <div className="flex flex-col md:flex-row md:space-x-8 items-start md:items-stretch">
      <div className="w-full md:w-1/2 flex items-start">
        <div className="w-full aspect-[4/3] relative">
          <Image
            src="/images/drug-package.png"
            alt="Example of drug packaging"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
        <div className="flex-grow">
          <p className="text-xl leading-relaxed">
            Please take a <strong className="text-black">clear</strong> and
            well-lit picture of the drug packaging where the{" "}
            <strong className="text-black">batch number</strong> is printed.
            Make sure the entire batch number is
            <strong className="text-black"> fully visible</strong> and in focus,
            avoiding any glare or obstructions that could obscure the text.
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleBackClick}
            className="px-8 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
          >
            Back
          </button>
          <button
            onClick={handleTakePicture}
            className="px-8 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-150 ease-in-out"
          >
            Take a picture
          </button>
        </div>
      </div>
    </div>
  );

  const renderGalleryMode = () => (
    <div className="flex flex-col justify-between">
      <div className="flex-grow">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="w-full"
          />
          <p className="text-center text-gray-500 mt-2">Select an image file</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleBackClick}
          className="px-8 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          Back
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-8 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-150 ease-in-out"
        >
          Upload
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="px-4 py-8 max-w-5xl mx-auto">
        {mode === "gallery" ? renderGalleryMode() : renderCameraMode()}
      </main>
    </div>
  );
}
