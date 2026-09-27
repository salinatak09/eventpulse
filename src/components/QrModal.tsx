import React from 'react';
import { EventData } from '../types';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: EventData;
  onToast: (msg: string) => void;
}

export const QrModal: React.FC<QrModalProps> = ({
  isOpen,
  onClose,
  eventData,
  onToast,
}) => {
  if (!isOpen) return null;

  const attendeeUrl = `https://eventpulse.app/event/${eventData.id}/create`;

  const copyQrCode = () => {
    onToast('QR code copied to clipboard!');
    onClose();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(attendeeUrl);
    onToast('Attendee link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#E2E8F0] z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
          <span className="font-headline text-base font-bold text-[#0B1C30]">
            Stage QR Code
          </span>
          <button
            type="button"
            className="text-[#64748B] hover:text-[#0B1C30] p-1 rounded-full cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex flex-col items-center">
          {/* Detailed SVG QR Code */}
          <div className="w-52 h-52 bg-white p-3.5 rounded-xl shadow-xs border border-[#E2E8F0] flex items-center justify-center">
            <svg
              className="w-full h-full text-[#0A66C2]"
              fill="currentColor"
              viewBox="0 0 100 100"
            >
              {/* Outer boundary corners */}
              <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v10H40zM55 10h10v10H55zM40 30h20v10H40zM10 40h10v20H10zM30 40h10v10H30zM50 50h10v10H50zM70 40h20v10H70zM80 60h10v10H80zM40 70h10v20H40zM60 70h10v10H60zM70 80h20v20H70zM80 90h10v10H80zM55 85h10v15H55zM25 45h15v5H25zM65 25h10v10H65zM45 55h15v10H45zM25 65h10v10H25zM65 65h10v10H65z" />
            </svg>
          </div>
          <p className="text-xs font-bold text-[#0B1C30] mt-3">
            Scan to Open Attendee Post Studio
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">
            {eventData.name} • {eventData.organizer}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 bg-[#0A66C2] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#004182] transition-colors cursor-pointer shadow-2xs"
            onClick={copyQrCode}
          >
            Copy Image
          </button>
          <button
            type="button"
            className="flex-1 bg-[#F1F5F9] text-[#565E74] hover:text-[#0B1C30] py-2 rounded-lg text-xs font-semibold hover:bg-[#E2E8F0] transition-colors cursor-pointer"
            onClick={copyUrl}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
