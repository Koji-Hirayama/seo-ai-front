import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white h-16 border-b border-gray-200">
      <div className="flex h-full justify-between items-center text-mainTextColor">
        <div className="p-4">
          <ul className="flex space-x-10">
            <li>
              <Link href="/products/projects">プロジェクトリスト</Link>
            </li>
            <li>
              <Link href="/">全てのタスク</Link>
            </li>
            <li>
              <Link href="/">全てのエンドポイント</Link>
            </li>
          </ul>
        </div>
        <div className="p-4 flex space-x-10">
          <Link href="">アカウント</Link>
          <Link href="">ログアウト</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
