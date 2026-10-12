import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student, Assignment } from '../types';
import { STUDENT_DATA, ASSIGNMENTS_DATA } from '../mock';

const STORAGE_KEYS = {
  STUDENT: '@student_data',
  ASSIGNMENTS: '@assignments_data',
} as const;

export async function saveStudent(student: Student): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
  } catch (error) {
    console.error('Lỗi lưu thông tin sinh viên:', error);
  }
}

export async function loadStudent(): Promise<Student> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STUDENT);
    if (data) {
      return JSON.parse(data) as Student;
    }
  } catch (error) {
    console.error('Lỗi đọc thông tin sinh viên:', error);
  }
  return { ...STUDENT_DATA };
}

export async function saveAssignments(
  assignments: Assignment[],
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.ASSIGNMENTS,
      JSON.stringify(assignments),
    );
  } catch (error) {
    console.error('Lỗi lưu danh sách bài tập:', error);
  }
}

export async function loadAssignments(): Promise<Assignment[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (data) {
      return JSON.parse(data) as Assignment[];
    }
  } catch (error) {
    console.error('Lỗi đọc danh sách bài tập:', error);
  }
  return [...ASSIGNMENTS_DATA];
}

export async function updateAssignmentStatus(
  assignmentId: string,
  newStatus: Assignment['status'],
): Promise<Assignment[]> {
  const assignments = await loadAssignments();
  const updated = assignments.map(a =>
    a.id === assignmentId ? { ...a, status: newStatus } : a,
  );
  await saveAssignments(updated);
  return updated;
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.STUDENT);
    await AsyncStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
  } catch (error) {
    console.error('Lỗi xóa dữ liệu:', error);
  }
}
