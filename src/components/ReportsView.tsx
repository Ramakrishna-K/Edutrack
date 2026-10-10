import React, { useState } from 'react';

export const ReportsView: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const subjects = [
    { name: 'Visual Arts', grade: 'A+', score: '98%', teacher: 'Ms. Clara Evans', remark: 'Exceptional color blending and disciplined perspective on watercolor landscape studies.' },
    { name: 'Sciences & Nature Study', grade: 'A+', score: '96%', teacher: 'Dr. Aris Thorne', remark: 'Curious investigator. Lab journal documentation in photosynthesis extraction was top-tier.' },
    { name: 'Performing Arts (Piano)', grade: 'Distinction', score: '99%', teacher: 'Maestro Julian', remark: 'First place inter-school champion. Delicate dynamic control and stage mastery.' },
    { name: 'Mathematics', grade: 'A', score: '92%', teacher: 'Mr. David Vance', remark: 'Solid conceptual understanding in mixed fractions, geometric perimeters, and problem solving.' },
    { name: 'Physical Education', grade: 'A', score: '91%', teacher: 'Coach Carter', remark: 'Excellent teamwork in 3-on-3 basketball scrimmages and relentless hustle in defense drills.' },
    { name: 'Language Arts', grade: 'A', score: '94%', teacher: 'Mrs. Evelyn Hayes', remark: 'Expressive creative writing and thoughtful reading comprehension contributions.' },
  ];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Report Header Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-4 border border-surface-container-high/40">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Term 2 Academic Evaluation
              </span>
            </div>
            <h1 className="text-lg font-black text-on-surface">Leo Das — Progress Report</h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Grade 5 • Oakridge Elementary • Academic Year 2024-25
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>{downloading ? 'Preparing...' : 'Print Report'}</span>
          </button>
        </div>

        {/* GPA & Standing bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-surface-container-low text-center">
          <div className="bg-surface-container-low p-2 rounded-lg">
            <span className="text-base font-black text-primary">3.94</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Cumulative GPA</p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <span className="text-base font-black text-tertiary">95.0%</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Aggregate Score</p>
          </div>
          <div className="bg-surface-container-low p-2 rounded-lg">
            <span className="text-base font-black text-amber-600">Top 5%</span>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Cohort Standing</p>
          </div>
        </div>
      </div>

      {/* Lead Teacher Comprehensive Remarks */}
      <div className="bg-gradient-to-r from-primary-fixed/30 to-surface-container-low rounded-xl p-4 mb-4 border border-primary-fixed/60 shadow-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
            Head Teacher's Holistic Evaluation
          </h2>
        </div>
        <p className="text-xs text-on-surface leading-relaxed">
          "Leo continues to demonstrate exceptional intellectual curiosity and well-rounded artistic dedication. His teamwork in physical education and his leadership during group science experiments make him an admired peer in Grade 5. We are thrilled to celebrate his recent piano distinction!"
        </p>
        <p className="text-[11px] text-on-surface-variant font-bold mt-2 text-right">
          — Ms. Clara Evans, Grade 5 Lead Teacher
        </p>
      </div>

      {/* Subject Breakdown List */}
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">
          Subject Breakdown
        </h2>

        {subjects.map((sub, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-surface-container-high/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-on-surface">{sub.name}</h3>
                <p className="text-[11px] text-on-surface-variant font-medium">{sub.teacher}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-black text-xs">
                  {sub.grade}
                </span>
                <span className="block text-[10px] text-outline font-bold mt-0.5">{sub.score}</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant mt-2 pt-2 border-t border-surface-container-low leading-relaxed">
              "{sub.remark}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
