import { Student, ActivityItem, BroadcastLog, Milestone, TimetableEntry, TeacherContact, ChatMessage } from './types';

// Hotlinked images from the user's HTML snippet
export const ASSETS = {
  LEO_PORTRAIT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAionuxxI2wwGzqUfvNQ3tpdMV_Bf8ICPoIWwSfaBaud_Ne0LAzIeergJIOmTJZ5Nvvhhs8pcqDJbezf5a9jFWX29oaXBUdYxyJ7G4xIuUX8-YemLrVDySaP_sbcHPVh3l2NzNBdJfeZ9XMbsAug3o-1BO1todYV-DC-hL5q5QCxuApPbyvVu9w8ipfOvmQZfQLRP3DzAWcbfPsZEJXSRLBiq5h8eUTbaX5le3CWlt1Z0pL8DrtR9yj',
  COACH_CARTER: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwVGL_Jv-TEb3ZwMf6k806pRdVt6zLU7Aph9ELvC73NX4B0MElJ-WKB0APgnVNt_qbmtUqScvFXoQNlhgEA2nTya2rDQ7AvSjJlajqSI0DpXFsQyEx0goqU5q4YhwGN8fRxfC50Tt7CtsfzBr4C_7YWyTb2PFzAFkucXBypvOscg94vXJiNlvoHarzEZmJoKUiZKmz56TScZ9MuFVj675TzM0F85gGKUh-gEqFcTIkcoH9BWY4Vbco',
  MS_CLARA_ART: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIwlJkl4_qyNI2NVsCmc2xg36-mrKKtvzvouz2YvWSE4TgzNoEMY5R6ps2UzILh3Uqah_a7gy_9TYLxZs6NqLJrbOZtkX609UZbk3IbOyJC5ZYpxNZ4H2Wi1tnB2MgZbF4RcYdlidcN6xnmlArYSZeMU0pnBEK5k1WdfNABF1HsElK1pRtr4wz3drdQKrSSAhEZOXBFCrzPvGBVBOTOgb6FD6zzXcRzzp-lhGyPVhXvHXvfYsO-U6_',
  MS_CLARA_TEACHER: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhQVofb5ycpgkPpkc3nvyUG3r6MCoyRsEI6WuG0-Aj4mQD1mnPg9J2KSRGrTpNzrIpRuX409ovvqVtQMhrS1XhPmH8sORxgW7-AgaSAejfAZuogNzotux-W3a_1Cgcwgt6xioCMG-YMEPCMeoPLElW9UQf2UDPuhdyqHlkRnJEqfBM2jXHGKi61Co3vzjDWh0MJ8nTdLiwXoj_o21b4jGYsxS0WsBU5ZYXjGarRub8PYiDSuOGeLwX',
  MAESTRO_JULIAN: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCilx-3kZpX8SbWBYkoF7zbTHuurHFGI63x_AVjEeDViYI7Aao4SIO_pW8LaQMJgB9k3btyuF1TSXdZjjVMBcxgGEySTP5i7kSVLsvjYfpJUtDYr_m28lcSoAUDN2pG2-pJaRQ_R1SVzalyLmfANcYfQysAER6YmI5rQ7zvHViOuQ6uGjMGYD0w8Y0_qXPb308LtW-U6CzG-ogciwSngmbu0SmOJO6ddzRVSYlwOD3xjln7X9U37r8H',
  WATERCOLOR_ARTWORK: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEeuVn22_e9p9lXa8JRNyqacabs3zceOYwmTDmlFiDDWzvNxDdomH7nnyH8jNc3BFSAFesEjRI_7ZRKCHrj7ggXL9UnkV7ChCPxpF1TgB7cBG_4z0HrpmYjXRhi5VleObschMddN7K-g3WeFFmdzrYdKUNDbmch06o2LaqpMtZZlnRmMKNicEU_yhgLS6BkwjTc0FzPnf7Gp3dtYqLMjxDPzl3xqzHyUKgwATKClmby9N2tJqOl06'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '101',
    name: 'Leo Das',
    grade: 'Grade 5',
    rollNo: '101',
    avatar: ASSETS.LEO_PORTRAIT,
    initials: 'LD',
    attendanceYTD: '98%',
    activitiesCount: 24,
    status: 'Present Today',
    school: 'Oakridge Elementary'
  },
  {
    id: '102',
    name: 'Maya Lin',
    grade: 'Grade 5',
    rollNo: '102',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    initials: 'ML',
    attendanceYTD: '96%',
    activitiesCount: 21,
    status: 'Present Today',
    school: 'Oakridge Elementary'
  },
  {
    id: '103',
    name: 'Aarav Patel',
    grade: 'Grade 5',
    rollNo: '103',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    initials: 'AP',
    attendanceYTD: '99%',
    activitiesCount: 26,
    status: 'Present Today',
    school: 'Oakridge Elementary'
  },
  {
    id: '104',
    name: 'Sophia Bennett',
    grade: 'Grade 5',
    rollNo: '104',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    initials: 'SB',
    attendanceYTD: '95%',
    activitiesCount: 19,
    status: 'Present Today',
    school: 'Oakridge Elementary'
  },
  {
    id: '105',
    name: 'Marcus Thorne',
    grade: 'Grade 5',
    rollNo: '105',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'MT',
    attendanceYTD: '97%',
    activitiesCount: 22,
    status: 'Present Today',
    school: 'Oakridge Elementary'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    studentId: '101',
    studentName: 'Leo Das',
    category: 'sports',
    domainLabel: 'Sports',
    location: 'Field Arena',
    timeLabel: 'Today, 2:30 PM',
    title: 'Basketball Practice',
    description: 'Leo demonstrated outstanding teamwork and defensive drills during today’s session. Practiced layup fundamentals and 3-on-3 scrimmages.',
    educatorName: 'Coach Carter',
    educatorRole: 'Athletics Department',
    educatorAvatar: ASSETS.COACH_CARTER,
    acknowledged: false,
    acknowledgmentsCount: 3,
    parentNotes: ['Keep up the great defense drills Leo!'],
    date: '2026-10-10'
  },
  {
    id: 'act-2',
    studentId: '101',
    studentName: 'Leo Das',
    category: 'arts',
    domainLabel: 'Arts',
    location: 'Studio A',
    timeLabel: 'Today, 11:15 AM',
    title: 'Watercolor Painting',
    description: 'Completed an impressive landscape watercolor study demonstrating color blending techniques. Artwork submitted for annual exhibition.',
    educatorName: 'Ms. Clara',
    educatorRole: 'Visual Arts Faculty',
    educatorAvatar: ASSETS.MS_CLARA_ART,
    imagePreview: ASSETS.WATERCOLOR_ARTWORK,
    imageAlt: "Leo's Watercolor Artwork",
    imageTag: 'Exhibition Nominee',
    badge: {
      text: 'Exhibition Nominee',
      type: 'indigo',
      icon: 'palette'
    },
    acknowledged: true,
    acknowledgmentsCount: 7,
    parentNotes: ['We framed this photo on the wall, so proud!'],
    date: '2026-10-10'
  },
  {
    id: 'act-3',
    studentId: '101',
    studentName: 'Leo Das',
    category: 'studies',
    domainLabel: 'Studies',
    location: 'Science Wing 2',
    timeLabel: 'Yesterday, 1:45 PM',
    title: 'Science Lab Experiment: Plant Photosynthesis',
    description: 'Actively participated in observing chlorophyll extraction and recorded accurate lab journal entries.',
    educatorName: 'Dr. Aris Thorne',
    educatorRole: 'Lead Sciences',
    badge: {
      text: 'Journal: A+',
      type: 'emerald',
      icon: 'grade'
    },
    acknowledged: true,
    acknowledgmentsCount: 5,
    parentNotes: [],
    date: '2026-10-09'
  },
  {
    id: 'act-4',
    studentId: '101',
    studentName: 'Leo Das',
    category: 'music',
    domainLabel: 'Music',
    location: 'Recital Hall',
    timeLabel: 'May 12, 10:00 AM',
    title: 'Piano Solo Rehearsal',
    description: 'Final dress rehearsal for the Inter-School recital piece. Excellent tempo and dynamic control.',
    educatorName: 'Maestro Julian',
    educatorRole: 'Performing Arts',
    educatorAvatar: ASSETS.MAESTRO_JULIAN,
    badge: {
      text: 'Distinction',
      type: 'gold',
      icon: 'star'
    },
    acknowledged: false,
    acknowledgmentsCount: 4,
    parentNotes: [],
    date: '2026-05-12'
  }
];

