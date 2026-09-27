import React, { useState } from 'react';
import { EventData } from '../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (newEvent: EventData) => void;
  onToast: (msg: string) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onCreateEvent,
  onToast,
}) => {
  const [name, setName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [hashtags, setHashtags] = useState('#TechSummit2025 #AIBuilders');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !organizer.trim()) return;

    const parsedTags = hashtags
      .split(/[\s,]+/)
      .map((t) => (t.startsWith('#') ? t : `#${t}`))
      .filter((t) => t.length > 1);

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newEvent: EventData = {
      id: slug || `event-${Date.now()}`,
      name: name.trim(),
      organizer: organizer.trim(),
      location: location.trim(),
      sessionDay: 'Day 1 of 3 • Live Session',
      hashtags: parsedTags.length > 0 ? parsedTags : ['#Summit2025', '#TechPulse'],
      socialLinks: {
        linkedin: organizer.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        twitter: `@${organizer.replace(/[^a-zA-Z0-9]/g, '')}`,
        website: `https://${slug || 'techsummit'}.org`,
      },
      stats: {
        postsGenerated: 0,
        impressions: '0',
        shareRate: '0.0%',
      },
    };

    onCreateEvent(newEvent);
    onToast(`Event "${name}" created and loaded!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E2E8F0] z-10">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0A66C2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_box</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-[#0B1C30]">
              Create New Summit Event
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0B1C30] p-1 rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B1C30]">Event Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NextGen AI & Cloud Summit 2026"
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B1C30]">Host Organization</label>
            <input
              type="text"
              required
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="e.g. EnterpriseCloud Systems"
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B1C30]">Venue / City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Moscone Center, SF"
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0B1C30]">Official Hashtags</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#CloudAI #TechSummit"
              className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#0A66C2] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#004182] transition-colors cursor-pointer shadow-xs"
            >
              Launch Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#F1F5F9] text-[#565E74] hover:text-[#0B1C30] py-2.5 rounded-lg text-xs font-semibold hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
