import Script from "next/script";

const ChatBaseBot = () => {
  const ChatBotId = process.env.NEXT_PUBLIC_CHATBASE_BOT_ID;

  if (!ChatBotId) {
    // eslint-disable-next-line no-console
    console.log("ChatBot ID is not provided!!");
  }
  return (
    <>
      {ChatBotId && (
        <Script
          src="https://www.chatbase.co/embed.min.js"
          id={ChatBotId}
          defer
        />
      )}
    </>
  );
};

export default ChatBaseBot;
