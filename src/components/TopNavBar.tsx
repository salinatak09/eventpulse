import React, { useState } from 'react';
import { HOST_USER, ATTENDEE_PRESET_USER } from '../data/initialData';

interface TopNavBarProps {
  activeView: 'organizer' | 'attendee';
  onViewChange: (view: 'organizer' | 'attendee') => void;
  onCreateEventClick: () => void;
  onHelpClick: () => void;
  onNotificationClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeView,
  onViewChange,
  onCreateEventClick,
  onHelpClick,
  onNotificationClick,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#E2E8F0] shadow-xs sticky top-0 z-40 transition-colors">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16">
        {/* Left: Logo & Role Switcher */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => onViewChange('organizer')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shadow-xs group-hover:bg-[#004182] transition-colors">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                insights
              </span>
            </div>
            <span className="font-headline text-[22px] font-bold text-[#0A66C2] tracking-tight">
              EventPulse
            </span>
          </button>

          {/* Desktop View Switcher Pills */}
          <nav
            className="hidden md:flex items-center bg-[#F1F5F9] p-1 rounded-full border border-[#E2E8F0]"
            role="tablist"
          >
            <button
              role="tab"
              aria-selected={activeView === 'organizer'}
              onClick={() => onViewChange('organizer')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeView === 'organizer'
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0A66C2]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Organizer</span>
            </button>
            <button
              role="tab"
              aria-selected={activeView === 'attendee'}
              onClick={() => onViewChange('attendee')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeView === 'attendee'
                  ? 'bg-[#0A66C2] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0A66C2]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
              <span>Attendee View</span>
              {activeView === 'attendee' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              )}
            </button>
          </nav>
        </div>

        {/* Right: Actions & User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            title="Notifications"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </button>

          <button
            onClick={onHelpClick}
            className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            title="Help & Guide"
            aria-label="Help and documentation"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          <div className="h-6 w-px bg-[#E2E8F0] mx-1"></div>

          <button
            onClick={onCreateEventClick}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Event</span>
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left"
              aria-label="User menu"
            >
              <div className="relative">
                <img
                  src={activeView === 'organizer' ? HOST_USER.avatar : ATTENDEE_PRESET_USER.avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </div>
              <div className="hidden xl:flex flex-col">
                <span className="text-xs font-semibold text-[#0F172A] leading-tight">
                  {activeView === 'organizer' ? HOST_USER.name : ATTENDEE_PRESET_USER.name}
                </span>
                <span className="text-[11px] text-[#0A66C2] font-medium leading-tight">
                  {activeView === 'organizer' ? HOST_USER.role : 'ScaleAI'}
                </span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-[#64748B] hidden sm:inline">
                expand_more
              </span>
            </button>

            {profileDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E2E8F0] py-2 z-40 text-xs">
                  <div className="px-4 py-2 border-b border-[#E2E8F0]">
                    <p className="font-semibold text-[#0F172A]">
                      {activeView === 'organizer' ? HOST_USER.name : ATTENDEE_PRESET_USER.name}
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      {activeView === 'organizer' ? 'Conference Host • Organizer' : 'Attendee • Creator Hub'}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onViewChange('organizer');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A]"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#0A66C2]">dashboard</span>
                      <span>Switch to Organizer Mode</span>
                    </button>
                    <button
                      onClick={() => {
                        onViewChange('attendee');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A]"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#0A66C2]">rate_review</span>
                      <span>Switch to Attendee Mode</span>
                    </button>
                    <button
                      onClick={() => {
                        onCreateEventClick();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A]"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#0A66C2]">add_circle</span>
                      <span>Create New Summit Event</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Role Switcher Bar */}
      <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 py-2 flex items-center justify-center">
        <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full border border-[#E2E8F0] w-full max-w-xs">
          <button
            onClick={() => onViewChange('organizer')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
              activeView === 'organizer'
                ? 'bg-[#0A66C2] text-white shadow-xs'
                : 'text-[#475569]'
            }`}
          >
            Organizer
          </button>
          <button
            onClick={() => onViewChange('attendee')}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold text-center transition-all cursor-pointer ${
              activeView === 'attendee'
                ? 'bg-[#0A66C2] text-white shadow-xs'
                : 'text-[#475569]'
            }`}
          >
            Attendee View
          </button>
        </div>
      </div>
    </header>
  );
};
