import {
  fetchCalendarEvents,
  formatEventsForCalendar,
} from "@/lib/google-calendar.server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || month === null) {
      return NextResponse.json(
        { message: "Відсутні параметри року та місяця" },
        { status: 400 }
      );
    }

    // Determine date range for the month
    const startDate = new Date(
      Number.parseInt(year),
      Number.parseInt(month),
      1
    );
    const endDate = new Date(
      Number.parseInt(year),
      Number.parseInt(month) + 1,
      0
    );

    const events = await fetchCalendarEvents(startDate, endDate);
    const formattedEvents = formatEventsForCalendar(events);

    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "Помилка при отриманні подій" },
      { status: 500 }
    );
  }
}