export const INITIAL_BROADCASTS: BroadcastLog[] = [
  {
    id: 'bcast-1',
    studentName: 'Leo Das',
    title: 'Watercolor Landscape Study',
    category: 'Arts & Craft',
    timeLabel: 'Sent 11:15 AM',
    status: 'Delivered',
    notes: 'Leo showed exceptional color gradient blending on today’s alpine mountain canvas.',
    hasAttachment: true,
    attachmentName: 'leo_watercolor_landscape.jpg',
    iconName: 'palette',
    iconBg: 'bg-secondary-fixed text-primary'
  },
  {
    id: 'bcast-2',
    studentName: 'Maya Lin',
    title: 'Fractions Speed Quiz - Grade A',
    category: 'Studies',
    timeLabel: 'Sent 09:30 AM',
    status: 'Delivered',
    notes: 'Completed all 25 mental arithmetic fraction questions in under 4 minutes with 100% accuracy.',
    hasAttachment: false,
    attachmentName: 'Badge Earned',
    iconName: 'calculate',
    iconBg: 'bg-surface-variant text-primary'
  },
  {
    id: 'bcast-3',
    studentName: 'Aarav Patel',
    title: 'Relay Sprint Anchor Captain',
    category: 'Sports',
    timeLabel: 'Sent Yesterday 03:45 PM',
    status: 'Delivered',
    notes: 'Stepped up as anchor runner for the 4x100m practice heats. Exemplary sportsmanship.',
    hasAttachment: false,
    iconName: 'sports_soccer',
    iconBg: 'bg-surface-container-high text-primary'
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    category: 'Arts & Creative',
    title: 'Watercolor Gradient Mastery',
    level: 'Advanced Level 4',
    progress: 94,
    description: 'Mastered wet-on-wet technique, wash layering, and harmonious color blending.',
    dateEarned: 'May 2026',
    badgeIcon: 'palette',
    color: 'border-l-secondary-container'
  },
  {
    id: 'm-2',
    category: 'Performing Arts',
    title: 'Inter-School Classical Piano Laureate',
    level: 'Distinction Honor',
    progress: 100,
    description: '1st Place overall in regional inter-school recital at St. Jude Academy.',
    dateEarned: 'Yesterday',
    badgeIcon: 'workspace_premium',
    color: 'border-l-amber-500'
  },
  {
    id: 'm-3',
    category: 'STEM & Inquiry',
    title: 'Botanical Photosynthesis Analysis',
    level: 'Grade A+ Certified',
    progress: 96,
    description: 'Documented cellular chloroplast activity and accurate scientific lab journal reporting.',
    dateEarned: 'Yesterday',
    badgeIcon: 'biotech',
    color: 'border-l-tertiary-container'
  },
  {
    id: 'm-4',
    category: 'Athletics & Fitness',
    title: 'Junior Court Defense & Scrimmage Agility',
    level: 'Intermediate Level 3',
    progress: 88,
    description: 'Completed 10 hours of defensive footwork, rebound control, and basketball layup drills.',
    dateEarned: 'This Week',
    badgeIcon: 'sports_basketball',
    color: 'border-l-primary'
  }
];

