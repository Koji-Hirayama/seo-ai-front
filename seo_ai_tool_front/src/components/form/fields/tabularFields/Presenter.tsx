interface Props {
  scoreTableHeader: string[];
  scoreTableAProps: ScoreTableProps;
  scoreTableBProps: ScoreTableProps;
  register: UseFormRegister<ScoreFormData>;
  insertTableA: UseFieldArrayInsert<ScoreFormData, "scoreTableAItems">;
  insertTableB: UseFieldArrayInsert<ScoreFormData, "scoreTableBItems">;
  onClickInsertRow: (
    insert:
      | UseFieldArrayInsert<ScoreFormData, "scoreTableAItems">
      | UseFieldArrayInsert<ScoreFormData, "scoreTableBItems">,
    items: FieldArrayWithId<ScoreFormData, FieldArrayName, ItemKey>[],
    subject: SubjectType
  ) => void;
  onSubmit: UseFormHandleSubmit<ScoreFormData>;
  onSubmitScoreRegistration: (data: ScoreFormData) => void;
  errors: FieldErrors<ScoreFormData>;
}

const Presenter: React.FC<Props> = (props) => {
  const {
    scoreTableHeader,
    scoreTableAProps,
    scoreTableBProps,
    register,
    insertTableA,
    insertTableB,
    onClickInsertRow,
    onSubmit,
    onSubmitScoreRegistration,
    errors,
  } = props;

  return (
    <>
      <form onSubmit={onSubmit(onSubmitScoreRegistration)}>
        <h1 className={"mb-2"}>スコアテーブルA</h1>
        <ScoreItem
          fieldArrayName={FieldArrayName.SCORE_TABLE_A}
          scoreTableHeader={scoreTableHeader}
          register={register}
          items={scoreTableAProps.items}
          selectedSubject={scoreTableAProps.selectedSubject}
          onChangeSubject={scoreTableAProps.onChangeSubject}
          insert={insertTableA}
          onClickInsertRow={onClickInsertRow}
          errors={errors}
        />

        <h1 className={"mb-2"}>スコアテーブルb</h1>
        <ScoreItem
          fieldArrayName={FieldArrayName.SCORE_TABLE_B}
          scoreTableHeader={scoreTableHeader}
          register={register}
          items={scoreTableBProps.items}
          selectedSubject={scoreTableBProps.selectedSubject}
          onChangeSubject={scoreTableBProps.onChangeSubject}
          insert={insertTableB}
          onClickInsertRow={onClickInsertRow}
          errors={errors}
        />

        <div className={"mt-4"}>
          <button
            type={"submit"}
            className={
              "px-2 py-1 text-indigo-500 border border-indigo-500 font-semibold rounded hover:bg-indigo-100 text-lg"
            }
          >
            登録
          </button>
        </div>
      </form>
    </>
  );
};

export default Presenter;
