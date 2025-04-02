const AlternatingText = ({ text }: { text: string }) => {
  if (!text) return <></>;
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((item, index) => {
        const match = item.match(/\*\*(.*)\*\*/);
        return match ? (
          <span key={`alternating-text-${index}`} className="text-sswRed">
            {match[1]}
          </span>
        ) : (
          <span key={`alternating-text-${index}`}>{item}</span>
        );
      })}
    </>
  );
};

export default AlternatingText;
