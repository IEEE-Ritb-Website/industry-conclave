import { CONFIG } from "@/configs/config";
import ical, { ICalCalendarData, ICalCalendarMethod } from "ical-generator";

export const calendar = ical({
    name: CONFIG.name,
    timezone: "Asia/Kolkata",
    description: CONFIG.shortDescription,
    method: ICalCalendarMethod.REQUEST,
});

calendar.createEvent({
    id: "conclave-day-1-2025",
    start: new Date(CONFIG.eventDetails.day1Start),
    end: new Date(CONFIG.eventDetails.day1End),
    description: CONFIG.shortDescription,
    location: CONFIG.eventDetails.location,
    organizer: {
        name: "IEEE CIS",               // 🔥 REQUIRED
        email: "noreply@ieeecis.org",   // (use any valid email)
    },
});

calendar.createEvent({
    id: "conclave-day-2-2025",
    start: new Date(CONFIG.eventDetails.day2Start),
    end: new Date(CONFIG.eventDetails.day2End),
    description: CONFIG.shortDescription,
    location: CONFIG.eventDetails.location,
    organizer: {
        name: "IEEE CIS",
        email: "noreply@ieeecis.org",
    },
});
