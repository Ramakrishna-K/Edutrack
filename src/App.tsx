import React, { useState } from 'react';
import { RoleMode, NavTab, ActivityItem, BroadcastLog, Student } from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_ACTIVITIES, 
  INITIAL_BROADCASTS, 
  INITIAL_MILESTONES, 
  TEACHER_CONTACTS, 
  INITIAL_MESSAGES 
} from './mockData';
import { Header } from './components/Header';
import { ParentView } from './components/ParentView';
import { TeacherView } from './components/TeacherView';
import { MilestonesView } from './components/MilestonesView';
import { ScheduleView } from './components/ScheduleView';
import { ReportsView } from './components/ReportsView';
import { MessagesView } from './components/MessagesView';
import { CertificateModal } from './components/CertificateModal';
import { SendNoteModal } from './components/SendNoteModal';
import { NotificationsDrawer, NotificationItem } from './components/NotificationsDrawer';

export default function App() {
  const [role, setRole] = useState<RoleMode>('parent');
  const [activeTab, setActiveTab] = useState<NavTab>('activities');
  const [selectedStudent, setSelectedStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>(INITIAL_BROADCASTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [noteModalActivity, setNoteModalActivity] = useState<ActivityItem | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'New Honors Recorded',
      desc: '1st Place Inter-School Piano Recital awarded by St. Jude Academy.',
      time: 'Yesterday',
      icon: 'workspace_premium',
      type: 'achievement',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Activity Broadcasted: Watercolor Painting',
      desc: 'Ms. Clara Evans posted an update from Visual Arts Studio A.',
      time: '11:15 AM',
      icon: 'palette',
      type: 'broadcast',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Morning Gate Check-In',
      desc: 'Leo Das checked in at Main Campus gate at 08:24 AM.',
      time: '08:24 AM',
      icon: 'how_to_reg',
      type: 'attendance',
      read: true
    }
  ]);

  // Handler when teacher publishes a new broadcast
  const handleBroadcastPost = (
    newAct: Omit<ActivityItem, 'id'>,
    newBcast: Omit<BroadcastLog, 'id'>
  ) => {
    const actId = `act-${Date.now()}`;
    const bcastId = `bcast-${Date.now()}`;

    const completeActivity: ActivityItem = {
      ...newAct,
      id: actId,
    };

    const completeBroadcast: BroadcastLog = {
      ...newBcast,
      id: bcastId,
    };

    // Add to state
    setActivities((prev) => [completeActivity, ...prev]);
    setBroadcasts((prev) => [completeBroadcast, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Update: ${completeActivity.title}`,
      desc: `Dispatched by ${completeActivity.educatorName} for ${completeActivity.studentName}`,
      time: 'Just now',
      icon: 'notifications_active',
      type: 'broadcast',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Toggle acknowledge on activity
  const handleToggleAcknowledge = (activityId: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          const nextState = !act.acknowledged;
          return {
            ...act,
            acknowledged: nextState,
            acknowledgmentsCount: (act.acknowledgmentsCount || 0) + (nextState ? 1 : -1)
          };
        }
        return act;
      })
    );
  };

  // Parent sends note to educator
  const handleSendNote = (activityId: string, educatorName: string, noteText: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          return {
            ...act,
            parentNotes: [...(act.parentNotes || []), noteText]
          };
        }
        return act;
      })
    );

    // Find teacher contact id
    let teacherId = 't-clara';
    if (educatorName.toLowerCase().includes('carter')) teacherId = 't-carter';
    if (educatorName.toLowerCase().includes('thorne')) teacherId = 't-thorne';
    if (educatorName.toLowerCase().includes('julian')) teacherId = 't-julian';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => {
      const currentList = prev[teacherId] || [];
      return {
        ...prev,
        [teacherId]: [
          ...currentList,
          {
            id: `msg-${Date.now()}`,
            sender: 'parent',
            teacherId,
            text: noteText,
            time: timeStr
          }
        ]
      };
    });
  };

  // Send message from chat screen
  const handleSendMessage = (teacherId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => {
      const currentList = prev[teacherId] || [];
      return {
        ...prev,
        [teacherId]: [
          ...currentList,
          {
            id: `msg-${Date.now()}`,
            sender: 'parent',
            teacherId,
            text,
            time: timeStr
          }
        ]
      };
    });

    // Auto teacher acknowledgment simulation after 1.5 seconds
    setTimeout(() => {
      setMessages((prev) => {
        const currentList = prev[teacherId] || [];
        return {
          ...prev,
          [teacherId]: [
            ...currentList,
            {
              id: `msg-${Date.now() + 1}`,
              sender: 'teacher',
              teacherId,
              text: `Thank you for reaching out! We will keep supporting Leo in every session.`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      });
    }, 1500);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary">
      {/* Fixed Sticky Header */}
      <Header
        role={role}
        onRoleChange={setRole}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main Container */}
      <main className="w-full pt-28 flex-1 bg-background">
        <div className="max-w-xl mx-auto px-4 pt-3 pb-8">
          {/* Conditional view based on active tab & role */}
          {activeTab === 'activities' && (
            role === 'parent' ? (
              <ParentView
                student={selectedStudent}
                allStudents={INITIAL_STUDENTS}
                onSelectStudent={setSelectedStudent}
                activities={activities}
                onSwitchRole={setRole}
                onOpenCertificate={() => setCertificateOpen(true)}
                onOpenSendNote={(act) => setNoteModalActivity(act)}
                onToggleAcknowledge={handleToggleAcknowledge}
              />
            ) : (
              <TeacherView
                students={INITIAL_STUDENTS}
                broadcasts={broadcasts}
                onSwitchRole={setRole}
                onBroadcastPost={handleBroadcastPost}
              />
            )
          )}

          {activeTab === 'milestones' && (
            <MilestonesView
              milestones={INITIAL_MILESTONES}
              onOpenCertificate={() => setCertificateOpen(true)}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleView />
          )}

          {activeTab === 'reports' && (
            <ReportsView />
          )}

          {activeTab === 'messages' && (
            <MessagesView
              contacts={TEACHER_CONTACTS}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </main>

      {/* Footer matching exact design mockup */}
      <footer className="w-full bg-surface-container-low mt-auto py-6 border-t border-surface-container">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider mb-1">
            EduTrack Mobile Platform
          </p>
          <p className="text-outline text-xs">
            © 2025 EduTrack Systems. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals and Overlays */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        studentName={selectedStudent.name}
        awardTitle="1st Place in Inter-School Piano Recital"
        awardedBy="St. Jude Academy"
        date="May 9, 2026"
      />

      <SendNoteModal
        isOpen={!!noteModalActivity}
        activity={noteModalActivity}
        onClose={() => setNoteModalActivity(null)}
        onSendNote={handleSendNote}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onSelectNotification={(item) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
          );
          if (item.type === 'achievement') {
            setCertificateOpen(true);
            setNotificationsOpen(false);
          } else if (item.type === 'broadcast') {
            setActiveTab('activities');
            setNotificationsOpen(false);
          }
        }}
      />
    </div>
  );
}
