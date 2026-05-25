import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import { ArrowLeft, ArrowRight, NotepadText } from 'lucide-react';
import { useState } from 'react';
import InterviewPopup from './InterviewDialog';
import type { TInterviewEvent } from '../types/dashboard.types';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const myEventsList = [
    {
        title: '10:00 AM - Alex R. (Google)',
        start: new Date(2026, 4, 24, 10, 0),
        end: new Date(2026, 4, 24, 11, 0),
        bgColor: '#0e7cd4',
        textColor: '#1e40af',
    },
];

export default function WeeklyCalendarView({ interviews }: { interviews: any }) {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
        setOpen(true);
    };



    console.log(interviews)
    return (
        <div className="h-[700px] w-full relative">
            <Calendar
                localizer={localizer}
                events={interviews}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={['month', 'week', 'day']}
                onSelectEvent={handleSelectEvent}

                toolbar={true}
                popup
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.bgColor,
                        borderRadius: "10px",
                        border: "none",
                        padding: "4px 8px",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 500,
                    },
                })}
            />
            <InterviewPopup isOpen={open} onOpenChange={setOpen} data={selectedEvent?.resource} />
        </div>
    );
}