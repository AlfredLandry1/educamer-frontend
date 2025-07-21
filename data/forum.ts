export interface ForumPost {
  id: string;
  authorId: string;
  content: string;
  date: string;
  replies: ForumPost[];
  status: 'open' | 'closed' | 'deleted';
}

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    authorId: 'student-1',
    content: "Comment bien réviser pour le brevet de maths ?",
    date: "2024-06-01T10:00:00Z",
    status: 'open',
    replies: [
      {
        id: '1-1',
        authorId: 'teacher-1',
        content: "Fais des exercices chaque jour, relis tes cours et pose des questions ici si tu bloques !",
        date: "2024-06-01T11:00:00Z",
        status: 'open',
        replies: [],
      },
      {
        id: '1-2',
        authorId: 'student-2',
        content: "Utilise les annales, ça aide beaucoup !",
        date: "2024-06-01T12:00:00Z",
        status: 'open',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    authorId: 'student-3',
    content: "Des conseils pour progresser en anglais oral ?",
    date: "2024-06-02T09:30:00Z",
    status: 'open',
    replies: [
      {
        id: '2-1',
        authorId: 'teacher-2',
        content: "Regarde des séries en VO et pratique avec des amis ou sur des applis.",
        date: "2024-06-02T10:00:00Z",
        status: 'open',
        replies: [],
      },
    ],
  },
]; 