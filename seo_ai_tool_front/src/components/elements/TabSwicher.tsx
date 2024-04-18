import React, { useState, useEffect } from "react";
type TabSwicherProps = {
  tabKyeValues: { key: string; value: string }[];
  activeTabKey: string;
  setActiveTabKey: React.Dispatch<React.SetStateAction<string>>;
  defaultTabKey?: string;
  onClick?: (tab: { key: string; value: string }) => void;
  btnTextSize?: string;
};
const TabSwicher = ({
  tabKyeValues,
  defaultTabKey,
  activeTabKey,
  setActiveTabKey,
  onClick,
  btnTextSize = "14px",
}: TabSwicherProps) => {
  useEffect(() => {
    if (defaultTabKey) setActiveTabKey(defaultTabKey);
  }, []);
  return (
    <div className="overflow-x-auto pb-3">
      <nav className="flex space-x-2 whitespace-nowrap">
        {tabKyeValues.map((tab, index) => (
          <button
            key={tab.key}
            style={{ fontSize: btnTextSize }}
            className={`p-3 block ${
              activeTabKey === tab.key
                ? "text-primary-1 duration-300 border-b-2 font-semibold border-primary-1"
                : "text-textColor3 duration-150 hover:text-primary-1 hover:border-b-2 hover:border-primary-1"
            }`}
            onClick={() => {
              setActiveTabKey(tab.key);
              onClick?.(tab);
            }}
          >
            {tab.value}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabSwicher;
