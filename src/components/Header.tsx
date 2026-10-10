import React from 'react';
import { RoleMode, NavTab } from '../types';

interface HeaderProps {
  role: RoleMode;
  onRoleChange: (newRole: RoleMode) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  activeTab,
  onTabChange,
  unreadNotificationsCount,
  onOpenNotifications
}) => {
  const navTabs: { id: NavTab; label: string; icon: string }[] = [
    { id: 'activities', label: 'Activities', icon: 'dynamic_feed' },
    { id: 'milestones', label: 'Milestones', icon: 'military_tech' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
    { id: 'reports', label: 'Reports', icon: 'analytics' },
    { id: 'messages', label: 'Messages', icon: 'chat' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60">
      {/* Top Bar */}
      <div className="h-16 max-w-xl mx-auto px-4 flex items-center justify-between gap-2">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => onTabChange('activities')}
        >
          <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <span className="font-extrabold text-[18px] tracking-tight text-on-surface">EduTrack</span>
        </div>

        {/* Global Role Switcher Pill */}
        <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-lg">
          <button
            type="button"
            onClick={() => onRoleChange('parent')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              role === 'parent'
                ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_0_rgba(15,23,42,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Parent
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('teacher')}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              role === 'teacher'
                ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_3px_0_rgba(15,23,42,0.06)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Teacher
          </button>
        </div>

        {/* Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface animate-pulse" />
            )}
          </button>
          
          <div 
            title={role === 'parent' ? 'Parent Profile (Mr. & Mrs. Das)' : 'Educator Profile (Ms. Clara Evans)'}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="bg-surface-container-low border-t border-surface-container/60">
        <div className="max-w-xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 py-1.5 overflow-x-auto no-scrollbar">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all rounded-lg cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
