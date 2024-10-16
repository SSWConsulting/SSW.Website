"use client";
import { useEffect } from "react";

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

const ChatBaseBot = () => {
  useEffect(() => {
    const loadChatBase = () => {
      if (chatBaseBotId) {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = chatBaseBotId;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        loadChatBase();
      });
    } else {
      setTimeout(loadChatBase, 3000);
    }

    return () => {
      const existingScript = document.getElementById(chatBaseBotId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default ChatBaseBot;
