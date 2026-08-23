"use client";

import Script from "next/script";
import { useEffect } from "react";

const chatBaseBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

const GREETING_BUBBLE_ID = "chatbase-message-bubbles";
const GREETING_BUBBLE_LIFETIME_MS = 10_000;

// Chatbase only lets us configure how long before the greeting bubble appears, never
// when it leaves. It renders the bubble up front with an inline `display: none` and
// flips that to show it, so we watch the style attribute rather than the node itself.
const useAutoDismissGreetingBubble = () => {
  useEffect(() => {
    if (!chatBaseBotId) return;

    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    const observers: MutationObserver[] = [];

    const scheduleHide = (bubble: HTMLElement) => {
      if (hideTimeout !== undefined || bubble.style.display === "none") return;

      hideTimeout = setTimeout(() => {
        bubble.style.display = "none";
        hideTimeout = undefined;
      }, GREETING_BUBBLE_LIFETIME_MS);
    };

    const watchBubble = (bubble: HTMLElement) => {
      const styleObserver = new MutationObserver(() => scheduleHide(bubble));
      styleObserver.observe(bubble, { attributeFilter: ["style"] });
      observers.push(styleObserver);
      scheduleHide(bubble);
    };

    const bubble = document.getElementById(GREETING_BUBBLE_ID);

    if (bubble) {
      watchBubble(bubble);
    } else {
      const injectionObserver = new MutationObserver(() => {
        const injected = document.getElementById(GREETING_BUBBLE_ID);
        if (!injected) return;

        injectionObserver.disconnect();
        watchBubble(injected);
      });

      injectionObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      observers.push(injectionObserver);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      clearTimeout(hideTimeout);
    };
  }, []);
};

const ChatBaseBot = () => {
  useAutoDismissGreetingBubble();

  return (
    chatBaseBotId && (
      <Script
        src="https://www.chatbase.co/embed.min.js"
        id={chatBaseBotId}
        async
        defer
        strategy="lazyOnload"
      />
    )
  );
};

export default ChatBaseBot;
