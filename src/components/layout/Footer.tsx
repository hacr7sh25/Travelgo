import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - App info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>&copy; 2025 TravelGo. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Your ultimate travel companion</span>
          </div>

          {/* Right side - Built with Bolt.new badge */}
          <div className="flex items-center">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <span>Built with</span>
              <span className="text-red-500">❤️</span>
              <span>using</span>
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bolt.new
              </span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Mobile stacked version */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Designed with passion for detail and a passion for good food and travel.
          </p>
        </div>
      </div>
    </footer>
  );
}