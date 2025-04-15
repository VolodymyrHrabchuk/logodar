import { google } from "googleapis";

// Initialize Google Calendar client
const initializeCalendarClient = () => {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_CALENDAR_CLIENT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar"] // Full access for both reading and writing
  );

  return google.calendar({ version: "v3", auth });
};

// Fetch events from Google Calendar
export async function fetchCalendarEvents(
  timeMin,
  timeMax,
  calendarId = "logodar2020@gmail.com" // Replace with your actual calendar ID
) {
  try {
    const calendar = initializeCalendarClient();

    const response = await calendar.events.list({
      calendarId, // This will now use your specific calendar
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    // Rest of the function remains the same
    return response.data.items.map((event) => ({
      id: event.id,
      title: event.summary,
      description: event.description || "Немає опису",
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      location: event.location,
      htmlLink: event.htmlLink,
      hasEvent: true,
    }));
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

// Format events for calendar
export function formatEventsForCalendar(events) {
  const eventMap = {};

  events.forEach((event) => {
    const dateKey = formatDateKey(event.start);
    eventMap[dateKey] = {
      id: event.id,
      hasEvent: true,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      location: event.location,
      htmlLink: event.htmlLink,
    };
  });

  return eventMap;
}

// Helper function for formatting date
function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
