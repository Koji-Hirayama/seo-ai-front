import React from "react";

const Header = () => {
  return (
    <header className="bg-white h-16 border-b border-gray-200">
      <div className="flex h-full justify-between items-center">
        <div className="p-4">
          <ul className="flex space-x-10">
            <li>
              <a href="/">プロジェクトリスト</a>
            </li>
            <li>
              <a href="/">全てのタスク</a>
            </li>
            <li>
              <a href="/">全てのエンドポイント</a>
            </li>
          </ul>
        </div>
        <div className="p-4 flex space-x-10">
          <a href="">アカウント</a>
          <a href="">ログアウト</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
