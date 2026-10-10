import React, { useState } from 'react';
import { Student, BroadcastLog, ActivityItem, RoleMode } from '../types';
import { ASSETS } from '../mockData';

interface TeacherViewProps {
  students: Student[];
  broadcasts: BroadcastLog[];
  onSwitchRole: (role: RoleMode) => void;
  onBroadcastPost: (activity: Omit<ActivityItem, 'id'>, broadcast: Omit<BroadcastLog, 'id'>) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  students,
  broadcasts,
  onSwitchRole,
  onBroadcastPost
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState('101');
  const [selectedCategory, setSelectedCategory] = useState<'Studies' | 'Sports' | 'Dance' | 'Music' | 'Arts & Craft'>('Arts & Craft');
  const [headline, setHeadline] = useState('Completed Watercolor Landscape Study');
  const [notes, setNotes] = useState(
    "Leo showed exceptional color gradient blending on today's alpine mountain canvas. Demonstrated patience and precision with wet-on-wet technique."
  );
  const [attachment, setAttachment] = useState<string | null>('leo_watercolor_landscape.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [draftToast, setDraftToast] = useState(false);

  const targetStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const categoryOptions = [
    { label: 'Studies', icon: 'menu_book', key: 'Studies' as const },
    { label: 'Sports', icon: 'sports_soccer', key: 'Sports' as const },
    { label: 'Dance', icon: 'accessibility_new', key: 'Dance' as const },
    { label: 'Music', icon: 'music_note', key: 'Music' as const },
    { label: 'Arts & Craft', icon: 'palette', key: 'Arts & Craft' as const },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0].name);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() || !notes.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Map domain category to Parent activity category
      let parentCategory: 'sports' | 'arts' | 'studies' | 'music' | 'dance' = 'arts';
      let location = 'Studio A';
      if (selectedCategory === 'Sports') {
        parentCategory = 'sports';
        location = 'Field Arena';
      } else if (selectedCategory === 'Studies') {
        parentCategory = 'studies';
        location = 'Academic Wing';
      } else if (selectedCategory === 'Music') {
        parentCategory = 'music';
        location = 'Recital Hall';
      } else if (selectedCategory === 'Dance') {
        parentCategory = 'dance';
        location = 'Movement Studio';
      }

      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newActivity: Omit<ActivityItem, 'id'> = {
        studentId: targetStudent.id,
        studentName: targetStudent.name,
        category: parentCategory,
        domainLabel: selectedCategory,
        location,
        timeLabel: timeStr,
        title: headline,
        description: notes,
        educatorName: 'Ms. Clara Evans',
        educatorRole: 'Grade 5 Lead Teacher',
        educatorAvatar: ASSETS.MS_CLARA_TEACHER,
        imagePreview: attachment ? (attachment.includes('watercolor') ? ASSETS.WATERCOLOR_ARTWORK : undefined) : undefined,
        imageTag: attachment ? 'Student Work' : undefined,
        acknowledged: false,
        acknowledgmentsCount: 0,
        parentNotes: [],
        date: new Date().toISOString().split('T')[0]
      };

      let iconBg = 'bg-secondary-fixed text-primary';
      let iconName = 'palette';
      if (selectedCategory === 'Studies') {
        iconBg = 'bg-surface-variant text-primary';
        iconName = 'calculate';
      } else if (selectedCategory === 'Sports') {
        iconBg = 'bg-surface-container-high text-primary';
        iconName = 'sports_soccer';
      } else if (selectedCategory === 'Music') {
        iconBg = 'bg-amber-100 text-amber-900';
        iconName = 'music_note';
      } else if (selectedCategory === 'Dance') {
        iconBg = 'bg-purple-100 text-purple-900';
        iconName = 'accessibility_new';
      }

