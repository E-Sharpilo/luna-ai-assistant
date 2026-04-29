export function getCurrentTimeText(date: Date = new Date()): string {
  return date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
