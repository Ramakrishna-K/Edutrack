import React, { useState } from 'react';
import { ActivityItem } from '../types';

interface SendNoteModalProps {
  activity: ActivityItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSendNote: (activityId: string, educatorName: string, noteText: string) => void;
}

export const SendNoteModal: React.FC<SendNoteModalProps> = ({
  activity,
  isOpen,
  onClose,
  onSendNote
}) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen || !activity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      onSendNote(activity.id, activity.educatorName, text.trim());
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setText('');
        onClose();
      }, 1000);
    }, 600);
  };

  const quickReplies = [
    'Thank you so much for encouraging Leo!',
    'We love seeing his artistic growth!',
    'Can he bring this piece home this Friday?',
    'Awesome work! We are so proud.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-surface-container-high"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activity.educatorAvatar ? (
              <img 
                src={activity.educatorAvatar} 
                alt={activity.educatorName} 
                className="w-9 h-9 rounded-full object-cover shadow-xs"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                {activity.educatorName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-bold text-sm text-on-surface">Send Note to {activity.educatorName}</h3>
              <p className="text-[11px] text-on-surface-variant font-medium">{activity.educatorRole} • {activity.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-on-surface-variant mb-1.5 block">
              Quick suggestion:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setText(reply)}
                  className="px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface text-[11px] font-medium transition-colors cursor-pointer text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface mb-1 block">
              Your Message
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Write a quick message or question regarding "${activity.title}"...`}
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-xs focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || sentSuccess || !text.trim()}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Sending...</span>
                </>
              ) : sentSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Sent to Teacher!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