export const TIMETABLE_TODAY: TimetableEntry[] = [
  {
    id: 'tt-1',
    time: '08:30 - 09:15 AM',
    period: 'Period 1',
    subject: 'Homeroom & Morning Advisory',
    teacher: 'Ms. Clara Evans',
    room: 'Room 5B',
    status: 'completed',
    color: 'border-primary'
  },
  {
    id: 'tt-2',
    time: '09:20 - 10:15 AM',
    period: 'Period 2',
    subject: 'Mathematics (Fractions & Decimals)',
    teacher: 'Mr. David Vance',
    room: 'Room 4A',
    status: 'completed',
    color: 'border-secondary'
  },
  {
    id: 'tt-3',
    time: '10:30 - 11:15 AM',
    period: 'Period 3',
    subject: 'Visual Arts (Watercolor Studio)',
    teacher: 'Ms. Clara Evans',
    room: 'Studio A',
    status: 'completed',
    color: 'border-secondary-container'
  },
  {
    id: 'tt-4',
    time: '11:20 - 12:15 PM',
    period: 'Period 4',
    subject: 'Science Lab (Photosynthesis & Botany)',
    teacher: 'Dr. Aris Thorne',
    room: 'Science Wing 2',
    status: 'completed',
    color: 'border-tertiary-container'
  },
  {
    id: 'tt-5',
    time: '01:00 - 02:15 PM',
    period: 'Period 5',
    subject: 'Physical Education & Basketball Clinic',
    teacher: 'Coach Carter',
    room: 'Field Arena Gym',
    status: 'completed',
    color: 'border-primary'
  },
  {
    id: 'tt-6',
    time: '02:30 - 03:30 PM',
    period: 'Period 6',
    subject: 'Music & Instrumental Piano Ensemble',
    teacher: 'Maestro Julian',
    room: 'Recital Hall',
    status: 'current',
    color: 'border-amber-500'
  }
];

