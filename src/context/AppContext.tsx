import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Student, Subject, ScheduleItem, Assignment, Grade } from '../types';
import {
  SUBJECTS_DATA,
  SCHEDULE_DATA,
  GRADES_DATA,
} from '../mock';
import {
  loadStudent,
  saveStudent,
  loadAssignments,
  saveAssignments,
} from '../storage';

interface AppContextType {

  student: Student;
  subjects: Subject[];
  schedule: ScheduleItem[];
  assignments: Assignment[];
  grades: Grade[];
  isLoading: boolean;

  updateStudent: (updates: Partial<Student>) => Promise<void>;
  updateAssignmentStatus: (
    assignmentId: string,
    newStatus: Assignment['status'],
  ) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [student, setStudent] = useState<Student>({
    id: '',
    name: '',
    className: '',
    major: '',
    cohort: '',
    email: '',
    phone: '',
  });
  const [subjects] = useState<Subject[]>(SUBJECTS_DATA);
  const [schedule] = useState<ScheduleItem[]>(SCHEDULE_DATA);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades] = useState<Grade[]>(GRADES_DATA);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [loadedStudent, loadedAssignments] = await Promise.all([
        loadStudent(),
        loadAssignments(),
      ]);
      setStudent(loadedStudent);
      setAssignments(loadedAssignments);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const updateStudent = useCallback(
    async (updates: Partial<Student>) => {
      const updated = { ...student, ...updates };
      setStudent(updated);
      await saveStudent(updated);
    },
    [student],
  );

  const updateAssignmentStatus = useCallback(
    async (assignmentId: string, newStatus: Assignment['status']) => {
      const updated = assignments.map(a =>
        a.id === assignmentId ? { ...a, status: newStatus } : a,
      );
      setAssignments(updated);
      await saveAssignments(updated);
    },
    [assignments],
  );

  const value: AppContextType = {
    student,
    subjects,
    schedule,
    assignments,
    grades,
    isLoading,
    updateStudent,
    updateAssignmentStatus,
    refreshData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext phải được sử dụng bên trong AppProvider');
  }
  return context;
}

export default AppContext;
