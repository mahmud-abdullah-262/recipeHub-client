export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">
      <div className="text-center max-w-md">
        
        {/* Glow Circle */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-40 h-40 bg-[#f99f1d] blur-3xl opacity-30 rounded-full" />
          </div>

          <h1 className="relative text-8xl font-black text-white tracking-tight">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page not found
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn’t exist or has been moved.
          Try going back to the homepage.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl
                     bg-[#f99f1d] text-black font-semibold
                     hover:scale-105 active:scale-95
                     transition-all duration-200 shadow-lg shadow-[#f99f1d]/30"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}