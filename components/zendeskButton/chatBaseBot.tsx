"use client";

import Script from "next/script";

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

// Chatbase reveals its greeting bubble 3s after the embed loads and offers no way
// to dismiss it, so we hide it ourselves after 10s on screen.
const DISMISS_GREETING_AFTER_LOAD_MS = 8_000;

const dismissGreetingBubble = () => {
  setTimeout(() => {
    const bubble = document.getElementById("chatbase-message-bubbles");
    if (bubble) bubble.style.display = "none";
  }, DISMISS_GREETING_AFTER_LOAD_MS);
};

const ChatBaseBot = () => {
  return (
    chatBaseBotId && (
      <Script
        src="https://www.chatbase.co/embed.min.js"
        id={chatBaseBotId}
        async
        defer
        strategy="lazyOnload"
        onLoad={dismissGreetingBubble}
      />
    )
  );
};

export default ChatBaseBot;
