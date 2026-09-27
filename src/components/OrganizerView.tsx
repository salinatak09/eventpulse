import React, { useState, useEffect } from 'react';
import { EventData, PulsePost } from '../types';

interface OrganizerViewProps {
  eventData: EventData;
  onUpdateEventData: (data: Partial<EventData>) => void;
  pulseFeed: PulsePost[];
  onOpenQrModal: () => void;
  onPreviewAttendeePortal: () => void;
  onToast: (msg: string) => void;
}

export const OrganizerView: React.FC<OrganizerViewProps> = ({
  eventData,
  onUpdateEventData,
  pulseFeed,
  onOpenQrModal,
  onPreviewAttendeePortal,
  onToast,
}) => {
  const [eventName, setEventName] = useState(eventData.name);
  const [organizer, setOrganizer] = useState(eventData.organizer);
  const [hashtags, setHashtags] = useState<string[]>(eventData.hashtags);
  const [newTagInput, setNewTagInput] = useState('');
  const [linkedinSlug, setLinkedinSlug] = useState(eventData.socialLinks.linkedin);
  const [twitterHandle, setTwitterHandle] = useState(eventData.socialLinks.twitter);
  const [websiteUrl, setWebsiteUrl] = useState(eventData.socialLinks.website);

  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if eventData prop changes (e.g. creating new event or switching presets)
  useEffect(() => {
    setEventName(eventData.name);
    setOrganizer(eventData.organizer);
    setHashtags(eventData.hashtags);
    setLinkedinSlug(eventData.socialLinks.linkedin);
    setTwitterHandle(eventData.socialLinks.twitter);
    setWebsiteUrl(eventData.socialLinks.website);
  }, [eventData]);

  const attendeeLink = `https://eventpulse.app/event/${eventData.id}/create`;

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    let tag = newTagInput.trim();
    if (!tag.startsWith('#')) {
      tag = `#${tag}`;
    }
    if (!hashtags.includes(tag)) {
      const updated = [...hashtags, tag];
      setHashtags(updated);
      onUpdateEventData({ hashtags: updated });
      onToast(`Added hashtag ${tag}`);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = hashtags.filter((t) => t !== tagToRemove);
    setHashtags(updated);
    onUpdateEventData({ hashtags: updated });
    onToast(`Removed ${tagToRemove}`);
  };

  const handleSavePresets = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEventData({
      name: eventName,
      organizer,
      hashtags,
      socialLinks: {
        linkedin: linkedinSlug,
        twitter: twitterHandle,
        website: websiteUrl,
      },
    });
    onToast('Event presets saved & published to attendee portals!');
  };

  const copyAttendeeLink = () => {
    navigator.clipboard.writeText(attendeeLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    onToast('Dedicated attendee post station link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Organizer Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] custom-shadow-card">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#0B1C30] tracking-tight">
              Event Management &amp; Attendee Engagement
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live • Accepting Posts
            </span>
          </div>
          <p className="text-sm text-[#565E74] max-w-2xl">
            Equip speakers, sponsors, and attendees with verified talking points and 1-click LinkedIn virality presets.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onPreviewAttendeePortal}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0B1C30] border border-[#E2E8F0] text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0A66C2]">visibility</span>
            <span>Preview Attendee Portal</span>
          </button>
          <button
            onClick={copyAttendeeLink}
            className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Share Attendee Portal</span>
          </button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configure Event Presets (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E2E8F0] custom-shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0A66C2] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <h2 className="font-headline text-lg font-bold text-[#0B1C30]">
                Configure Event Presets
              </h2>
            </div>
            <span className="text-xs text-[#565E74] font-medium bg-[#F1F5F9] px-2 py-0.5 rounded">
              Auto-saves drafts
            </span>
          </div>

          <form onSubmit={handleSavePresets} className="space-y-4">
            {/* Event Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0B1C30]">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0B1C30] focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 transition-all font-medium"
                placeholder="e.g. Global Cloud & AI Summit 2025"
                required
              />
            </div>

            {/* Organizer / Company Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0B1C30]">
                Organizer / Host Organization
              </label>
              <input
                type="text"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-sm text-[#0B1C30] focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 transition-all font-medium"
                placeholder="e.g. CloudTech Innovations"
                required
              />
            </div>

            {/* Official Hashtags */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#0B1C30]">Official Hashtags</label>
              <div className="flex flex-wrap gap-2 p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] min-h-[46px] items-center">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-white text-[#0A66C2] border border-[#E2E8F0] px-2.5 py-1 rounded-md text-xs font-semibold shadow-2xs"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-600 ml-0.5 cursor-pointer text-[#64748B]"
                      title={`Remove ${tag}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="bg-transparent border-0 text-xs py-1 px-2 focus:ring-0 focus:outline-none w-24 text-[#0B1C30] placeholder-[#64748B]"
                  placeholder="+ Add tag"
                />
              </div>
              <span className="text-[11px] text-[#64748B]">
                These hashtags will automatically append to attendee LinkedIn posts.
              </span>
            </div>

            {/* Social Links Grid */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-[#0B1C30]">Social &amp; Host Links</label>
              <div className="space-y-2">
                {/* LinkedIn */}
                <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white overflow-hidden focus-within:border-[#0A66C2] focus-within:ring-2 focus-within:ring-[#0A66C2]/20">
                  <span className="px-3 bg-[#F1F5F9] text-[#565E74] text-xs font-medium border-r border-[#E2E8F0] flex items-center h-10 select-none">
                    <span className="material-symbols-outlined text-[16px] mr-1 text-[#0A66C2]">link</span>
                    linkedin.com/company/
                  </span>
                  <input
                    type="text"
                    value={linkedinSlug}
                    onChange={(e) => setLinkedinSlug(e.target.value)}
                    className="flex-1 border-0 py-2 px-3 text-sm text-[#0B1C30] focus:ring-0 focus:outline-none"
                    placeholder="company-handle"
                  />
                </div>

                {/* Twitter / X */}
                <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white overflow-hidden focus-within:border-[#0A66C2] focus-within:ring-2 focus-within:ring-[#0A66C2]/20">
                  <span className="px-3 bg-[#F1F5F9] text-[#565E74] text-xs font-medium border-r border-[#E2E8F0] flex items-center h-10 select-none">
                    <span className="text-xs font-bold mr-1 text-[#565E74]">@</span>
                    Twitter / X
                  </span>
                  <input
                    type="text"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="flex-1 border-0 py-2 px-3 text-sm text-[#0B1C30] focus:ring-0 focus:outline-none"
                    placeholder="@Handle"
                  />
                </div>

                {/* Website */}
                <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white overflow-hidden focus-within:border-[#0A66C2] focus-within:ring-2 focus-within:ring-[#0A66C2]/20">
                  <span className="px-3 bg-[#F1F5F9] text-[#565E74] text-xs font-medium border-r border-[#E2E8F0] flex items-center h-10 select-none">
                    <span className="material-symbols-outlined text-[16px] mr-1 text-[#565E74]">language</span>
                    Website
                  </span>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="flex-1 border-0 py-2 px-3 text-sm text-[#0B1C30] focus:ring-0 focus:outline-none"
                    placeholder="https://your-event.org"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 duration-150"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_done</span>
                <span>Save &amp; Publish Event Presets</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Metrics & Post Pulse (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] custom-shadow-card">
              <div className="flex items-center justify-between text-[#565E74] mb-2">
                <span className="text-xs font-medium">Posts Generated</span>
                <span className="material-symbols-outlined text-[#0A66C2] text-[20px]">post_add</span>
              </div>
              <div className="font-headline text-2xl font-bold text-[#0B1C30]">
                {eventData.stats.postsGenerated.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[12px] text-emerald-600 font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+24.6% vs yesterday</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] custom-shadow-card">
              <div className="flex items-center justify-between text-[#565E74] mb-2">
                <span className="text-xs font-medium">Total Impressions</span>
                <span className="material-symbols-outlined text-[#0A66C2] text-[20px]">visibility</span>
              </div>
              <div className="font-headline text-2xl font-bold text-[#0B1C30]">
                {eventData.stats.impressions}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[12px] text-emerald-600 font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>High virality velocity</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] custom-shadow-card">
              <div className="flex items-center justify-between text-[#565E74] mb-2">
                <span className="text-xs font-medium">Attendee Share Rate</span>
                <span className="material-symbols-outlined text-[#0A66C2] text-[20px]">groups</span>
              </div>
              <div className="font-headline text-2xl font-bold text-[#0B1C30]">
                {eventData.stats.shareRate}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[12px] text-emerald-600 font-semibold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Top 5% tech summits</span>
              </div>
            </div>
          </div>

          {/* Dedicated Attendee Post Station Box */}
          <div className="bg-gradient-to-r from-[#EFF6FF] via-[#E0F2FE] to-[#F0FDF4] p-6 rounded-xl border border-[#0A66C2]/20 custom-shadow-card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
                </div>
                <div>
                  <h3 className="font-headline text-base font-bold text-[#0B1C30]">
                    Dedicated Attendee Post Station
                  </h3>
                  <p className="text-xs text-[#565E74]">
                    Share this direct link with your attendees via presentation slides, badges, or email.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenQrModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#0A66C2] border border-[#E2E8F0] rounded-lg text-xs font-semibold hover:bg-[#F8FAFC] transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                <span>Show Big QR</span>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg border border-[#E2E8F0] shadow-inner">
              <span className="material-symbols-outlined text-[#565E74] ml-2 text-[18px]">link</span>
              <input
                className="flex-1 border-0 bg-transparent text-xs text-[#0B1C30] focus:ring-0 focus:outline-none font-mono"
                readOnly
                type="text"
                value={attendeeLink}
              />
              <button
                type="button"
                onClick={copyAttendeeLink}
                className="inline-flex items-center gap-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-xs cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Real-Time Attendee Pulse Feed */}
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] custom-shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0A66C2]">dynamic_feed</span>
                <h3 className="font-headline text-base font-bold text-[#0B1C30]">
                  Real-Time Attendee Pulse
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                12 new posts this hour
              </span>
            </div>

            {/* Feed items */}
            <div className="space-y-3.5 divide-y divide-[#E2E8F0]">
              {pulseFeed.map((post, idx) => (
                <div key={post.id} className={`flex items-start gap-3.5 ${idx > 0 ? 'pt-3.5' : ''}`}>
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#0B1C30] truncate">
                        {post.authorName}
                      </span>
                      <span className="text-[11px] text-[#64748B] flex-shrink-0">{post.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#565E74] leading-relaxed line-clamp-2 mt-1">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[15px] text-[#0A66C2]">thumb_up</span>
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span>
                        {post.comments}
                      </span>
                      <span className="text-[#0A66C2] text-[11px] font-semibold">
                        Generated via EventPulse
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
