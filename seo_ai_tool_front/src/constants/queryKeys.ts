// クエリキーをまとめたオブジェクト
const queryKeys = {
  aiModels: {
    all: ["aiModels", "all"],
  },
  aiTypes: {
    all: ["aiTypes", "all"],
  },
  projects: {
    byUser: ["projects", "byUser"],
    // detail: {
    //   byId: (id: number) => ["projects", "detail", id],
    // },
  },
  tasks: {
    byProjectId: (id: number) => ["tasks", "byProjectId", id],
    // detail: {
    //   byId: (id: number) => ["tasks", "detail", id],
    // },
  },
  works: {
    byTaskId: (id: number) => ["tasks", "byTaskId", id],
    // detail: {
    //   byId: (id: number) => ["tasks", "detail", id],
    // },
  },
  aiTypeAiInputFields: {
    byAiTypeId: (id: number) => ["aiTypeAiInputFields", "byAiTypeId", id],
  },
  // その他のドメインに関するキーも同様に定義
};

export default queryKeys;
