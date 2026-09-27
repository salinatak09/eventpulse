import React, { useState, useRef, useEffect } from 'react';
import { EventData, MediaItem, ToneType, PulsePost } from '../types';
import { TONE_OPTIONS, ATTENDEE_PRESET_USER } from '../data/initialData';
import { generatePostContent } from '../utils/postGenerator';

interface AttendeeViewProps {
  eventData: EventData;
  mediaItems: MediaItem[];
  onAddMediaItem: (item: MediaItem) => void;
  onRemoveMediaItem: (id: string) => void;
  onPublishToPulse: (post: PulsePost) => void;
  onToast: (msg: string) => void;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  eventData,
  mediaItems,
  onAddMediaItem,
  onRemoveMediaItem,
  onPublishToPulse,
  onToast,
}) => {
  const [selectedMediaId, setSelectedMediaId] = useState<string>(
    mediaItems[0]?.id || ''
  );
  const [authorName, setAuthorName] = useState(ATTENDEE_PRESET_USER.name);
  const [authorHeadline, setAuthorHeadline] = useState(ATTENDEE_PRESET_USER.headline);
  const [authorAvatar] = useState(ATTENDEE_PRESET_USER.avatar);

  const [notes, setNotes] = useState(
    `• Groundbreaking session on distributed inference architecture\n• Elena Vance demonstrated 60% latency reductions with edge agents\n• Great networking with the infrastructure community!`
  );

  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial generated post
  const [postCopy, setPostCopy] = useState(() =>
    generatePostContent({
      notes: `• Groundbreaking session on distributed inference architecture\n• Elena Vance demonstrated 60% latency reductions with edge agents\n• Great networking with the infrastructure community!`,
      tone: 'professional',
      authorName: ATTENDEE_PRESET_USER.name,
      authorHeadline: ATTENDEE_PRESET_USER.headline,
      event: eventData,
    })
  );

  // Keep post content in sync if event name/hashtags change from Organizer View
  const initialEventIdRef = useRef(eventData.id);
  useEffect(() => {
    if (initialEventIdRef.current !== eventData.id) {
      initialEventIdRef.current = eventData.id;
      setPostCopy(
        generatePostContent({
          notes,
          tone: selectedTone,
          authorName,
          authorHeadline,
          event: eventData,
        })
      );
    }
  }, [eventData, notes, selectedTone, authorName, authorHeadline]);

  // Social interactions simulation
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(3);
  const [comments, setComments] = useState<string[]>([
    'Incredible takeaways! The 60% latency benchmark matches our internal tests.',
    'Great connecting today Elena and team!',
  ]);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');

  const [copiedPost, setCopiedPost] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeMedia =
    mediaItems.find((m) => m.id === selectedMediaId) || mediaItems[0];

  const handleGenerate = (toneOverride?: ToneType) => {
    const toneToUse = toneOverride || selectedTone;
    setIsGenerating(true);

    setTimeout(() => {
      const generated = generatePostContent({
        notes,
        tone: toneToUse,
        authorName,
        authorHeadline,
        event: eventData,
      });
      setPostCopy(generated);
      setIsGenerating(false);
      onToast(`Generated optimized post in '${toneToUse}' tone!`);
    }, 280);
  };

  const handleSelectTone = (tone: ToneType) => {
    setSelectedTone(tone);
    handleGenerate(tone);
  };

  const handleInsertSnippet = (snippet: string) => {
    if (snippet.startsWith('#') || snippet.startsWith('@')) {
      setNotes((prev) => `${prev} ${snippet}`);
    } else {
      setNotes((prev) => `${prev}\n• ${snippet}`);
    }
    onToast('Added key takeaway snippet to notes!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const newItem: MediaItem = {
        id: `custom-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url,
        caption: 'Custom Uploaded Photo',
        isCustom: true,
      };
      onAddMediaItem(newItem);
      setSelectedMediaId(newItem.id);
      onToast(`Uploaded ${file.name}!`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(postCopy);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2000);
    onToast('LinkedIn post copy ready to paste!');
  };

  const handleShareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      postCopy
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    onToast('Opened LinkedIn creator composer with your post text!');
  };

  const handlePublishLivePulse = () => {
    const newPulse: PulsePost = {
      id: `pulse-user-${Date.now()}`,
      authorName: `${authorName} • ${authorHeadline.split('|')[0].trim()}`,
      authorRole: authorHeadline,
      authorAvatar,
      timeAgo: 'Just now',
      content: `"${postCopy.slice(0, 140)}..."`,
      likes: likeCount,
      comments: comments.length,
      generatedWithEventPulse: true,
    };
    onPublishToPulse(newPulse);
    onToast('Published to Summit Live Attendee Pulse ticker!');
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      onToast('Liked this post!');
    }
  };

  const toggleRepost = () => {
    if (isReposted) {
      setRepostCount((prev) => prev - 1);
      setIsReposted(false);
    } else {
      setRepostCount((prev) => prev + 1);
      setIsReposted(true);
      onToast('Reposted to feed!');
    }
  };

  const insightCount = notes
    .split('\n')
    .filter((l) => l.trim().length > 0).length;

  return (
    <div className="space-y-6">
      {/* Top Event Banner Card */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] custom-shadow-card overflow-hidden relative">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#004E99] via-[#0A66C2] to-[#38BDF8]"></div>
        <div className="p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0A66C2] text-xs font-semibold inline-flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  event
                </span>
                Current Session
              </span>
              <span className="text-[#565E74] text-xs font-medium">
                {eventData.sessionDay}
              </span>
            </div>

            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#0B1C30] tracking-tight">
              {eventData.name}
            </h1>

            <p className="text-sm text-[#565E74] flex items-center gap-2 flex-wrap">
              <span className="material-symbols-outlined text-[16px] text-[#0A66C2]">
                business
              </span>
              <span>
                Hosted by <strong className="text-[#0B1C30]">{eventData.organizer}</strong>
              </span>
              <span className="text-[#C1C6D4]">•</span>
              <span className="material-symbols-outlined text-[16px] text-[#565E74]">
                location_on
              </span>
              <span>{eventData.location}</span>
            </p>
          </div>

          {/* Preset Hashtag Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {eventData.hashtags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleInsertSnippet(tag)}
                title="Click to insert tag"
                className="rounded-full px-3 py-1.5 bg-[#F1F5F9] text-[#565E74] text-xs font-semibold border border-[#E2E8F0] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-white transition-all cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleInsertSnippet(eventData.socialLinks.twitter)}
              title="Click to insert host mention"
              className="rounded-full px-3 py-1.5 bg-[#F1F5F9] text-[#565E74] text-xs font-semibold border border-[#E2E8F0] hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-white transition-all cursor-pointer shadow-2xs"
            >
              {eventData.socialLinks.twitter}
            </button>
          </div>
        </div>
      </section>

      {/* Two-Column Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Form Studio (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] custom-shadow-card p-6 space-y-6">
            {/* Column Header */}
            <div className="border-b border-[#E2E8F0] pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A66C2] animate-pulse"></span>
                  <h2 className="font-headline text-lg font-bold text-[#0B1C30]">
                    Craft Your Event Post
                  </h2>
                </div>
                <p className="text-xs text-[#565E74] mt-0.5">
                  Turn your notes into an engaging LinkedIn post with 1 click.
                </p>
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-[#0A66C2] font-semibold bg-[#E0F2FE] px-2.5 py-1 rounded-md">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                AI Co-Pilot Ready
              </span>
            </div>

            {/* Media Upload Dropzone */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#0B1C30]">
                Event Media &amp; Photos
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-5 text-center hover:border-[#0A66C2] transition-colors bg-[#F8FAFC]/60 hover:bg-[#F1F5F9] cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto text-[#0A66C2] shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <p className="mt-2.5 text-xs text-[#0B1C30] font-medium">
                  Drag and drop event photos or{' '}
                  <span className="text-[#0A66C2] font-bold underline underline-offset-2">
                    browse
                  </span>
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Supports PNG, JPG, or WEBP up to 10MB each
                </p>
              </div>

              {/* Uploaded Thumbnails list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {mediaItems.map((item) => {
                  const isSelected = item.id === selectedMediaId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMediaId(item.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0A66C2] bg-[#E0F2FE]/40 ring-1 ring-[#0A66C2]'
                          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-11 h-11 rounded-md object-cover flex-shrink-0 border border-[#E2E8F0]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[#0B1C30] font-semibold truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          {item.size} • {item.isCustom ? 'Uploaded' : 'Preset'}
                        </p>
                      </div>

                      {isSelected ? (
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveMediaItem(item.id);
                            onToast(`Removed ${item.name}`);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-[#64748B] hover:text-red-600 rounded transition-colors"
                          title="Remove media"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Highlights Text Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-[#0B1C30]">
                  Key Highlights / Takeaways
                </label>
                <span className="text-[11px] text-[#64748B] font-mono">
                  {insightCount} insights • {notes.length} chars
                </span>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your raw notes, speaker quotes, or takeaways here..."
                rows={4}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-3 text-xs sm:text-sm text-[#0B1C30] focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 transition-all font-medium resize-y"
              />

              {/* Quick Add Snippets */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="text-[11px] text-[#64748B] flex items-center mr-1">
                  Quick Add:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleInsertSnippet('Great keynote by CEO on scalable AI pipelines.')
                  }
                  className="text-[11px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#565E74] px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                >
                  + Keynote highlight
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInsertSnippet(
                      'Incredible community discussions around inference efficiency.'
                    )
                  }
                  className="text-[11px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#565E74] px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                >
                  + Community takeaway
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInsertSnippet("Let's connect if you are also attending!")
                  }
                  className="text-[11px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#565E74] px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                >
                  + Open to chat
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInsertSnippet(
                      `Grateful for ${eventData.organizer}'s hospitality!`
                    )
                  }
                  className="text-[11px] bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#565E74] px-2.5 py-1 rounded-md transition cursor-pointer font-medium"
                >
                  + Thank host
                </button>
              </div>
            </div>

            {/* Tone Selector Chips */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-[#0B1C30]">
                Voice &amp; Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {TONE_OPTIONS.map((t) => {
                  const isActive = selectedTone === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTone(t.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#0A66C2] text-white shadow-xs border border-[#0A66C2]'
                          : 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {isActive && (
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      )}
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author Profile Metadata Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs text-[#565E74] font-medium">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#565E74] font-medium">LinkedIn Headline</label>
                <input
                  type="text"
                  value={authorHeadline}
                  onChange={(e) => setAuthorHeadline(e.target.value)}
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-[#0B1C30] focus:ring-1 focus:ring-[#0A66C2] focus:border-[#0A66C2]"
                />
              </div>
            </div>

            {/* Primary Generation CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-lg bg-[#0A66C2] text-white text-xs sm:text-sm font-bold hover:bg-[#004182] transition-all duration-150 active:scale-[0.99] shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isGenerating ? 'animate-spin' : ''
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isGenerating ? 'autorenew' : 'auto_awesome'}
                </span>
                <span>
                  {isGenerating ? 'Crafting Viral Post...' : '✨ Generate LinkedIn Post'}
                </span>
              </button>
              <p className="text-center text-[11px] text-[#64748B] mt-2">
                Powered by EventPulse AI Model v2.4 • Generates formatted hashtags and mentions
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live LinkedIn Post Preview (552px canonical scale) */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-20">
          {/* Header Label */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <h3 className="font-headline text-base font-bold text-[#0B1C30]">
                Live LinkedIn Post Preview
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0A66C2] text-xs font-semibold border border-[#BAE6FD]">
              <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse"></span>
              Desktop Preview
            </span>
          </div>

          {/* LinkedIn Simulated Desktop Feed Container (552px max width) */}
          <div className="w-full max-w-[552px] mx-auto bg-white rounded-xl border border-[#E2E8F0] custom-shadow-elevated overflow-hidden font-sans">
            {/* Post Author Top Row */}
            <div className="p-4 pb-2 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0] flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-bold text-[#0F172A] leading-tight">
                      {authorName}
                    </h4>
                    <span className="text-[#64748B] text-xs">• 1st</span>
                  </div>
                  <p className="text-xs text-[#64748B] line-clamp-1 leading-snug mt-0.5">
                    {authorHeadline}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-0.5 flex items-center gap-1">
                    <span>Just now</span>
                    <span>•</span>
                    <span className="material-symbols-outlined text-[13px]">public</span>
                  </p>
                </div>
              </div>

              {/* Trailing 3-dots */}
              <button
                type="button"
                className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-full hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                title="Options"
              >
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>

            {/* Post Text Body */}
            <div className="px-4 py-2 space-y-2.5 text-sm text-[#0F172A] leading-relaxed">
              <div className="whitespace-pre-line font-normal">
                {postCopy}
              </div>
            </div>

            {/* Attached Media Photo */}
            {activeMedia && (
              <div className="mt-1 relative border-t border-b border-[#F1F5F9] bg-slate-950 max-h-[340px] overflow-hidden flex items-center justify-center">
                <img
                  src={activeMedia.url}
                  alt={activeMedia.name}
                  className="w-full h-auto object-cover max-h-[340px]"
                />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-[11px] font-medium backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                  <span>{activeMedia.caption || activeMedia.name}</span>
                </div>
              </div>
            )}

            {/* Reaction Metrics Summary Row */}
            <div className="px-4 py-2 flex items-center justify-between text-xs text-[#64748B] border-b border-[#F1F5F9]">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1 items-center">
                  <span
                    className="w-4 h-4 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[9px] shadow-xs"
                    title="Like"
                  >
                    👍
                  </span>
                  <span
                    className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-xs"
                    title="Insightful"
                  >
                    💡
                  </span>
                  <span
                    className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] shadow-xs"
                    title="Celebrate"
                  >
                    👏
                  </span>
                </div>
                <span className="ml-1 font-medium hover:text-[#0A66C2] cursor-pointer">
                  {isLiked ? 'You and ' : 'Elena Vance and '}
                  {likeCount} others
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowComments(!showComments)}
                  className="hover:text-[#0A66C2] cursor-pointer text-xs"
                >
                  {comments.length} comments
                </button>
                <span>•</span>
                <span className="hover:text-[#0A66C2] cursor-pointer">
                  {repostCount} reposts
                </span>
              </div>
            </div>

            {/* Native Social Action Bar Row */}
            <div className="px-2 py-1 flex items-center justify-between text-xs font-semibold text-[#64748B]">
              <button
                type="button"
                onClick={toggleLike}
                className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                  isLiked
                    ? 'text-[#0A66C2] bg-[#E0F2FE]/50 font-bold'
                    : 'hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  thumb_up
                </span>
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowComments(!showComments)}
                className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                  showComments ? 'text-[#0A66C2] bg-[#F1F5F9]' : 'hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">comment</span>
                <span>Comment</span>
              </button>

              <button
                type="button"
                onClick={toggleRepost}
                className={`flex-1 py-2 rounded-md transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                  isReposted
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">repeat</span>
                <span>{isReposted ? 'Reposted' : 'Repost'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCopyPost();
                  onToast('Post link & copy copied ready to send via message!');
                }}
                className="flex-1 py-2 rounded-md hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send</span>
              </button>
            </div>

            {/* Interactive Comments Drawer */}
            {showComments && (
              <div className="border-t border-[#F1F5F9] p-4 bg-[#F8FAFC]/50 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newCommentText.trim()) {
                        setComments((prev) => [...prev, newCommentText.trim()]);
                        setNewCommentText('');
                        onToast('Comment posted!');
                      }
                    }}
                    placeholder="Add a comment..."
                    className="flex-1 bg-white border border-[#E2E8F0] rounded-full px-3.5 py-1.5 text-xs text-[#0B1C30] focus:outline-none focus:border-[#0A66C2]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCommentText.trim()) {
                        setComments((prev) => [...prev, newCommentText.trim()]);
                        setNewCommentText('');
                        onToast('Comment posted!');
                      }
                    }}
                    className="bg-[#0A66C2] text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#004182] transition-colors cursor-pointer"
                  >
                    Post
                  </button>
                </div>
                <div className="space-y-2">
                  {comments.map((c, i) => (
                    <div key={i} className="text-xs bg-white p-2.5 rounded-lg border border-[#E2E8F0] text-[#0F172A]">
                      <span className="font-semibold text-[#0A66C2] block text-[11px] mb-0.5">Attendee</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs below preview */}
          <div className="space-y-2.5 max-w-[552px] mx-auto pt-1">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={handleShareToLinkedIn}
              className="w-full py-3 px-5 rounded-lg bg-[#0A66C2] text-white text-xs sm:text-sm font-bold hover:bg-[#004182] transition-all duration-150 shadow-xs active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>🚀 Share Directly to LinkedIn</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Secondary CTA */}
              <button
                type="button"
                onClick={handleCopyPost}
                className="py-2.5 px-4 rounded-lg bg-white border border-[#E2E8F0] text-[#0B1C30] text-xs font-semibold hover:bg-[#F8FAFC] transition-colors active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#565E74]">
                  content_copy
                </span>
                <span>{copiedPost ? 'Copied to Clipboard!' : '📋 Copy to Clipboard'}</span>
              </button>

              {/* Tertiary CTA */}
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="py-2.5 px-4 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#565E74] hover:text-[#0B1C30] text-xs font-semibold hover:bg-[#E2E8F0] transition-colors active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>🔄 Regenerate Post</span>
              </button>
            </div>

            {/* Simulating Publish to Event Pulse Live Ticker */}
            <button
              type="button"
              onClick={handlePublishLivePulse}
              className="w-full py-2 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-600">
                dynamic_feed
              </span>
              <span>Broadcast to Conference Live Pulse Feed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
