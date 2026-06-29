"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Check, FileText, Scan, User, MapPin, Calendar, Shield } from "lucide-react";

export default function DocumentScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [documentType, setDocumentType] = useState("passport");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const extractedData = {
    passport: { name: "JOHN DOE", number: "AB123456", nationality: "USA", dob: "1990-05-15", expiry: "2028-03-20" },
    visa: { type: "Tourist", country: "Argentina", validity: "90 days", entry: "Multiple" },
    id: { name: "JOHN DOE", number: "DL-12345678", state: "California", dob: "1990-05-15" },
  };

  const data = extractedData[documentType as keyof typeof extractedData];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <Scan className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl font-light">Document Scanner</h1>
            <p className="text-gray-500 mt-2">Scan your passport, visa, or ID with AI-powered OCR.</p>
          </div>

          <div className="flex gap-2 mb-8">
            {["passport", "visa", "id"].map((type) => (
              <button key={type} onClick={() => { setDocumentType(type); setScanned(false); }} className={`flex-1 py-3 rounded-xl text-sm capitalize transition-colors ${documentType === type ? "bg-white text-black" : "bg-white/5 text-gray-400"}`}>{type}</button>
            ))}
          </div>

          {!scanned ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center cursor-pointer hover:border-white/20 transition-all" onClick={() => fileInputRef.current?.click()}>
                {scanning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-blue-400">Scanning document...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">Tap to scan {documentType}</p>
                    <p className="text-xs text-gray-600 mt-1">Position document clearly in frame</p>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleScan} />
              <button onClick={handleScan} className="w-full h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload & Scan
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3 mb-2">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-emerald-400">Document scanned successfully!</span>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-3">
                <h3 className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" /> Extracted Information</h3>
                {Object.entries(data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-gray-400 capitalize">{key}</span>
                    <span className="text-sm font-medium">{value as string}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="h-12 rounded-xl bg-white text-black font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Confirm & Save
                </button>
                <button onClick={() => setScanned(false)} className="h-12 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2">
                  Re-scan
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}