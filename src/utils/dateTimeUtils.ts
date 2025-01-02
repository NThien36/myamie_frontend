export function formatDateForInput(
  dateTimeString: string | null | undefined
): string {
  if (!dateTimeString) return ""; // Handle null or undefined
  return dateTimeString.split("T")[0]; // Extract the date part
}

export const getTimeFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
