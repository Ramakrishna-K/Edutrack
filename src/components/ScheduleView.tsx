import React, { useState } from 'react';
import { TimetableEntry } from '../types';
import { TIMETABLE_TODAY } from '../mockData';

export const ScheduleView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Wed');
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false);
  const [absenceSubmitted, setAbsenceSubmitted] = useState(false);

  const days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Attendance Telemetry Summary Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-4 border border-surface-container-high/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-on-surface">Live Attendance Log</h2>
              <p className="text-[11px] text-on-surface-variant font-medium">RFID Gate Check-in • Today 08:24 AM</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
            <span>Present On Campus</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container-low text-center">
          <div className="bg-surface-container-low p-2 rounded-lg">
            <p className="text-base font-extrabold text-primary">98%</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Attendance YTD</p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <p className="text-base font-extrabold text-on-surface">142</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Days Attended</p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <p className="text-base font-extrabold text-outline">0</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Unexcused</p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setAbsenceModalOpen(true)}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">event_busy</span>
            <span>Submit Absence or Early Dismissal Note</span>
          </button>
        </div>
      </div>

      {/* Timetable Header & Day Selector */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
          <h2 className="text-base font-bold text-on-surface">Daily Class Schedule</h2>
        </div>
        <span className="text-xs text-on-surface-variant font-medium">Term 2 Schedule</span>
      </div>

      {/* Weekday Switcher */}
      <div className="grid grid-cols-5 gap-1.5 mb-4 bg-surface-container-high p-1 rounded-xl">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
              selectedDay === day
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Timetable list */}
      <div className="flex flex-col gap-3 mb-8">
        {TIMETABLE_TODAY.map((item) => (
          <div
            key={item.id}
            className={`bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/40 border-l-4 ${item.color} relative overflow-hidden`}
          >
            {item.status === 'current' && (
              <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Happening Now</span>
              </span>
            )}

            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {item.period} • {item.time}
              </span>
            </div>

            <h3 className="text-sm font-bold text-on-surface">{item.subject}</h3>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-container-low text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">person</span>
                <span>{item.teacher}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-outline">meeting_room</span>
                <span>{item.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Absence note dialog modal */}
      {absenceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl p-5 shadow-xl border border-surface-container-high">
            <h3 className="text-base font-bold text-on-surface mb-1">Submit Absence Note</h3>
            <p className="text-xs text-on-surface-variant mb-3">Notify the administration of an upcoming absence or medical appointment.</p>
            
            {absenceSubmitted ? (
              <div className="py-6 text-center">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-2">check_circle</span>
                <p className="text-sm font-bold text-on-surface">Note Dispatched</p>
                <p className="text-xs text-on-surface-variant mt-1">Oakridge Elementary administrative office has been alerted.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAbsenceSubmitted(true);
                  setTimeout(() => {
                    setAbsenceSubmitted(false);
                    setAbsenceModalOpen(false);
                  }, 1500);
                }}
                className="flex flex-col gap-3"
              >
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Date of Absence</label>
                  <input
                    type="date"
                    required
                    defaultValue="2026-10-12"
                    className="w-full p-2 rounded-lg bg-surface-container-low text-xs border border-surface-container-high"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Reason</label>
                  <select className="w-full p-2 rounded-lg bg-surface-container-low text-xs border border-surface-container-high">
                    <option>Medical / Dental Appointment</option>
                    <option>Family Emergency</option>
                    <option>Extracurricular Competition</option>
                    <option>Illness</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Parent Explanation</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Details for homeroom teacher..."
                    className="w-full p-2 rounded-lg bg-surface-container-low text-xs border border-surface-container-high"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAbsenceModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-on-surface-variant hover:bg-surface-container-high rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold bg-primary text-on-primary rounded-lg cursor-pointer"
                  >
                    Send to School
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
