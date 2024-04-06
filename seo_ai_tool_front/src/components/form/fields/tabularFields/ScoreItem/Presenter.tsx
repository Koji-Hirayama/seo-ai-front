import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayInsert,
  UseFormRegister,
} from "react-hook-form";
import { ScoreFormData } from "../TablarForm";
import { FieldArrayName, ItemKey } from "../type";
import { SubjectType } from "../subject";

interface Props {
  fieldArrayName: FieldArrayName;
  scoreTableHeader: string[];
  register: UseFormRegister<ScoreFormData>;
  items: FieldArrayWithId<ScoreFormData, FieldArrayName, ItemKey>[];
  selectedSubject: SubjectType;
  onChangeSubject: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  insert:
    | UseFieldArrayInsert<ScoreFormData, "scoreTableAItems">
    | UseFieldArrayInsert<ScoreFormData, "scoreTableBItems">;
  onClickInsertRow: (
    insert:
      | UseFieldArrayInsert<ScoreFormData, "scoreTableAItems">
      | UseFieldArrayInsert<ScoreFormData, "scoreTableBItems">,
    items: FieldArrayWithId<ScoreFormData, FieldArrayName, ItemKey>[],
    subject: SubjectType
  ) => void;
  errors: FieldErrors<ScoreFormData>;
}

const Presenter: React.FC<Props> = (props) => {
  const {
    fieldArrayName,
    scoreTableHeader,
    register,
    items,
    selectedSubject,
    onChangeSubject,
    insert,
    onClickInsertRow,
    errors,
  } = props;

  return (
    <>
      <table className={"w-full"}>
        <thead
          className={
            "px-2 first:pl-0 last:pr-0 text-xs text-left text-gray-800 w-3/12 font-bold"
          }
        >
          <tr className={"align-top table-row"}>
            <td className={"px-2 text-sm text-gray-600"}>
              <p>選択</p>
            </td>
            <td className={"px-1 w-10 text-center text-sm text-gray-600"}>
              <p>教科</p>
            </td>
            {scoreTableHeader.map((yearMonth, index) => (
              <td key={index} className={"px-1 text-sm text-gray-600"}>
                {yearMonth}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={"align-top table-row"}>
              <td className={"px-4 text-center"}>
                <input
                  type={"checkbox"}
                  defaultChecked={item.isSelected}
                  {...register(
                    `${fieldArrayName}.${index}.isSelected` as const
                  )}
                />
              </td>
              <td className={"px-1 text-center text-sm text-gray-600"}>
                <p>{item.subject.name}</p>
              </td>
              {item.scores.map((score, idx) => (
                <td
                  key={score.yearMonth}
                  className={"px-1 text-sm text-gray-600"}
                >
                  <div>
                    <input
                      type={"text"}
                      defaultValue={score.score || undefined}
                      {...register(
                        `${fieldArrayName}.${index}.scores.${idx}.score` as const,
                        {
                          min: {
                            value: 0,
                            message: "0〜100の数値を入力してください",
                          },
                          max: {
                            value: 100,
                            message: "0〜100の数値を入力してください",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "半角数値で入力してください",
                          },
                        }
                      )}
                      className={`border-gray-200 focus:border-gray-500 focus:outline-none appearance-none block py-3 px-4 w-full leading-tight text-gray-700 focus:bg-white rounded border`}
                    />

                    {/* NOTE: 配列内のプロパティ名を動的に指定しているため、ブラケット記法（[]）を使って、errorsのプロパティにアクセスしている */}
                    {errors[fieldArrayName]?.[index]?.scores?.[idx]?.score && (
                      <div className={"mt-1 text-xs text-red-500"}>
                        {
                          errors[fieldArrayName]?.[index]?.scores?.[idx]?.score
                            ?.message
                        }
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`flex py-4`}>
        <DropDown<SubjectType>
          value={selectedSubject}
          onSelect={onChangeSubject}
          selectOptions={SubjectTypes.map((subject) => ({
            label: subject.name,
            value: subject,
          }))}
        />

        <input
          type={"button"}
          value="行追加"
          onClick={() => onClickInsertRow(insert, items, selectedSubject)}
          className={
            "ml-4 px-2 py-1 bg-blue-400 text-white font-semibold rounded hover:bg-blue-500"
          }
        />
      </div>
    </>
  );
};

export default Presenter;
