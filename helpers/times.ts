export function formatDuration(durationString: string) {
  const time = durationString.split(":").map(Number);

  if (time.length === 1) {
    return `0:${time[0]}`;
  } else if (time.length === 2) {
    return `${time[0]}:${padZero(time[1])}`;
  } else {
    return `${time[0]}h${padZero(time[1])}`;
  }
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
