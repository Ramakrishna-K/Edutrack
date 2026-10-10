export type RoleMode = 'parent' | 'teacher';

export type NavTab = 'activities' | 'milestones' | 'schedule' | 'reports' | 'messages';

export type ActivityCategory = 'sports' | 'arts' | 'studies' | 'music' | 'dance' | 'all';

export interface Student {
  id: string;
  name: string;
  grade: string;
  rollNo: string;
  avatar: string;
  initials: string;
  attendanceYTD: string;
  activitiesCount: number;
  status: 'Present Today' | 'Late' | 'Excused';
  school: string;
}

export interface ActivityItem {
  id: string;
  studentId: string;
  studentName: string;
  category: 'sports' | 'arts' | 'studies' | 'music' | 'dance';
  domainLabel: string;
  location: string;
  timeLabel: string;
  title: string;
  description: string;
  educatorName: string;
  educatorRole: string;
  educatorAvatar?: string;
  badge?: {
    text: string;
    type?: 'gold' | 'emerald' | 'indigo' | 'gray';
    icon?: string;
  };
  imagePreview?: string;
  imageAlt?: string;
  imageTag?: string;
  acknowledged?: boolean;
  acknowledgmentsCount?: number;
  parentNotes?: string[];
  date: string;
}

export interface BroadcastLog {
  id: string;
  studentName: string;
  title: string;
  category: string;
  timeLabel: string;
  status: 'Delivered' | 'Pending' | 'Draft';
  notes: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  iconName: string;
  iconBg: string;
}

export interface Milestone {
  id: string;
  category: string;
  title: string;
  level: string;
  progress: number;
  description: string;
  dateEarned: string;
  badgeIcon: string;
  color: string;
}

export interface TimetableEntry {
  id: string;
  time: string;
  period: string;
  subject: string;
  teacher: string;
  room: string;
  status: 'upcoming' | 'current' | 'completed';
  color: string;
}

export interface TeacherContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials?: string;
  subject: string;
  unreadCount?: number;
  lastMessage?: string;
  lastTime?: string;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'parent' | 'teacher';
  teacherId: string;
  text: string;
  time: string;
}
