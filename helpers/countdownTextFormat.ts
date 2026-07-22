export default function countdownTextFormat(countdownMins: number) {
  // Guard against negative input (a stream that has already started or
  // finished); otherwise the floor/modulo maths below yields nonsensical text.
  const remaining = Math.max(0, countdownMins);
  const hours = Math.floor(remaining / 60);
  const minutes = remaining % 60;

  let countdownText = "";

  if (hours > 1) {
    countdownText += `${hours} hours`;
  } else if (hours == 1) {
    countdownText += `${hours} hour`;
  }

  if (hours > 0 && minutes >= 0) {
    countdownText += " and ";
  }

  if (minutes > 1) {
    countdownText += `${minutes} minutes`;
  } else if (minutes === 1 || minutes == 0) {
    countdownText += "1 minute";
  }

  return countdownText;
}
