import React, { useEffect, useState } from "react";
import TabSwicher from "../elements/TabSwicher";

type TabSwitcherWindowProps = {
  children: (tab: { key: string; value: string }) => React.ReactNode;
  tabKyeValues: { key: string; value: string }[];
  activeTabKey: string;
  setActiveTabKey: React.Dispatch<React.SetStateAction<string>>;
  defaultTabKey?: string;
  onClick?: (tab: { key: string; value: string }) => void;
  btnTextSize?: string;
};
const TabSwitcherWindow = ({
  children,
  tabKyeValues,
  defaultTabKey,
  activeTabKey,
  setActiveTabKey,
  onClick,
  btnTextSize = "14px",
}: TabSwitcherWindowProps) => {
  useEffect(() => {
    if (defaultTabKey) {
      setActiveTabKey(defaultTabKey);
    }
  }, []);

  const getTab = () => {
    const tab = tabKyeValues.find((x) => x.key === activeTabKey);
    if (tab) {
      return tab;
    }
    return { key: "", value: "" };
  };

  return (
    <div className="">
      <TabSwicher
        defaultTabKey={defaultTabKey}
        tabKyeValues={tabKyeValues}
        onClick={(tab) => {
          onClick?.(tab);
          setActiveTabKey(tab.key);
        }}
        btnTextSize={btnTextSize}
        activeTabKey={activeTabKey}
        setActiveTabKey={setActiveTabKey}
      />
      <div className="py-4 border-t-2">{children(getTab())}</div>
    </div>
  );
};

export default TabSwitcherWindow;