      const newBroadcast: Omit<BroadcastLog, 'id'> = {
        studentName: targetStudent.name,
        title: headline,
        category: selectedCategory,
        timeLabel: `Sent ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        status: 'Delivered',
        notes,
        hasAttachment: !!attachment,
        attachmentName: attachment || undefined,
        iconName,
        iconBg
      };

      onBroadcastPost(newActivity, newBroadcast);

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 900);
  };

  const handleSaveDraft = () => {
    setDraftToast(true);
    setTimeout(() => setDraftToast(false), 2200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Role Context Bar & Mode Indicator */}
      <section className="mb-4">
        <div className="bg-surface-container-high rounded-xl p-3 shadow-xs flex items-center justify-between gap-2 border border-surface-container-highest/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-primary font-bold truncate">
                Active Workspace
              </p>
              <p className="text-xs text-on-surface font-extrabold truncate">
                Teacher Management Portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSwitchRole('parent')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary text-xs font-bold shadow-xs transition-all shrink-0 active:scale-95 cursor-pointer border border-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">swap_horiz</span>
            <span>Switch to Parent</span>
          </button>
        </div>
      </section>

      {/* Teacher Profile & Live Class Telemetry Card */}
      <section className="mb-6">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm border border-surface-container-high/40">
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm bg-surface-container border border-surface-container-high"
                  alt="Ms. Clara Evans"
                  src={ASSETS.MS_CLARA_TEACHER}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center text-[10px] font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="text-base text-on-surface font-extrabold truncate">
                    Ms. Clara Evans
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold shrink-0">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate mt-0.5">
                  Grade 5 Lead Teacher • Oakridge Elementary
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-on-surface text-[10px] font-bold">
                Term 2 • AY 2024-25
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 bg-surface-container-low rounded-lg p-2 border border-surface-container-high/40">
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-md bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">groups</span>
              </div>
              <div>
                <p className="text-base font-black text-on-surface leading-none">32</p>
                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Students Enrolled</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-1">
              <div className="w-8 h-8 rounded-md bg-tertiary-container/15 text-tertiary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">send</span>
              </div>
              <div>
                <p className="text-base font-black text-on-surface leading-none">
                  {broadcasts.length + 1}
                </p>
                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Broadcasts Today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broadcast Form Card Container */}
      <section className="mb-6">
        <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container-high/40">
          {/* Card Header */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-primary text-[20px]">campaign</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Classroom Feed Publisher
              </span>
            </div>
            <h1 className="text-lg text-on-surface font-extrabold tracking-tight">
              Post Student Activity Update
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Broadcast verified classroom and extracurricular achievements directly to parents in real-time.
            </p>
          </div>

          {/* Live Broadcast Form */}
          <form className="flex flex-col gap-3.5" onSubmit={handlePublish}>
            {/* Field 1: Target Student Dropdown with Thumbnail */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface font-bold flex items-center justify-between" htmlFor="studentSelect">
                <span>Target Student</span>
                <span className="text-[10px] text-primary font-semibold">Individual Dispatch</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    className="w-7 h-7 rounded-full object-cover shadow-xs border border-white"
                    alt={targetStudent.name}
                    src={targetStudent.avatar || ASSETS.LEO_PORTRAIT}
                  />
                </div>
                <select
                  id="studentSelect"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full h-12 pl-12 pr-10 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold appearance-none cursor-pointer focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all border border-surface-container-high/60"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.grade} - Roll {s.rollNo})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            {/* Field 2: Activity Category Chips */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface font-bold flex items-center justify-between">
                <span>Activity Domain</span>
                <span className="text-[10px] text-on-surface-variant font-normal">Select one track</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categoryOptions.map((opt) => {
                  const isActive = selectedCategory === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedCategory(opt.key)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-xs font-bold'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      } ${opt.key === 'Arts & Craft' ? 'col-span-2 sm:col-span-1' : ''}`}
                    >
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-on-primary/20 text-on-primary'
                            : 'bg-surface-container-lowest text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">{opt.icon}</span>
                      </div>
                      <span className="text-xs truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Title Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface font-bold" htmlFor="activityTitle">
                Activity Headline
              </label>
              <input
                id="activityTitle"
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Completed Watercolor Landscape Study"
                className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-xs focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all border border-surface-container-high/60"
              />
            </div>

