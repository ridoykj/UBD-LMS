// import React, { useEffect, useRef } from 'react';
// import './SplitPane.css';

// type SplitPaneProps = {
//     primary: React.ReactNode;
//     secondary: React.ReactNode;
// };

// const SplitPane: React.FC<SplitPaneProps> = (props) => {
//     // Implement your component logic here
//     const resizerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const resizer = resizerRef.current;
//         if (!resizer) return;

//         const direction = resizer.getAttribute('data-direction') || 'horizontal';
//         const prevSibling = resizer.previousElementSibling;
//         const nextSibling = resizer.nextElementSibling;

//         let x = 0;
//         let y = 0;
//         let prevSiblingHeight = 0;
//         let prevSiblingWidth = 0;

//         const mouseDownHandler = function (e: any) {
//             x = e.clientX;
//             y = e.clientY;
//             const rect = prevSibling?.getBoundingClientRect(); // Add null check for prevSibling
//             prevSiblingHeight = rect?.height || 0; // Use optional chaining and provide a default value
//             prevSiblingWidth = rect?.width || 0; // Use optional chaining and provide a default value

//             document.addEventListener('mousemove', mouseMoveHandler);
//             document.addEventListener('mouseup', mouseUpHandler);
//         };

//         const mouseMoveHandler = function (e: any) {
//             const dx = e.clientX - x;
//             const dy = e.clientY - y;

//             switch (direction) {
//                 case 'vertical':
//                     const h = ((prevSiblingHeight + dy) * 100) / resizer.parentNode?.getBoundingClientRect().height;
//                     prevSibling.style.height = `${h}%`;
//                     break;
//                 case 'horizontal':
//                 default:
//                     const w = ((prevSiblingWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
//                     prevSibling.style.width = `${w}%`;
//                     break;
//             }

//             const cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
//             resizer.style.cursor = cursor;
//             document.body.style.cursor = cursor;

//             prevSibling.style.userSelect = 'none';
//             prevSibling.style.pointerEvents = 'none';

//             nextSibling.style.userSelect = 'none';
//             nextSibling.style.pointerEvents = 'none';
//         };

//         const mouseUpHandler = function () {
//             resizer.style.removeProperty('cursor');
//             document.body.style.removeProperty('cursor');

//             prevSibling.style.removeProperty('user-select');
//             prevSibling.style.removeProperty('pointer-events');

//             nextSibling.style.removeProperty('user-select');
//             nextSibling.style.removeProperty('pointer-events');

//             document.removeEventListener('mousemove', mouseMoveHandler);
//             document.removeEventListener('mouseup', mouseUpHandler);
//         };

//         resizer.addEventListener('mousedown', mouseDownHandler);

//         return () => {
//             resizer.removeEventListener('mousedown', mouseDownHandler);
//         };
//     }, []);
//     return (
//         // JSX code for your component's UI
//         <div className="container">
//             <div className="container__left"> {props.primary}</div>
//             <div className="resizer" ref={resizerRef} data-direction="horizontal"></div>
//             <div className="container__right">
//                 {props.secondary}
//             </div>
//             {/* <div className="container__right">
//                 <div className="container__top">Top</div>
//                 <div className="resizer" data-direction="vertical"></div>
//                 <div className="container__bottom">Bottom</div>
//             </div> */}
//         </div>
//     );
// };

// export default SplitPane;