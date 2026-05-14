import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Menu } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  lastUpdated: Date;
  onRefresh: () => void;
  isRefreshing: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, isRefreshing, onMobileMenuToggle }) => {
  const { t } = useTranslation();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex-1 lg:flex-none">
          <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
            {t('appTitle')}
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1 hidden sm:block">
            {t('appSubtitle')}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          
          <div className="text-right hidden md:block">
            <p className="text-xs lg:text-sm text-gray-500">{t('lastUpdated')}</p>
            <p className="text-sm font-medium text-gray-900">
              {formatTime(lastUpdated)}
            </p>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={`flex items-center px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw 
              className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
            <span className="hidden sm:inline">{t('refresh')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;