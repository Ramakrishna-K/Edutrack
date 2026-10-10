import React, { useState } from 'react';
import { TeacherContact, ChatMessage } from '../types';

interface MessagesViewProps {
  contacts: TeacherContact[];
  messages: Record<string, ChatMessage[]>;
  onSendMessage: (teacherId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  contacts,
  messages,
  onSendMessage
}) => {
  const [activeTeacherId, setActiveTeacherId] = useState<string>(contacts[0]?.id || 't-clara');
  const [inputText, setInputText] = useState('');

  const activeTeacher = contacts.find((c) => c.id === activeTeacherId) || contacts[0];
  const thread = messages[activeTeacherId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeTeacherId, inputText.trim());
    setInputText('');
  };

  const quickPrompts = [
    'Thank you so much for the update!',
    'Leo was thrilled to share this with us.',
    'Should he prepare anything special for Friday?',
    'Looking forward to the exhibition next week!'
  ];

  return (
    <div className="flex flex-col w-full animate-fadeIn pb-8">
      {/* Contact Selector Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs mb-3 border border-surface-container-high/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Educators &amp; Mentors
          </span>
          <span className="text-[10px] text-primary font-bold">Grade 5 Faculty</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {contacts.map((teacher) => {
            const isSelected = teacher.id === activeTeacherId;
            return (
              <button
                key={teacher.id}
                type="button"
                onClick={() => setActiveTeacherId(teacher.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container-high/60'
                }`}
              >
                <div className="relative">
                  {teacher.avatar ? (
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">
                      {teacher.initials || teacher.name.slice(0, 2)}
                    </div>
                  )}
                  {teacher.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-tertiary ring-1 ring-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight truncate max-w-[100px]">{teacher.name}</p>
                  <p className={`text-[10px] truncate max-w-[100px] ${isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                    {teacher.subject}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chat Conversation Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high/40 flex flex-col h-[520px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-3 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeTeacher.avatar ? (
              <img
                src={activeTeacher.avatar}
                alt={activeTeacher.name}
                className="w-9 h-9 rounded-full object-cover shadow-xs border border-white"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                {activeTeacher.initials || 'ED'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-on-surface">{activeTeacher.name}</h3>
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              </div>
              <p className="text-[10px] text-on-surface-variant font-medium">{activeTeacher.role}</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full">
            Direct Messaging
          </span>
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-background/50">
          <div className="text-center my-1">
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold">
              Secure Oakridge Parent-Teacher Portal
            </span>
          </div>

          {thread.map((msg) => {
            const isMe = msg.sender === 'parent';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-primary text-on-primary rounded-tr-xs'
                      : 'bg-surface-container-lowest text-on-surface border border-surface-container-high rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-outline mt-1 px-1">
                  {msg.time} {isMe ? '• Delivered' : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick prompt buttons */}
        <div className="px-3 py-1.5 bg-surface-container-low border-t border-surface-container-high flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(activeTeacherId, prompt)}
              className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-[10px] font-semibold transition-colors shrink-0 border border-surface-container-high cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Send message input */}
        <form onSubmit={handleSend} className="p-2.5 bg-surface-container-lowest border-t border-surface-container flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeTeacher.name}...`}
            className="flex-1 h-10 px-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-xs focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-container text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
