
import React, { useState } from "react";
import PdfViewer from "./components/PdfViewer";
import FieldPalette from "./components/FieldPallete";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/30 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform duration-300">
                <svg className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Signature Engine
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">
                  Professional Document Signing Platform
                </p>
              </div>
            </div>

            {/* Tech Stack Badge - Desktop */}
            <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-lg border border-white/20">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                  </svg>
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-gray-700">React + Vite</div>
                  <div className="text-gray-500">Tailwind + Redux</div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white hover:scale-105 transition-transform"
            >
              {sidebarOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Tech Stack Badge */}
          <div className="lg:hidden mt-3 flex items-center gap-2 bg-white/60 backdrop-blur-xl rounded-xl px-3 py-2 shadow-md border border-white/20">
            <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              </svg>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-gray-700">React + Vite</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">Tailwind + Redux</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="hidden lg:flex gap-6 xl:gap-8">
          <div className="flex-1 min-w-0">
            <PdfViewer 
              backendBaseUrl={import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"} 
              pdfId="sample" 
            />
          </div>
          
          <div className="flex-shrink-0">
            <FieldPalette />
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          {/* Mobile Sidebar Toggle */}
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              ></div>
              
              {/* Sliding Sidebar */}
              <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 z-50 overflow-y-auto transform transition-transform duration-300 ease-out shadow-2xl">
                <div className="p-4 sm:p-6">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
                  >
                    <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <FieldPalette onAddField={() => setSidebarOpen(false)} />
                </div>
              </div>
            </>
          )}

          <div>
            <PdfViewer 
              backendBaseUrl={import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"} 
              pdfId="sample" 
            />
          </div>

          {/* Floating Action Button - Mobile */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-30 text-white"
              aria-label="Open field palette"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t border-white/20 backdrop-blur-sm bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium">Secure & Encrypted</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              © 2024 Signature Engine. Built with 💜 by your team
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="h-8 w-8 bg-white/60 backdrop-blur-xl rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-8 w-8 bg-white/60 backdrop-blur-xl rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                <svg className="h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}