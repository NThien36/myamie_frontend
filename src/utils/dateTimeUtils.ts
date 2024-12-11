export function formatDateForInput(
  dateTimeString: string | null | undefined
): string {
  if (!dateTimeString) return ""; // Handle null or undefined
  return dateTimeString.split("T")[0]; // Extract the date part
}
