import React from "react";

type InfoAlertProps = {
  title?: string;
  messages?: string[];
};

const InfoAlert = ({
  title = "Information message",
  messages = [],
}: InfoAlertProps) => {
  return (
    <div className="px-4 py-3 border rounded-radius1 text-sm bg-blue-100 border-blue-500 text-blue-700">
      <strong className="font-bold">{title}</strong>
      <ul>
        {messages.map((message) => (
          <li key={message} className="block">
            ・{message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoAlert;
