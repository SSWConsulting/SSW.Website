import { useState } from "react";

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

const ChatBaseBot = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    chatBaseBotId && (
      <>
        <button onClick={() => setChatOpen((prev) => !prev)}>
          Test button here
        </button>
        {chatOpen && (
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/gnbZXuG_5tgI_R3yzKcOn"
            width="100%"
            className=""
            style={{ height: "100%", minHeight: "700px" }}
            frameBorder={0}
          />
        )}
      </>
    )
  );
};

export default ChatBaseBot;
