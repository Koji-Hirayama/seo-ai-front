import React from "react";

type WarningAlertProps = {
  title?: string;
  messages?: string[];
};

const WarningAlert = ({
  title = "Warning!",
  messages = [],
}: WarningAlertProps) => {
  return (
    <div
      className="px-4 py-3 border rounded-radius1 text-sm bg-yellow-100 border-yellow-500 text-yellow-700"
      role="alert"
    >
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

export default WarningAlert;
