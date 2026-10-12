import { Grade } from '../types';

export function computeGpa10(grades: Grade[]): number {
  if (grades.length === 0) {
    return 0;
  }
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
  if (totalCredits === 0) {
    return 0;
  }
  const weighted = grades.reduce((sum, g) => sum + g.totalScore10 * g.credits, 0);
  return weighted / totalCredits;
}

export function computeGpa4(grades: Grade[]): number {
  if (grades.length === 0) {
    return 0;
  }
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);
  if (totalCredits === 0) {
    return 0;
  }
  const weighted = grades.reduce((sum, g) => sum + g.totalScore4 * g.credits, 0);
  return weighted / totalCredits;
}

export function computeTotalCredits(grades: Grade[]): number {
  return grades.reduce((sum, g) => sum + g.credits, 0);
}
