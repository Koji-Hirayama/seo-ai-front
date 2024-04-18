import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type OutputSimpleTableProps = {
  datas: any[];
};
const OutputSimpleTable = ({ datas }: OutputSimpleTableProps) => {
  const createHeaders = (data: any[]) => {
    if (data?.length === 0) return [];
    const sampleObject = data[0];
    return Object.keys(sampleObject).map((key) => ({
      key: key,
    }));
  };
  const columns = createHeaders(datas);
  return (
    <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-50 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-textColor3">
        <tbody className="divide-y divide-gray-100 border-gray-100">
          {datas.map((item, index) => (
            <React.Fragment key={index}>
              {columns.map((column, column_index) => (
                <tr className="hover:bg-gray-50" key={column_index}>
                  <td
                    className={`px-6 py-4 border-r bg-gray-50 ${
                      index !== 0 && column_index === 0 && "border-t-2"
                    }`}
                  >
                    {column.key}
                  </td>
                  {column.key.toLowerCase() === "url".toLowerCase() ? (
                    <td
                      className={`px-6 py-4 ${
                        index !== 0 && column_index === 0 && "border-t-2"
                      }`}
                    >
                      <a
                        href={item[column.key]}
                        target="_blank"
                        className="underline text-blue-600 flex items-center"
                      >
                        {item[column.key]}
                        <FaExternalLinkAlt className="ml-1" />
                      </a>
                    </td>
                  ) : (
                    <td
                      className={`px-6 py-4 ${
                        index !== 0 && column_index === 0 && "border-t-2"
                      }`}
                    >
                      {item[column.key]}
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputSimpleTable;
