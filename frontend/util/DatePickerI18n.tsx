import { DatePickerDate, DatePickerI18n } from "@hilla/react-components/DatePicker.js";
import { format, parse } from "date-fns";


export const configDatePickerI18n: DatePickerI18n = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    weekdays: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    weekdaysShort: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    firstDayOfWeek: 1,
    today: 'Today',
    cancel: 'Cancel',
    parseDate: (inputValue: string) => parseDateIso8601(inputValue),
    formatDate: (date: DatePickerDate) => formatDateIso8601(date),
    referenceDate: '',
    formatTitle: (monthName: string, fullYear: number) => `${monthName} ${fullYear}`
};

function formatDateIso8601(dateParts: DatePickerDate) {
    const { year, month, day } = dateParts;
    const date = new Date(year, month, day);
    // return format(date, 'yyyy-MM-dd');
    return format(date, 'dd/MM/yyyy');
}

function parseDateIso8601(inputValue: string) {
    // const date = parse(inputValue, 'yyyy-MM-dd', new Date());
    const date = parse(inputValue, 'dd/MM/yyyy', new Date());
    return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}
