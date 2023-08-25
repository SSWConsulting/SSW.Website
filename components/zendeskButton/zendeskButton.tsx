import Script from "next/script";

const ChatBaseBot = () => {
  console.log(
    process.env.NEXT_PUBLIC_CHATBASE_BOT_ID ?? "ChatBot ID is not provided"
  );
  return (
    <>
      <Script
        async
        src="https://www.chatbase.co/embed.min.js"
        id={process.env.NEXT_PUBLIC_CHATBASE_BOT_ID}
      />
    </>
  );
};

export default ChatBaseBot;
