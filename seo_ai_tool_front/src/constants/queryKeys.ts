// クエリキーをまとめたオブジェクト
const queryKeys = {
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
  // その他のドメインに関するキーも同様に定義
};

export default queryKeys;
