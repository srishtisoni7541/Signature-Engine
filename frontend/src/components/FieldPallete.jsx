
import { useDispatch } from "react-redux";
import { addField } from "../reducers/fieldSlice";

export default function FieldPalette({ onAddField }) {
  const dispatch = useDispatch();

  const isMobile = () => {
    return window.innerWidth < 1024; 
  };

  const handleAddSignature = () => {
    dispatch(addField("signature"));
    if (isMobile() && onAddField) {
      onAddField();
    }
  };

  const handleAddText = () => {
    dispatch(addField("text", { width: 260, height: 40 }));
    if (isMobile() && onAddField) {
      onAddField();
    }
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Field Palette
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Add fields to your document
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="group w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleAddSignature}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              <span className="text-base sm:text-lg">Add Signature Field</span>
            </div>
          </button>

          {/* Text Button */}
          <button
            className="group w-full relative overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] border border-gray-300"
            onClick={handleAddText}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              <span className="text-base sm:text-lg">Add Text Field</span>
            </div>
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="h-4 w-4 text-white"
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
              <span className="text-xs text-gray-500 font-medium">
                Signature
              </span>
            </div>
            <p className="text-lg font-bold text-indigo-600">Ready</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-8 w-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-500 font-medium">Text</span>
            </div>
            <p className="text-lg font-bold text-gray-700">Ready</p>
          </div>
        </div>
      </div>

      {/* Quick Tips Card */}
      <div className="mt-4 sm:mt-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20">
        {/* Tips Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Quick Tips
          </h4>
        </div>

        {/* Tips List */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 group">
            <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="h-4 w-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                <span className="font-semibold text-indigo-600">
                  Drag & Resize:
                </span>{" "}
                Move fields anywhere on the PDF
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="h-4 w-4 text-purple-600"
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
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                <span className="font-semibold text-purple-600">
                  Click Sign:
                </span>{" "}
                Draw your signature on canvas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg
                className="h-4 w-4 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-700 leading-relaxed">
                <span className="font-semibold text-pink-600">Auto Save:</span>{" "}
                All fields saved in Redux state
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tip Banner */}
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-amber-800 mb-1">
                Pro Tip
              </p>
              <p className="text-xs sm:text-sm text-amber-700">
                Place signature fields before signing for better accuracy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Card - Desktop Only */}
      <div className="hidden lg:block mt-4 sm:mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl p-6 border border-indigo-100">
        <h5 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          Keyboard Shortcuts
        </h5>
        <div className="space-y-2 text-xs text-indigo-700">
          <div className="flex items-center justify-between">
            <span>Delete Field</span>
            <kbd className="px-2 py-1 bg-white rounded border border-indigo-200 font-mono">
              Del
            </kbd>
          </div>
          <div className="flex items-center justify-between">
            <span>Move Field</span>
            <kbd className="px-2 py-1 bg-white rounded border border-indigo-200 font-mono">
              Arrow Keys
            </kbd>
          </div>
        </div>
      </div>
    </aside>
  );
}