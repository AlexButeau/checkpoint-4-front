// import React from 'react';

// // Import the component into your project
// import TimeInputPolyfill from 'react-time-input-polyfill';

// export const TimeInput = ({ label, currentValue, onInputChange }) => {
//   return (
//     <label>
//       <span>{label}</span>
//       <TimeInputPolyfill
//         // set the value through props
//         value={currentValue}
//         // onChange will run every time the value is updated
//         onChange={({ value, element }) => {
//           console.log({
//             // The current value in 24 hour time format
//             value,

//             // The <input> HTML element
//             element,
//           });

//           // Export the new value to the parent component
//           onInputChange(value);
//         }}
//       />
//     </label>
//   );
// };