            {/* Field 4: Description / Notes Textarea */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-on-surface font-bold" htmlFor="activityNotes">
                  Observation Notes
                </label>
                <span className={`text-[10px] font-semibold ${notes.length > 480 ? 'text-error' : 'text-outline'}`}>
                  {notes.length} / 500
                </span>
              </div>
              <textarea
                id="activityNotes"
                rows={3}
                maxLength={500}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Detail the student's performance, milestones, or notes for parents..."
                className="w-full p-3.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline text-xs focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary shadow-xs transition-all resize-none border border-surface-container-high/60 leading-relaxed"
              />
            </div>

            {/* Field 5: Teacher Pre-fill / Verified Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-on-surface font-bold" htmlFor="teacherSignoff">
                Educator Sign-Off
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
                <input
                  id="teacherSignoff"
                  readOnly
                  type="text"
                  value="Ms. Clara Evans"
                  className="w-full h-11 pl-10 pr-32 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold cursor-not-allowed select-none"
                />
                <div className="absolute right-2 flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed-variant px-2.5 py-1 rounded-md text-[10px] font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span>Verified Educator</span>
                </div>
              </div>
            </div>

            {/* Field 6: Media Attachment Dropzone Preview */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-on-surface font-bold">
                Attach Photo or Certificate (Optional)
              </span>
              <label className="rounded-xl p-4 bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all group border border-dashed border-surface-container-highest">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                <div className="w-11 h-11 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                </div>
                <p className="text-xs text-on-surface font-bold">
                  Drop classroom snapshot or click to browse
                </p>
                <p className="text-[10px] text-outline mt-0.5">
                  JPEG, PNG, or HEIC up to 15MB • High resolution
                </p>

                {/* Attachment preview badge showing staged item */}
                {attachment && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest shadow-xs text-on-surface text-xs font-medium border border-surface-container-high">
                    <span className="material-symbols-outlined text-primary text-[16px]">image</span>
                    <span className="truncate max-w-[180px]">{attachment}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAttachment(null);
                      }}
                      className="text-outline hover:text-error cursor-pointer"
                      title="Remove attachment"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                )}
              </label>
            </div>

            {/* Form Actions Button Group */}
            <div className="flex flex-col gap-2.5 pt-1 mt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] transition-all cursor-pointer text-white ${
                  submitSuccess
                    ? 'bg-tertiary-container'
                    : 'bg-primary hover:bg-primary-container'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[19px]">progress_activity</span>
                    <span>Broadcasting to Parents...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[19px]">check_circle</span>
                    <span>Dispatched Successfully!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[19px]">send</span>
                    <span>Broadcast Activity to Parent</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-surface-container-high/40"
              >
                {draftToast ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check</span>
                    <span className="text-tertiary font-bold">Saved to Teacher Drafts</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-outline">save</span>
                    <span>Save as Draft</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Recent Broadcasts Feed (Today) */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">history_toggle_off</span>
            <h2 className="text-base text-on-surface font-bold">Recently Broadcasted (Today)</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[10px] font-bold">
            {broadcasts.length} Dispatched
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {broadcasts.map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-lowest rounded-xl p-3 shadow-xs flex items-start gap-3 border border-surface-container-high/40"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <span className="material-symbols-outlined text-[20px]">{item.iconName}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs text-on-surface font-bold truncate">{item.studentName}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold shrink-0">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      done_all
                    </span>
                    <span>Delivered</span>
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate mt-0.5">{item.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-outline flex-wrap">
                  <span>{item.timeLabel}</span>
                  <span>•</span>
                  <span className="text-primary font-semibold">{item.category}</span>
                  {item.hasAttachment && (
                    <>
                      <span>•</span>
                      <span>Photo Attached</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
