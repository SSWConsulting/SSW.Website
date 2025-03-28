const AlternatingText = ({ text }: { text: string }) => {
  if (!text) return <></>;
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((item) => {
        const match = item.match(/\*\*(.*)\*\*/);
        return match ? <span className="text-sswRed">{match[1]}</span> : item;
      })}
    </>
  );
};

export default AlternatingText;
