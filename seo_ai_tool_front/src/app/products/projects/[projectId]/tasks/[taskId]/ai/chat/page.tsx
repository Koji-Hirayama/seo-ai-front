"use client";
import Header from "@/components/layouts/Header";
import useParamsStore from "@/stores/paramsStore";
// import {
//   Timestamp,
//   addDoc,
//   collection,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
// } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { FaBeer, FaPaperPlane } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
// import { db } from "../../firebase";
// import { useAppContext } from "@/context/AppContext";
// import OpenAI from "openai";
// import LoadingIcons from "react-loading-icons";

type Message = {
  text: string;
  sender: string;
  createdAt: string;
};

const Page = ({
  params,
}: {
  params: { projectId: number; taskId: number; workId: number };
}) => {
  //   const openai = new OpenAI({
  //     apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  //     dangerouslyAllowBrowser: true,
  //   });

  const { setParams } = useParamsStore();

  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoding, setIsLoding] = useState<boolean>(false);

  useEffect(() => {
    setParams(params.projectId, params.taskId, params.workId);
  }, []);

  const scrollDiv = useRef<HTMLDivElement>(null);

  // 各Roomにおけるメッセージを取得する。
  useEffect(() => {
    const initMessages: Message[] = [
      {
        text: "こんにちわ",
        sender: "user",
        createdAt: "2024-03-20 12:00:00",
      },
      {
        text: "こんにちわ",
        sender: "ai",
        createdAt: "2024-03-20 12:01:00",
      },
      {
        text: "〇〇です",
        sender: "user",
        createdAt: "2024-03-20 12:00:00",
      },
      {
        text: "AIです",
        sender: "ai",
        createdAt: "2024-03-20 12:01:00",
      },
    ];
    setMessages(initMessages);
  }, []);

  useEffect(() => {
    if (scrollDiv.current) {
      const element = scrollDiv.current;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      text: inputMessage,
      sender: "user",
      createdAt: "2024-03-20 12:10:00",
    };

    setMessages([...messages, messageData]);
    // メッセージをFirebaseに保存
    // const roomDocRef = doc(db, "rooms", selectedRoom!);
    // const messageCollectionRef = collection(roomDocRef, "messages");
    // await addDoc(messageCollectionRef, messageData);

    setInputMessage("");
    setIsLoding(true);
    await wait("待機", 1000);
    const aiMessageData = {
      text: "AIからの解答",
      sender: "AI",
      createdAt: "2024-03-20 12:11:00",
    };

    setMessages((pre) => [...pre, aiMessageData]);

    // OpenAIからの返信
    // const gpt3Response = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: inputMessage }],
    //   model: "gpt-3.5-turbo",
    // });
    // const botResponse = gpt3Response.choices[0].message.content;
    // const botMessageData = {
    //   text: botResponse,
    //   sender: "bot",
    //   createdAt: serverTimestamp(),
    // };
    // await addDoc(messageCollectionRef, botMessageData);

    setIsLoding(false);
  };

  async function wait(passed: string, delay: number) {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    console.log(`passed ${passed + delay}ms`);
    return passed + delay;
  }

  return (
    <>
      {/* <Header /> */}
      <main className="relative">
        <div className="flex h-screen justify-center items-center">
          <div className="bg-slate-400 h-full flex w-full">
            <div className="w-1/5 h-full border-r">
              <div className="bg-custom-blue h-full overflow-y-auto px-5 flex flex-col">
                <div className="flex-grow">
                  <div
                    onClick={() => {
                      //   addNewRoom();
                    }}
                    className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150"
                  >
                    <span className="text-white p-4 text-2xl">＋</span>
                    <h1 className="text-white text-xl font-semibold p-4">
                      New Chat
                    </h1>
                  </div>
                  <ul>
                    <li
                      className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150"
                      onClick={() => {
                        // selectRoom(room.id, room.name);
                      }}
                    >
                      ルーム名
                    </li>
                  </ul>
                </div>

                <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
                  test@gmail.com
                </div>
                <div
                  onClick={() => {
                    // handleLogout();
                  }}
                  className="text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:text-slate duration-150"
                >
                  <BiLogOut />
                  <span>ログアウト</span>
                </div>
              </div>
            </div>
            <div className="w-3/5 h-full">
              <div className="bg-gray-100 h-full p-4 flex flex-col">
                <h1 className="text-2xl text-textColor3 font-semibold mb-4">
                  タイトル
                </h1>
                <div className="flex-grow overflow-y-auto mb-4" ref={scrollDiv}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={
                        message.sender === "user" ? "text-right" : "text-left"
                      }
                    >
                      <div
                        className={
                          message.sender === "user"
                            ? "bg-blue-500 inline-block rounded px-4 py-2 mb-2"
                            : "bg-green-500 inline-block rounded px-4 py-2 mb-2"
                        }
                      >
                        <p className="text-white font-medium">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoding && <p>ローディング</p>}
                </div>

                <div className="flex-shrink-0 relative">
                  <input
                    type="text"
                    placeholder="Send a Message"
                    className="border-2 rounded w-full pr-10 focus:outline-none p-2"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        sendMessage();
                      }
                    }}
                  />
                  <button
                    className="absolute inset-y-0 right-4 flex items-center"
                    onClick={() => sendMessage()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/5 h-full border-r">
              <div className="bg-custom-blue h-full overflow-y-auto px-5 flex flex-col">
                <div className="flex-grow">
                  <div
                    onClick={() => {
                      //   addNewRoom();
                    }}
                    className="cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150"
                  >
                    <span className="text-white p-4 text-2xl">＋</span>
                    <h1 className="text-white text-xl font-semibold p-4">
                      New Chat
                    </h1>
                  </div>
                  <ul>
                    <li
                      className="cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150"
                      onClick={() => {
                        // selectRoom(room.id, room.name);
                      }}
                    >
                      ルーム名
                    </li>
                  </ul>
                </div>

                <div className="mb-2 p-4 text-slate-100 text-lg font-medium">
                  test@gmail.com
                </div>
                <div
                  onClick={() => {
                    // handleLogout();
                  }}
                  className="text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:text-slate duration-150"
                >
                  <BiLogOut />
                  <span>ログアウト</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
