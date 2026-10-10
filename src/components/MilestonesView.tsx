import React from 'react';
import { Milestone } from '../types';

interface MilestonesViewProps {
  milestones: Milestone[];
  onOpenCertificate: () => void;
}

export const MilestonesView: React.FC<MilestonesViewProps> = ({
  milestones,
  onOpenCertificate
}) => {
  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-4 border border-surface-container-high/40">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-primary text-[20px]">military_tech</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Competency &amp; Mastery
              </span>
            </div>
            <h1 className="text-lg font-extrabold text-on-surface">Learning Milestones</h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Verified skills, achievements, and accredited honors earned by Leo Das.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">trophy</span>
          </div>
        </div>

        {/* Aggregate Badges summary */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-surface-container-low text-center">
          <div className="bg-surface-container-low rounded-lg p-2">
            <span className="text-base font-black text-primary">12</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Total Badges</p>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2">
            <span className="text-base font-black text-amber-600">3</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Honors Awards</p>
          </div>
          <div className="bg-surface-container-low rounded-lg p-2">
            <span className="text-base font-black text-tertiary">94.5%</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Mastery Avg</p>
          </div>
        </div>
      </div>

      {/* Showcase Honors Trophy Card */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-200 rounded-xl p-4 mb-4 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                Featured Achievement
              </span>
              <h3 className="text-sm font-bold text-amber-950 mt-1">Inter-School Piano Recital - 1st Place</h3>
              <p className="text-xs text-amber-900/80">St. Jude Academy • Verified Credential</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenCertificate}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Certificate
          </button>
        </div>
      </div>

      {/* Milestones list */}
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">
          Active Subject Tracks
        </h2>

        {milestones.map((m) => (
          <div
            key={m.id}
            className={`bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-surface-container-high/40 border-l-4 ${m.color}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">{m.badgeIcon}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">
                    {m.category}
                  </span>
                  <h3 className="text-sm font-bold text-on-surface">{m.title}</h3>
                </div>
              </div>
              <span className="text-xs font-black text-primary bg-primary-fixed/60 px-2 py-0.5 rounded-full shrink-0">
                {m.progress}%
              </span>
            </div>

            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              {m.description}
            </p>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-outline mb-1 font-semibold">
                <span>{m.level}</span>
                <span>{m.dateEarned}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
