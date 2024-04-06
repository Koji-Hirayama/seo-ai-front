const Subject = {
  JAPANESE: "国語",
  MATH: "数学",
  ENGLISH: "英語",
} as const;

export type Subject = (typeof Subject)[keyof typeof Subject];

export type SubjectType = {
  id: number;
  name: Subject;
};

export const SubjectTypes: SubjectType[] = [
  {
    id: 1,
    name: "国語",
  },
  {
    id: 2,
    name: "数学",
  },
  {
    id: 3,
    name: "英語",
  },
];
