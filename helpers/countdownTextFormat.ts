export default function countdownTextFormat(countdownMins: number) {
  const hours = Math.floor(countdownMins / 60);
  const minutes = countdownMins % 60;

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
