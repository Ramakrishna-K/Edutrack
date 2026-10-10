import React from 'react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  awardTitle?: string;
  awardedBy?: string;
  date?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Leo Das',
  awardTitle = '1st Place in Inter-School Piano Recital',
  awardedBy = 'St. Jude Academy',
  date = 'May 9, 2026'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Border Frame */}
        <div className="m-3 p-6 rounded-xl border-4 border-double border-amber-300/80 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50 text-center relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close certificate"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-amber-400 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[20px]">stars</span>
          </div>

          {/* Header & Seal */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md mb-2">
              <span className="material-symbols-outlined text-[30px]">workspace_premium</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
              {awardedBy}
            </p>
            <h2 className="text-2xl font-black text-amber-950 tracking-tight mt-1">
              Certificate of Excellence
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 my-2"></div>
            <p className="text-xs text-amber-900/80 uppercase tracking-wider font-semibold">
              Honors & High Distinction
            </p>
          </div>

          {/* Presentation copy */}
          <div className="mt-4">
            <p className="text-xs text-on-surface-variant italic">This certifies that</p>
            <h3 className="text-2xl font-black text-primary my-1 tracking-tight">
              {studentName}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">Grade 5 • Roll No: 101 • Oakridge Elementary</p>
            
            <p className="text-xs text-on-surface-variant mt-3 px-4 leading-relaxed">
              has achieved distinguished artistic excellence and was awarded
            </p>

            <div className="my-3 py-2 px-4 bg-amber-100/70 border border-amber-300/60 rounded-xl inline-block shadow-xs">
              <span className="text-base font-bold text-amber-950 flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-amber-600">emoji_events</span>
                {awardTitle}
              </span>
            </div>

            <p className="text-[11px] text-on-surface-variant/90 max-w-xs mx-auto">
              Presented for outstanding interpretation, melodic phrasing, and master-level stage discipline during the 2026 Interschool Arts Invitational.
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="mt-6 pt-4 border-t border-amber-200/80 grid grid-cols-2 gap-4 text-center items-end">
            <div>
              <div className="font-serif italic text-sm text-on-surface mb-0.5 text-amber-900">Dr. Robert Sterling</div>
              <div className="w-24 h-px bg-outline-variant mx-auto my-1"></div>
              <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Head of Jury, St. Jude</p>
            </div>
            <div>
              <div className="font-serif italic text-sm text-on-surface mb-0.5 text-amber-900">Julian Moreau</div>
              <div className="w-24 h-px bg-outline-variant mx-auto my-1"></div>
              <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Performing Arts Director</p>
            </div>
          </div>

          <div className="mt-3 text-[10px] text-amber-800/80 font-medium">
            Recorded Date: {date} • Certificate ID: STJ-2026-MUS-0418
          </div>
        </div>

        {/* Action bar */}
        <div className="bg-surface-container-low px-4 py-3 flex items-center justify-between gap-2 border-t border-surface-container">
          <span className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
            Blockchain Verified Credential
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.print();
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-container text-on-surface text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