export const TEACHER_CONTACTS: TeacherContact[] = [
  {
    id: 't-clara',
    name: 'Ms. Clara Evans',
    role: 'Grade 5 Lead Teacher & Visual Arts',
    avatar: ASSETS.MS_CLARA_TEACHER,
    subject: 'Visual Arts / Homeroom',
    unreadCount: 1,
    lastMessage: 'Leo did wonderful work on the watercolor landscape today!',
    lastTime: '11:35 AM',
    online: true
  },
  {
    id: 't-carter',
    name: 'Coach Carter',
    role: 'Athletics & Basketball Coach',
    avatar: ASSETS.COACH_CARTER,
    subject: 'Physical Education',
    unreadCount: 0,
    lastMessage: 'Great hustle in practice today. Tournament schedule is next Friday.',
    lastTime: '2:45 PM',
    online: true
  },
  {
    id: 't-thorne',
    name: 'Dr. Aris Thorne',
    role: 'Lead Sciences Faculty',
    avatar: '',
    initials: 'AT',
    subject: 'Sciences',
    unreadCount: 0,
    lastMessage: 'Lab journal entries have been graded A+. Leo has great curiosity.',
    lastTime: 'Yesterday',
    online: false
  },
  {
    id: 't-julian',
    name: 'Maestro Julian',
    role: 'Performing Arts & Piano Director',
    avatar: ASSETS.MAESTRO_JULIAN,
    subject: 'Music',
    unreadCount: 0,
    lastMessage: 'Congratulations again on the 1st Place Piano Recital award!',
    lastTime: 'Yesterday',
    online: false
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  't-clara': [
    {
      id: 'm-1',
      sender: 'teacher',
      teacherId: 't-clara',
      text: 'Good morning Mr. & Mrs. Das! Just letting you know Leo finished his alpine mountain watercolor today.',
      time: '11:15 AM'
    },
    {
      id: 'm-2',
      sender: 'teacher',
      teacherId: 't-clara',
      text: 'It has been selected for our Annual Oakridge Exhibition Nominee gallery!',
      time: '11:20 AM'
    },
    {
      id: 'm-3',
      sender: 'parent',
      teacherId: 't-clara',
      text: 'That is wonderful news, Ms. Clara! Thank you so much for mentoring him.',
      time: '11:30 AM'
    },
    {
      id: 'm-4',
      sender: 'teacher',
      teacherId: 't-clara',
      text: 'Leo did wonderful work on the watercolor landscape today! Feel free to stop by the gallery next Thursday evening.',
      time: '11:35 AM'
    }
  ],
  't-carter': [
    {
      id: 'm-5',
      sender: 'teacher',
      teacherId: 't-carter',
      text: 'Leo played solid defense today. High intensity and great leadership on the court.',
      time: '2:40 PM'
    },
    {
      id: 'm-6',
      sender: 'teacher',
      teacherId: 't-carter',
      text: 'Great hustle in practice today. Tournament schedule is next Friday.',
      time: '2:45 PM'
    }
  ],
  't-thorne': [
    {
      id: 'm-7',
      sender: 'teacher',
      teacherId: 't-thorne',
      text: 'Lab journal entries have been graded A+. Leo has great curiosity with the microscope and botany experiments.',
      time: 'Yesterday 2:10 PM'
    }
  ],
  't-julian': [
    {
      id: 'm-8',
      sender: 'teacher',
      teacherId: 't-julian',
      text: 'Congratulations again on the 1st Place Piano Recital award! His phrasing and rhythm in the Chopin prelude were sublime.',
      time: 'Yesterday 5:00 PM'
    }
  ]
};
