import React from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  type: 'achievement' | 'broadcast' | 'attendance' | 'message';
  read: boolean;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-on-surface/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-surface-container-high mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications_active</span>
            <div>
              <h2 className="text-sm font-bold text-on-surface">Campus Activity Notifications</h2>
              <p className="text-[10px] text-on-surface-variant font-medium">Real-time alerts &amp; logs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-primary font-bold hover:underline cursor-pointer"
            >
              Mark Read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 space-y-1.5 divide-y divide-surface-container-low">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant text-xs">
              No new alerts at this time.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                  item.read ? 'opacity-70 hover:bg-surface-container-low' : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  item.type === 'achievement'
                    ? 'bg-amber-100 text-amber-800'
                    : item.type === 'attendance'
                    ? 'bg-tertiary-fixed text-tertiary'
                    : 'bg-primary-fixed text-primary'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-on-surface truncate">{item.title}</h4>
                    <span className="text-[10px] text-outline shrink-0">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-surface-container-low border-t border-surface-container text-center">
          <p className="text-[10px] text-outline">
            Notifications are synchronized with Oakridge Elementary Administrative Gateway.
          </p>
        </div>
      </div>
    </div>
  );
};
