import { useState } from "react";

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

const ChatBaseBot = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    chatBaseBotId && (
      <>
        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="fixed bottom-5 right-5 z-50 mx-auto rounded-full bg-ssw-red p-3"
        >
          <ChatIcon />
        </button>
        {/* eslint-disable tailwindcss/no-arbitrary-value */}
        {chatOpen && (
          <div
            className="fixed bottom-[5rem] right-[1rem] z-50 h-screen max-h-[824px] w-[448px] justify-between border-0 bg-white"
            style={{
              boxShadow:
                "rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px",
            }}
          >
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/gnbZXuG_5tgI_R3yzKcOn"
              width="100%"
              style={{ height: "100%", minHeight: "700px" }}
              frameBorder={0}
            />
          </div>
        )}
      </>
    )
  );
};

const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.3"
      stroke="white"
      width="24"
      height="24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      ></path>
    </svg>
  );
};

export default ChatBaseBot;
