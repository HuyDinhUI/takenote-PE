import { useState, useEffect } from "react";

/**
 * Error429-Page-React.jsx
 * A responsive, accessible 429 Too Many Requests page built with React + Tailwind CSS.
 * Usage: import Error429 from './Error429-Page-React' and render <Error429 onRetry={...} />
 */

export default function Error429() {
  const [countdown, setCountdown] = useState(30); // seconds until retry enabled
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (countdown <= 0) {
      setDisabled(false);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleRetry = () => {
    if (disabled) return;
    
    // optionally reset countdown when retrying
    setCountdown(30);
    setDisabled(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Illustration */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
          {/* simple inline SVG illustration */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="w-44 h-44"
          >
            <rect x="10" y="10" width="200" height="200" rx="20" fill="#F8FAFC" />
            <g transform="translate(40,40)">
              <circle cx="50" cy="50" r="36" fill="#EEF2FF" />
              <path d="M28 48 L60 48" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" />
              <path d="M44 32 L44 64" stroke="#6366F1" strokeWidth="6" strokeLinecap="round" />
            </g>
            <rect x="38" y="150" width="144" height="10" rx="5" fill="#E6E6F9" />
          </svg>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">429</h1>
          <p className="text-xl font-semibold text-gray-600 mb-4">Too Many Requests</p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You’ve made too many requests in a short period of time. For your safety and to protect the
            service, we’ve temporarily limited requests from your client.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 justify-center md:justify-start">
            <button
              onClick={handleRetry}
              disabled={disabled}
              className={`inline-flex items-center justify-center px-6 py-2 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed ${
                disabled ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              aria-disabled={disabled}
            >
              Retry now
            </button>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-2 rounded-lg border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100"
            >
              Refresh page
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {disabled ? (
              <span>
                Try again in <strong className="text-gray-700">{countdown}s</strong>
                <span className="ml-2 inline-flex items-center">
                  <span className="w-2 h-2 rounded-full animate-pulse mr-1" />
                  Rate limit active
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                You can retry now. If the problem persists, contact support or check the API limits.
              </span>
            )}
          </div>

          <div className="mt-6 text-xs text-gray-400">
            <p>
              Tip: implement exponential backoff on the client to avoid hitting rate limits. Example: wait 1s,
              2s, 4s, 8s...
            </p>
          </div>
        </div>
      </div>

      {/* Small footer note */}
      <div className="absolute bottom-6 text-center w-full px-6">
        <p className="text-xs text-gray-400">If you think this is an error, please <a href="/support" className="underline">contact support</a>.</p>
      </div>
    </div>
  );
}
