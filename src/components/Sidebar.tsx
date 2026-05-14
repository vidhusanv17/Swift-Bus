import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Map, 
  Route, 
  MapPin, 
  Calendar, 
  LayoutDashboard, 
  Bus, 
  Users, 
  Navigation,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isMobileMenuOpen, 
  onMobileMenuToggle 
}) => {
  const { t } = useTranslation();

  const publicSections = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'routes', label: t('routes'), icon: Route },
    { id: 'stops', label: t('stops'), icon: MapPin },
    { id: 'schedule', label: t('schedule'), icon: Calendar },
  ];

  const adminSections = [
    { id: 'admin-panel', label: t('dashboard'), icon: LayoutDashboard },
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    onMobileMenuToggle(false); // Close mobile menu when section is selected
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => onMobileMenuToggle(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        flex flex-col h-full lg:h-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => onMobileMenuToggle(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Logo and App Name */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base lg:text-lg font-bold text-gray-900">{t('appTitle')}</h1>
              <p className="text-xs lg:text-sm text-gray-500">Punjab Transport</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* Public Section */}
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Public / ਜਨਤਕ
            </h2>
            <nav className="space-y-1">
              {publicSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Admin Panel Section */}
          <div className="p-4 border-t border-gray-200">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Admin Panel / ਪ੍ਰਸ਼ਾਸਨ
            </h2>
            <nav className="space-y-1">
              {adminSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;