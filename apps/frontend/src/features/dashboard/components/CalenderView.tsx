import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import {enUS} from 'date-fns/locale/en-US';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Mock data based on the screenshot
const myEventsList = [
    {
        title: '10:00 AM - Alex R. (Google)',
        start: new Date(2026, 4, 13, 10, 0), // Adjust month/year to match your current week
        end: new Date(2026, 4, 13, 11, 0),
        bgColor: '#d2e3fc',
        textColor: '#1e40af'
    },
    {
        title: '02:30 PM - Jamie L. (Stripe)',
        start: new Date(2026, 4, 15, 14, 30),
        end: new Date(2026, 4, 15, 15, 30),
        bgColor: '#bd5118',
        textColor: '#ffffff'
    },
    {
        title: '04:00 PM - Sam T. (Meta)',
        start: new Date(2026, 4, 15, 16, 0),
        end: new Date(2026, 4, 15, 17, 0),
        bgColor: '#0e7cd4',
        textColor: '#ffffff'
    }
];

export default function WeeklyCalendarView() {
    return (
        <div className="h-[240px] w-full font-sans">
            <Calendar
                localizer={localizer}
                events={myEventsList}
                defaultView="week"
                views={['week']}
                toolbar={false} // Hiding default toolbar to match UI (custom buttons are above in parent)
                step={60}
                showMultiDayTimes
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.bgColor,
                        color: event.textColor,
                        borderRadius: '4px',
                        border: 'none',
                        fontSize: '11px',
                        padding: '2px 4px',
                        fontWeight: '500'
                    }
                })}
            />
        </div>
    );
}