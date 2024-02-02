// import { DateSelectArg } from '@fullcalendar/core/index.js';
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import { useState } from 'react';

// const includedFeatures = [
//   'Fully equipped learning resources centre',
//   'IT suites',
//   'Teaching and learning space, equipped with interactive screen technology',
//   'Separate male and female health & fitness suites',
//   'Prayer rooms, a refectory, student service hub and a range of internal and external student break out zones',
// ]

// export default function DashboardView() {
//   const [name, setName] = useState('');

//   let eventGuid = 0;
//   function createEventId(): string | undefined {
//     return String(eventGuid++)
//   }

//   const handleDateClick = (arg: { dateStr: any; }) => { // bind with an arrow function
//     alert(arg.dateStr)
//   }
//   const handleEventDrop = (arg: { event: any; }) => {
//     // Handle event drop logic here
//     console.log('Event dropped:', arg.event);
//   }

//   const state = {
//     weekendsVisible: true,
//     currentEvents: []
//   }

//   function handleDateSelect(selectInfo: DateSelectArg): void {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   function renderEventContent(eventInfo: any) {
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <br />
//         <i>{eventInfo.event.title}</i>
//       </>
//     )
//   }


//   const handleEventClick = (clickInfo: any) => {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   const handleEvents = (events: any) => {
//     // useState({
//     //   currentEvents: events
//     // })
//   }
//   return (
//     <>
//       {/* https://stackblitz.com/github/fullcalendar/fullcalendar-examples/tree/main/react?file=src%2FDemoApp.jsx */}
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay',
//         }}
//         slotLabelFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false
//         }}
//         weekends={state.weekendsVisible}
//         // dateClick={handleDateClick}        
//         // eventDrop={handleEventDrop}
//         select={handleDateSelect}
//         events={[
//           { title: 'event 1', date: '2024-01-01' },
//           { title: 'event 2', date: '2024-01-02' }
//         ]}
//         eventContent={renderEventContent} // custom render function
//         eventClick={handleEventClick}
//         eventsSet={handleEvents}
//       />
//     </>
//   )
// }


