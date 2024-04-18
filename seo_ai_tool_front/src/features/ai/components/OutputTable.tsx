import React from "react";

type OutputTableProps = {
  datas: any[];
};
const OutputTable = ({ datas }: OutputTableProps) => {
  const createHeaders = (data: any[]) => {
    if (data?.length === 0) return [];
    const sampleObject = data[0];
    return Object.keys(sampleObject).map((key) => ({
      key: key,
    }));
  };
  const columns = createHeaders(datas);
  {
    /* テーブルアウトプットレイアウト作成（仮） */
  }
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-textColor3">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                scope="col"
                key={column.key}
                className={`px-6 py-4 font-medium text-gray-900 ${
                  index < columns.length - 1 && "border-r"
                }`}
              >
                {column.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {datas.map((item, index) => (
            <tr className="hover:bg-gray-50" key={index}>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`px-6 py-4 ${
                    index < columns.length - 1 && "border-r"
                  }`}
                >
                  {/* 改行に対応(文字列限定に) */}
                  {typeof item[column.key] === "string"
                    ? item[column.key]
                        .split("\n")
                        .map((line: any, index: number) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputTable;
