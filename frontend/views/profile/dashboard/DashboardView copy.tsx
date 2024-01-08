// import { Button } from '@hilla/react-components/Button.js';
// import { Notification } from '@hilla/react-components/Notification.js';
// import { HelloWorldService } from 'Frontend/generated/endpoints';
// import { useState } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';

// const includedFeatures = [
//   'Fully equipped learning resources centre',
//   'IT suites',
//   'Teaching and learning space, equipped with interactive screen technology',
//   'Separate male and female health & fitness suites',
//   'Prayer rooms, a refectory, student service hub and a range of internal and external student break out zones',
// ]

// export default function DashboardView() {

//   const [name, setName] = useState('');
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl sm:text-center">
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us & the Campus</h2>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             AFG College with the University of Aberdeen is a unique partnership between Al
//             Faleh Educational Holding and the University of Aberdeen which opened its doors in September 2017.
//             The establishment of the institution is a significant achievement
//             as AFG College with the University of Aberdeen is the first British university at
//             a dedicated campus offering undergraduate and postgraduate degrees within the State of Qatar.
//           </p>
//         </div>
//         <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
//           <div className="p-8 sm:p-10 lg:flex-auto">
//             <h3 className="text-2xl font-bold tracking-tight text-gray-900">Campus facilities:</h3>
//             <p className="mt-6 text-base leading-7 text-gray-600">
//               In addition to the College’s on campus facilities in Doha, students enjoy access to the University
//               of Aberdeen's online learning portal.
//             </p>
//             <div className="mt-10 flex items-center gap-x-4">
//               <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
//               <div className="h-px flex-auto bg-gray-100" />
//             </div>
//             <ul
//               role="list"
//               className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
//             >
//               {includedFeatures.map((feature) => (
//                 <li key={feature} className="flex gap-x-3">
//                   <FaCheckCircle className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
//             <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
//               <div className="mx-auto max-w-xs px-8">
//                 <p className="text-base font-semibold text-gray-600">We offer a variety of undergraduate and postgraduate degree programmes.</p>
//                 <p className="mt-6 flex items-baseline justify-center gap-x-2">
//                   <span className="text-5xl font-bold tracking-tight text-gray-900">Learn more</span>
//                   <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">|</span>
//                 </p>
//                 <Button
//                   className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   onClick={async () => {
//                     const serverResponse = await HelloWorldService.sayHello(name);
//                     Notification.show(serverResponse);
//                   }}
//                 >
//                   Undergraduate programmes
//                 </Button>

//                 <Button
//                   className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   onClick={async () => {
//                     const serverResponse = await HelloWorldService.sayHello(name);
//                     Notification.show(serverResponse);
//                   }}
//                 >
//                   Postgraduate programmes
//                 </Button>
//                 <p className="mt-6 text-xs leading-5 text-gray-600">
//                   Invoices and receipts available for easy company reimbursement
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

// }
