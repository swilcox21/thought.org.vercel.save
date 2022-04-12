/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// import "../App.css";
// import React, { useState } from "react";
// import PropTypes from "prop-types";

// function Navbar(props) {
//   const [allFolders, setAllFolders] = useState(props.allFolders);
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
//         <a className="navbar-brand" href="#">
//           Forever
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span>{props.allFolders.length}</span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           {props.allFolders.length > 0 &&
//             props.allFolders.map((folder, index) => (
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item active">
//                   <span
//                     className="nav-link"
//                     onClick={() =>
//                       props.folderPut(
//                         folder.id,
//                         folder.name,
//                         !folder.dashboard,
//                         folder.toggle
//                       )
//                     }
//                   >
//                     {folder.name}&nbsp;({folder.thought.length})
//                   </span>
//                 </li>
//               </ul>
//             ))}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;

// Navbar.propTypes = {
//   allFolders: PropTypes.array,
//   folderPut: PropTypes.func,
// };
