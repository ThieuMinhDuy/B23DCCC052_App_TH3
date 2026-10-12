import { DayOfWeek } from '../types';

const DAY_ORDER: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function getTodayDayOfWeek(): DayOfWeek {
  const jsDay = new Date().getDay();
  return DAY_ORDER[(jsDay + 6) % 7];
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export interface DeadlineInfo {
  isOverdue: boolean;
  isSoon: boolean;
  daysLeft: number;
}

export function getDeadlineInfo(deadline: string): DeadlineInfo {
  const diff = new Date(deadline).getTime() - Date.now();
  const daysLeft = Math.ceil(diff / 86400000);
  return {
    isOverdue: diff < 0,
    isSoon: diff >= 0 && daysLeft <= 3,
    daysLeft,
  };
}

export type SessionStatus = 'ended' | 'ongoing' | 'upcoming';

export function getSessionStatus(
  dayOfWeek: DayOfWeek,
  startTime: string,
  endTime: string,
): SessionStatus {
  if (dayOfWeek !== getTodayDayOfWeek()) {
    return 'upcoming';
  }
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  if (currentMinutes >= eh * 60 + em) {
    return 'ended';
  }
  if (currentMinutes >= sh * 60 + sm) {
    return 'ongoing';
  }
  return 'upcoming';
}

export const SessionStatusLabels: Record<SessionStatus, string> = {
  ended: 'Đã kết thúc',
  ongoing: 'Đang học',
  upcoming: 'Sắp diễn ra',
};
