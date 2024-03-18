import React from "react";

type ErrorAlertProps = {
  title?: string;
  messages?: string[];
};

const ErrorAlert = ({ title = "Error!", messages = [] }: ErrorAlertProps) => {
  return (
    <div
      className="px-4 py-3 border rounded-radius1 text-sm bg-red-100 border-red-400 text-red-700"
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

export default ErrorAlert;
