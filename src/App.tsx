import { useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { OrganizerView } from './components/OrganizerView';
import { AttendeeView } from './components/AttendeeView';
import { QrModal } from './components/QrModal';
import { CreateEventModal } from './components/CreateEventModal';
import { Toast } from './components/Toast';
import {
  INITIAL_EVENT_DATA,
  INITIAL_MEDIA_ITEMS,
  INITIAL_PULSE_POSTS,
} from './data/initialData';
import { EventData, MediaItem, PulsePost } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'organizer' | 'attendee'>('organizer');
  const [eventData, setEventData] = useState<EventData>(INITIAL_EVENT_DATA);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [pulseFeed, setPulseFeed] = useState<PulsePost[]>(INITIAL_PULSE_POSTS);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleUpdateEventData = (updated: Partial<EventData>) => {
    setEventData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleAddMediaItem = (item: MediaItem) => {
    setMediaItems((prev) => [item, ...prev]);
  };

  const handleRemoveMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  const handlePublishToPulse = (post: PulsePost) => {
    setPulseFeed((prev) => [post, ...prev]);
    setEventData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        postsGenerated: prev.stats.postsGenerated + 1,
      },
    }));
  };

  const handleCreateNewEvent = (newEvent: EventData) => {
    setEventData(newEvent);
    setActiveView('organizer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1C30]">
      {/* Top Navigation Bar with Role Toggle */}
      <TopNavBar
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          showToast(
            view === 'organizer'
              ? 'Switched to Organizer Dashboard'
              : 'Switched to Attendee Post Studio'
          );
        }}
        onCreateEventClick={() => setIsCreateEventModalOpen(true)}
        onHelpClick={() =>
          showToast('EventPulse: Configure event virality presets & generate authentic posts.')
        }
        onNotificationClick={() =>
          showToast('12 new attendee posts generated in the last hour!')
        }
      />

      {/* Main Canvas Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === 'organizer' ? (
          <OrganizerView
            eventData={eventData}
            onUpdateEventData={handleUpdateEventData}
            pulseFeed={pulseFeed}
            onOpenQrModal={() => setIsQrModalOpen(true)}
            onPreviewAttendeePortal={() => {
              setActiveView('attendee');
              showToast('Previewing Attendee Post Studio');
            }}
            onToast={showToast}
          />
        ) : (
          <AttendeeView
            eventData={eventData}
            mediaItems={mediaItems}
            onAddMediaItem={handleAddMediaItem}
            onRemoveMediaItem={handleRemoveMediaItem}
            onPublishToPulse={handlePublishToPulse}
            onToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="mt-auto border-t border-[#E2E8F0] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#565E74]">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#0A66C2] text-white font-bold text-[10px]">
              EP
            </span>
            <span className="font-bold text-[#0A66C2]">EventPulse</span>
            <span className="hidden sm:inline">
              — Enterprise Social Engagement Engine for Conferences
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => showToast('Privacy Policy details')}
              className="hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showToast('Terms of Service')}
              className="hover:underline cursor-pointer"
            >
              Event Terms
            </button>
            <button
              onClick={() => showToast('Contact support: support@eventpulse.app')}
              className="hover:underline cursor-pointer"
            >
              Support
            </button>
            <span className="text-[#C1C6D4]">•</span>
            <span>© 2025 EventPulse Inc.</span>
          </div>
        </div>
      </footer>

      {/* Stage QR Code Modal */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        eventData={eventData}
        onToast={showToast}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => setIsCreateEventModalOpen(false)}
        onCreateEvent={handleCreateNewEvent}
        onToast={showToast}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
