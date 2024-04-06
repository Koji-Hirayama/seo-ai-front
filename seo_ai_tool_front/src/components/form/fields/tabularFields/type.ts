import { SubjectType } from "./subject";
import { FieldArrayWithId, UseFieldArrayInsert } from "react-hook-form";
import { ScoreFormData } from "./TablarForm";

export const FieldArrayName = {
  SCORE_TABLE_A: "scoreTableAItems",
  SCORE_TABLE_B: "scoreTableBItems",
} as const;

export type FieldArrayName =
  (typeof FieldArrayName)[keyof typeof FieldArrayName];
export type ItemKey = "id";

export interface ScoreTableProps {
  selectedSubject: SubjectType;
  onChangeSubject: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: FieldArrayWithId<ScoreFormData, FieldArrayName, ItemKey>[];
}
