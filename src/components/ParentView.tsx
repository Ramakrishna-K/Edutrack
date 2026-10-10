import React, { useState, useRef, useEffect } from 'react';
import { Student, ActivityItem, ActivityCategory, RoleMode } from '../types';

interface ParentViewProps {
  student: Student;
  allStudents: Student[];
  onSelectStudent: (s: Student) => void;
  activities: ActivityItem[];
  onSwitchRole: (role: RoleMode) => void;
  onOpenCertificate: () => void;
  onOpenSendNote: (activity: ActivityItem) => void;
  onToggleAcknowledge: (activityId: string) => void;
}

export const ParentView: React.FC<ParentViewProps> = ({
  student,
  allStudents,
  onSelectStudent,
  activities,
  onSwitchRole,
  onOpenCertificate,
  onOpenSendNote,
  onToggleAcknowledge
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
        setStudentDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filterCategories: { id: ActivityCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'sports', label: 'Sports' },
    { id: 'arts', label: 'Arts' },
    { id: 'studies', label: 'Studies' },
    { id: 'music', label: 'Music' },
    { id: 'dance', label: 'Dance' },
  ];

  const filteredActivities = activities.filter((act) => {
    if (selectedCategory === 'all') return true;
    return act.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="flex flex-col w-full">
      {/* Parent Role Context & Switcher Cue */}
      <section className="flex items-center justify-between gap-2 mb-4" ref={dropdownRef}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Live Academic Feed
          </span>
        </div>

        {/* Interactive Role Toggle Drawer Cue */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-semibold shadow-xs transition-all hover:bg-surface-container-highest active:scale-95 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>Parent View</span>
            <span className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 bg-surface-container-lowest rounded-xl shadow-xl z-30 overflow-hidden border border-surface-container-high animate-fadeIn">
              <div className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                Switch Workspace
              </div>
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2 bg-primary/10 text-primary text-xs font-semibold text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">family_restroom</span>
                  Parent Portal
                </span>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRoleDropdownOpen(false);
                  onSwitchRole('teacher');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface text-xs font-semibold text-left transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">school</span>
                Teacher Portal
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Profile Card */}
      <section className="relative bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-6 overflow-hidden border border-surface-container/40">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full pointer-events-none"></div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Student Avatar Circle */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-secondary-container to-secondary flex items-center justify-center text-on-primary font-bold text-xl shadow-sm tracking-tight select-none">
                {student.initials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
              </div>
            </div>

            {/* Student Metadata */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-extrabold text-xl text-on-surface tracking-tight truncate">
                  {student.name}
                </h1>
                {/* Child Switcher dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                    className="p-0.5 text-on-surface-variant hover:text-primary rounded cursor-pointer"
                    title="Switch Child"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_vert</span>
                  </button>
                  {studentDropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 w-44 bg-surface-container-lowest rounded-xl shadow-xl z-20 overflow-hidden border border-surface-container-high py-1">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-on-surface-variant">Your Children</div>
                      {allStudents.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            onSelectStudent(s);
                            setStudentDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs font-semibold flex items-center gap-2 hover:bg-surface-container ${s.id === student.id ? 'text-primary bg-primary/5' : 'text-on-surface'}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                            {s.initials}
                          </span>
                          <span className="truncate">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">
                {student.grade} <span className="text-outline-variant font-light mx-1">|</span> Roll No: {student.rollNo}
              </p>
            </div>
          </div>

          {/* Live Attendance Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold shadow-xs flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span>{student.status}</span>
          </div>
        </div>

        {/* Quick Action Metrics Bar */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 bg-surface-container-low rounded-lg p-2 border border-surface-container-high/40">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-on-surface">{student.attendanceYTD}</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Attendance YTD</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-on-surface">{student.activitiesCount}</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Activities (May)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Banner */}
      <section className="relative bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 rounded-xl p-4 shadow-sm mb-6 overflow-hidden border border-amber-200/60">
        <div className="absolute right-2 top-2 text-amber-300/40 select-none pointer-events-none">
          <span className="material-symbols-outlined text-[72px]">workspace_premium</span>
        </div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[26px]">emoji_events</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0 pr-2">
            <div className="inline-flex items-center gap-1 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-0.5">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Honors &amp; Recognition</span>
            </div>
            <h2 className="text-base text-amber-950 font-bold tracking-tight">
              1st Place in Inter-School Piano Recital
            </h2>
            <p className="text-xs text-amber-900/90 mt-0.5">
              Awarded by St. Jude Academy • Yesterday
            </p>
            <div className="mt-2.5 flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-1 text-amber-950 hover:text-amber-800 text-xs underline underline-offset-4 decoration-amber-500/60 font-bold group cursor-pointer"
              >
                <span>View Certificate</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
              </button>
              <span className="text-amber-800/40 text-xs">•</span>
              <span className="text-[11px] text-amber-900/70 font-semibold">Recorded with honors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Segment & Feed Section */}
      <section className="flex flex-col w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">dynamic_feed</span>
            <h2 className="text-lg font-bold text-on-surface">Daily Activity Feed</h2>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            {filteredActivities.length} {filteredActivities.length === 1 ? 'update' : 'updates'} logged
          </span>
        </div>

        {/* Quick Filter Chips: Horizontal Scroll */}
        <div className="w-full overflow-x-auto pb-2 pt-1 flex items-center gap-2 select-none no-scrollbar">
          {filterCategories.map((chip) => {
            const isActive = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedCategory(chip.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Vertical Stack of Activity Cards */}
        <div className="flex flex-col gap-4 mt-2">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant p-6">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">filter_alt_off</span>
              <p className="text-sm font-bold text-on-surface">No activities logged in this category</p>
              <p className="text-xs text-on-surface-variant mt-1">Select "All" to view the full classroom stream.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold cursor-pointer"
              >
                Reset to All
              </button>
            </div>
          ) : (
            filteredActivities.map((act) => {
              // Get category visual style
              let accentColor = 'bg-primary';
              let badgeColor = 'bg-primary-fixed text-on-primary-fixed-variant';
              
              if (act.category === 'arts') {
                accentColor = 'bg-secondary-container';
                badgeColor = 'bg-secondary-fixed text-on-secondary-fixed-variant';
              } else if (act.category === 'studies') {
                accentColor = 'bg-tertiary-container';
                badgeColor = 'bg-surface-variant text-on-surface';
              } else if (act.category === 'music') {
                accentColor = 'bg-amber-500';
                badgeColor = 'bg-amber-100 text-amber-900';
              } else if (act.category === 'dance') {
                accentColor = 'bg-purple-600';
                badgeColor = 'bg-purple-100 text-purple-900';
              }

              return (
                <article
                  key={act.id}
                  className="group bg-surface-container-lowest rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden border border-surface-container-high/40"
                >
                  {/* Left accent color bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`} />

                  {/* Top metadata row */}
                  <div className="flex items-center justify-between gap-1 mb-2 pl-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                        {act.domainLabel || act.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {act.location}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-medium">
                      {act.timeLabel}
                    </span>
                  </div>

                  <div className="pl-1">
                    <h3 className="text-base text-on-surface font-bold group-hover:text-primary transition-colors">
                      {act.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                      {act.description}
                    </p>

                    {/* Embedded artwork/photo showcase preview if available */}
                    {act.imagePreview && (
                      <div className="mt-2.5 rounded-lg overflow-hidden bg-surface-container-high h-32 relative border border-surface-container-high">
                        <img
                          src={act.imagePreview}
                          alt={act.imageAlt || act.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {act.imageTag && (
                          <div className="absolute bottom-2 right-2 bg-inverse-surface/85 text-inverse-on-surface px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-[13px]">palette</span>
                            <span>{act.imageTag}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Parent comments note list if any */}
                    {act.parentNotes && act.parentNotes.length > 0 && (
                      <div className="mt-2.5 bg-surface-container-low p-2 rounded-lg border border-surface-container flex items-start gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">comment</span>
                        <div className="text-[11px] text-on-surface">
                          <span className="font-bold text-on-surface-variant">Parent Note: </span>
                          <span>"{act.parentNotes[act.parentNotes.length - 1]}"</span>
                        </div>
                      </div>
                    )}

                    {/* Footer educator bar */}
                    <div className="mt-4 pt-2 bg-surface-container-low/70 -mx-4 -mb-4 px-4 py-2 flex items-center justify-between border-t border-surface-container-high/40">
                      <div className="flex items-center gap-2.5">
                        {act.educatorAvatar ? (
                          <img
                            src={act.educatorAvatar}
                            alt={act.educatorName}
                            className="w-7 h-7 rounded-full object-cover shadow-xs border border-white"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface text-[10px] flex items-center justify-center font-bold">
                            {act.educatorName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface leading-tight">
                            {act.educatorName}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">
                            {act.educatorRole}
                          </span>
                        </div>
                      </div>

                      {/* Right action: Special badge or interactive buttons */}
                      <div className="flex items-center gap-2">
                        {act.badge && (
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            act.badge.type === 'emerald'
                              ? 'bg-tertiary-fixed/70 text-tertiary'
                              : act.badge.type === 'gold'
                              ? 'text-amber-700 bg-amber-100'
                              : 'text-on-surface-variant'
                          }`}>
                            {act.badge.icon && (
                              <span className="material-symbols-outlined text-[14px]">{act.badge.icon}</span>
                            )}
                            <span>{act.badge.text}</span>
                          </span>
                        )}

                        {/* Interactive Acknowledge Button */}
                        <button
                          type="button"
                          onClick={() => onToggleAcknowledge(act.id)}
                          className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 text-xs ${
                            act.acknowledged
                              ? 'text-primary bg-primary/10 font-bold'
                              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                          }`}
                          title={act.acknowledged ? 'Acknowledged' : 'Acknowledge update'}
                        >
                          <span 
                            className="material-symbols-outlined text-[18px]"
                            style={{ fontVariationSettings: act.acknowledged ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            thumb_up
                          </span>
                          {act.acknowledgmentsCount ? (
                            <span className="text-[10px]">{act.acknowledgmentsCount}</span>
                          ) : null}
                        </button>

                        {/* Send Note to teacher button */}
                        <button
                          type="button"
                          onClick={() => onOpenSendNote(act)}
                          className="text-on-surface-variant hover:text-secondary p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                          title="Send Note to Teacher"
                        >
                          <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
