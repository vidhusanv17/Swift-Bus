import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('english'), nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: t('hindi'), nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: t('punjabi'), nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-xs lg:text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLanguage.flag} {currentLanguage.nativeName}
        </span>
        <span className="text-xs font-medium text-gray-700 sm:hidden">
          {currentLanguage.flag}
        </span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2 border-b border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1 hidden lg:block">
            {t('selectLanguage')}
          </p>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2 py-1 lg:hidden">
            Language
          </p>
        </div>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 text-sm hover:bg-gray-50 transition-colors flex items-center space-x-2 lg:space-x-3 ${
              i18n.language === language.code 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{language.nativeName}</div>
              <div className="text-xs text-gray-500 hidden lg:block">{language.name}</div>
            </div>
            {i18n.language === language.code && (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;