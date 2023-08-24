import Script from "next/script";

const ChatBaseBot = () => {
  return (
    <>
      <Script
        async
        src="https://www.chatbase.co/embed.min.js"
        id={process.env.CHATBASE_BOT_ID}
      />
    </>
  );
};

export default ChatBaseBot;
