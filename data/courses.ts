export interface Lesson {
  id: string;
  title: string;
  content: string;
  completed?: boolean;
}
export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}
export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  sections: Section[];
  // autres champs (niveau, matière, etc.)
}
export const courses: Course[] = [
  // ... données mock
]; 