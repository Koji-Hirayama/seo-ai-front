import { Subject } from "./subject";

export type Score = {
  id: number | null;
  yearMonth: string;
  score: number | null;
};

export type ScoreTable = {
  isSelected: boolean;
  subject: {
    id: number;
    name: Subject;
  };
  scores: Score[];
};
