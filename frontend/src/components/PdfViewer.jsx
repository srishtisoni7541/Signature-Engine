import React, { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Rnd } from "react-rnd";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SignatureCanvas from "./SignatureCanvas";
import { updateField, removeField } from "../reducers/fieldSlice";

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function cssBoxToPdfPoints(box, viewerRect, pagePoints) {
  const PX_TO_PT = 0.75;
  const leftPx = box.left - viewerRect.left;
  const topPx = box.top - viewerRect.top;

  return {
    x: leftPx * PX_TO_PT,
    y: (viewerRect.height - (topPx + box.height)) * PX_TO_PT,
    width: box.width * PX_TO_PT,
    height: box.height * PX_TO_PT,
  };
}

export default function PdfViewer({
  backendBaseUrl = "http://localhost:3000",
  pdfId,
}) {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [pagePoints, setPagePoints] = useState({ width: 595, height: 842 });
  const [pdfWidth, setPdfWidth] = useState(800);
  const fields = useSelector((s) => s.fields.list);
  const dispatch = useDispatch();
  const [signingField, setSigningField] = useState(null);

  // Calculate responsive PDF width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newWidth = Math.min(800, containerWidth - 40);
        setPdfWidth(newWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onPageLoadSuccess = (page) => {
    const view = page._pageInfo?.view;
    if (view) setPagePoints({ width: view[2], height: view[3] });
  };

  const relativeLeft = (f) =>
    viewerRef.current
      ? Math.max(0, f.left - viewerRef.current.getBoundingClientRect().left)
      : f.left;

  const relativeTop = (f) =>
    viewerRef.current
      ? Math.max(0, f.top - viewerRef.current.getBoundingClientRect().top)
      : f.top;

  const handleDragStop = (id, d) => {
    const viewerRect = viewerRef.current.getBoundingClientRect();
    dispatch(
      updateField({
        id,
        changes: { left: d.x + viewerRect.left, top: d.y + viewerRect.top },
      })
    );
  };

  const handleResizeStop = (id, ref, pos) => {
    const viewerRect = viewerRef.current.getBoundingClientRect();
    dispatch(
      updateField({
        id,
        changes: {
          left: pos.x + viewerRect.left,
          top: pos.y + viewerRect.top,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        },
      })
    );
  };

  const onSignatureSave = async (dataUrl) => {
    if (!signingField) return;

    try {
      const viewerRect = viewerRef.current.getBoundingClientRect();
      const coordsPts = cssBoxToPdfPoints(
        {
          left: signingField.left,
          top: signingField.top,
          width: signingField.width,
          height: signingField.height,
        },
        viewerRect,
        pagePoints
      );

      const payload = {
        pdfId,
        signatureBase64: dataUrl,
        coords: {
          page: signingField.page,
          x: coordsPts.x,
          y: coordsPts.y,
          width: coordsPts.width,
          height: coordsPts.height,
        },
        meta: { signer: "Demo User" },
      };

      const resp = await axios.post(
        `${backendBaseUrl}/pdf/save-signature`,
        payload
      );

      if (resp.data?.url) {
        toast.success(" Signature saved successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setSigningField(null);
      } else {
        toast.error("Signing failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ " + (err.response?.data?.message || err.message));
    }
  };

  if (!pdfId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full border border-white/20">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              No PDF Selected
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Please provide a PDF ID to start viewing and signing your document
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              PDF Signature Studio
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            ✨ Drag, resize, and sign your documents with ease
          </p>
        </div>

        {/* Main PDF Container */}
        <div
          ref={containerRef}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Stats Bar */}
          {fields.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-6 py-3">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">{fields.length}</span>
                  </div>
                  <span className="text-sm sm:text-base font-medium">
                    <span className="hidden sm:inline">
                      Signature Fields Available
                    </span>
                    <span className="sm:hidden">Fields</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Ready to Sign</span>
                </div>
              </div>
            </div>
          )}

          {/* PDF Viewer Area */}
          <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-b from-gray-50 to-white">
            <div
              ref={viewerRef}
              className="relative mx-auto"
              style={{ maxWidth: `${pdfWidth}px` }}
            >
              <Document
                file={`${backendBaseUrl}/files/originals/${pdfId}.pdf`}
                loading={
                  <div className="flex flex-col items-center justify-center py-24 sm:py-32">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200"></div>
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium animate-pulse">
                      Loading PDF...
                    </p>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center py-24 sm:py-32">
                    <div className="text-center max-w-md">
                      <div className="mx-auto h-16 w-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                        <svg
                          className="h-8 w-8 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-red-600 mb-2">
                        Failed to Load PDF
                      </p>
                      <p className="text-sm text-gray-500">
                        Please check the PDF ID and try again
                      </p>
                    </div>
                  </div>
                }
              >
                <Page
                  pageNumber={1}
                  width={pdfWidth}
                  onLoadSuccess={onPageLoadSuccess}
                  className="shadow-xl rounded-lg overflow-hidden"
                />
              </Document>

              {/* Signature Fields Overlay */}
              {fields.map((f) => {
                const x = relativeLeft(f);
                const y = relativeTop(f);
                return (
                  <Rnd
                    key={f.id}
                    size={{ width: f.width, height: f.height }}
                    position={{ x, y }}
                    bounds="parent"
                    cancel=".no-drag"
                    enableResizing={window.innerWidth >= 768}
                    disableDragging={window.innerWidth < 768}
                  >
                    <div className="h-full border-2 border-dashed border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl cursor-move hover:border-indigo-600 hover:shadow-lg transition-all duration-200 backdrop-blur-sm">
                      <div className="flex items-center justify-between h-full px-2 sm:px-3 py-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="h-6 w-6 sm:h-7 sm:w-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg
                              className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-indigo-700 truncate">
                            {f.type}
                          </span>
                        </div>
                        <div className="flex gap-1 sm:gap-2 flex-shrink-0 ml-2">
                          <button
                            type="button"
                            className="no-drag text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg
             bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSigningField(f);
                            }}
                            onTouchStart={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSigningField(f);
                            }}
                            aria-label="Sign field"
                          >
                            <span className="hidden sm:inline">✍️ Sign</span>
                            <span className="sm:hidden">✍️</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => dispatch(removeField(f.id))}
                            className="text-xs sm:text-sm px-2 py-1 sm:py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 font-semibold transition-all duration-200 hover:shadow-md transform hover:scale-105"
                            aria-label="Remove field"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  </Rnd>
                );
              })}
            </div>
          </div>
        </div>

        {/* Instructions Card - Only show when no fields */}
        {fields.length === 0 && (
          <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Getting Started
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-start p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Add signature fields to your document
                </p>
              </div>
              <div className="flex flex-col items-start p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Drag and resize fields to position them
                </p>
              </div>
              <div className="flex flex-col items-start p-4 bg-gradient-to-br from-pink-50 to-indigo-50 rounded-2xl border border-pink-100">
                <div className="h-10 w-10 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Click "Sign" to add your signature
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Modal */}
      {signingField && (
        <SignatureCanvas
          onSave={onSignatureSave}
          onCancel={() => setSigningField(null)}
        />
      )}
    </div>
  );
}
