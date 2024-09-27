export function createDateTime(date:any, startTime:any) {
  // Combine the date and startTime to create a DateTime object
  const startDateTime = new Date(`${date}T${startTime}`);
  const durationMinutes = 45
  // Calculate the end time by adding the duration (in minutes)
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

  return {
    startTime: startDateTime.toISOString(), // Start DateTime in ISO format
    endTime: endDateTime.toISOString(),     // End DateTime in ISO format
  };
}