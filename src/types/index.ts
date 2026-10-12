
export type AssignmentStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export const AssignmentStatusLabels: Record<AssignmentStatus, string> = {
  pending: 'Chưa thực hiện',
  in_progress: 'Đang thực hiện',
  completed: 'Đã hoàn thành',
  overdue: 'Quá hạn',
};

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const DayOfWeekLabels: Record<DayOfWeek, string> = {
  monday: 'Thứ 2',
  tuesday: 'Thứ 3',
  wednesday: 'Thứ 4',
  thursday: 'Thứ 5',
  friday: 'Thứ 6',
  saturday: 'Thứ 7',
  sunday: 'Chủ Nhật',
};

export type Semester = 'HK1_2026_2027' | 'HK2_2025_2026';

export const SemesterLabels: Record<Semester, string> = {
  HK1_2026_2027: 'HK1 - 2026-2027',
  HK2_2025_2026: 'HK2 - 2025-2026',
};

export interface Student {
  id: string;
  name: string;
  className: string;
  major: string;
  cohort: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  group: string;
  semester: Semester;
  description?: string;
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  instructor: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  status: AssignmentStatus;
}

export interface Grade {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  credits: number;
  attendanceScore: number;
  midtermScore: number;
  finalScore: number;
  totalScore10: number;
  totalScore4: number;
  letterGrade: string;
}

export type MainTabParamList = {
  Dashboard: undefined;
  Subjects: undefined;
  Timetable: undefined;
  Assignments: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  SubjectDetail: { subjectId: string };
  ScheduleDetail: { scheduleId: string };
  AssignmentDetail: { assignmentId: string };
  GradeDetail: { subjectId: string };
};
