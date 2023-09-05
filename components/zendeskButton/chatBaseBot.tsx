import Script from "next/script";

const ChatBaseBot = ({ id }) => {
  if (!id) {
    // eslint-disable-next-line no-console
    console.log("ChatBot ID is not provided!!");
    return <></>;
  }
  return (
    <>
      <Script src="https://www.chatbase.co/embed.min.js" id={id} defer />
    </>
  );
};

export default ChatBaseBot;
