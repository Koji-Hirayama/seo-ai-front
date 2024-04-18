import { AiOutputExampleTableTieldType } from "../types";

export const getAiOutputExampleTableFieldTypes =
  (): AiOutputExampleTableTieldType[] => {
    const fieldTypes: AiOutputExampleTableTieldType[] = [
      {
        fieldType: "str",
      },
      {
        fieldType: "int",
      },
      {
        fieldType: "float",
      },
      {
        fieldType: "bool",
      },
      {
        fieldType: "List[str]",
      },
      {
        fieldType: "List[int]",
      },
      {
        fieldType: "List[float]",
      },
      {
        fieldType: "List[bool]",
      },
    ];
    return fieldTypes;
  };
