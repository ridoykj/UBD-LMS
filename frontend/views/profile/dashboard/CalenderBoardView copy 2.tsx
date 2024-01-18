// import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";

// const headerCss = 'p-2 rounded-lg shadow-lg bg-gray-500 text-white text-center font-bold items-center justify-center hover:bg-fuchsia-700';
// const cellCss = 'p-4 rounded-lg shadow-lg bg-fuchsia-500 text-white text-center font-bold items-center justify-center hover:bg-fuchsia-700';
// function CalenderBoardView() {

//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   function dayNameHeader() {
//     const divItem: any = [];
//     const dayNames = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     dayNames.forEach((dayName) => {
//       divItem.push(<div className={headerCss}>{dayName}</div>);
//     });
//     return divItem;
//   }

//   function dayHeader() {
//     const divItem = [];
//     for (let i = 1; i <= 31; i++) {
//       if (i % 7 === 1) {
//         divItem.push(<div className={cellCss}>--</div>);
//       }
//       divItem.push(<div className={cellCss}>{i}</div>);
//     }
//     return divItem;
//   }

//   function dayManager() {
//     const divItem: any = [];
//     const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

//     daysOfMonth.map((index, day) => {
//       divItem.push(<td className={cellCss} key={day}>{day}</td>);
//       if (index % 7 === 1) {
//         divItem.push(<tr></tr>);
//       }
//     });
//     return divItem;
//   }

//   return (
//     <>
//       <VerticalLayout className="h-full w-full items-stretch">
//         <table className="table-auto w-full text-center">
//           <thead>
//             <tr>
//               {daysOfWeek.map((day) => (
//                 <th className={headerCss} key={day}>{day}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {dayManager()}
//             </tr>
//           </tbody>
//         </table>
//       </VerticalLayout>
//     </>
//   );
// }

// export default CalenderBoardView;
