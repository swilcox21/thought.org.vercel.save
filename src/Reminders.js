/* eslint-disable no-unused-vars */
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewThought from "./components/newThought";
// import TextareaAutosize from 'react-textarea-autosize';

function Reminders(props) {
  const [loading, setLoading] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reminder/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(function (response) {
        setReminders(response.data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    window.location = "http://localhost:3000/";
  };
  // async function newThoughtPost(name, thought) {
  //   setLoading(true);
  //   const data = {
  //     name: name,
  //     thought: [thought],
  //   };
  //   await axios
  //     .post("https://thought-org.herokuapp.com/folder", data)
  //     .then((response) => {
  //       setLoading(false);
  //       axios
  //         .get("http://127.0.0.1:8000/reminder/")
  //         .then(function (response) {
  //           setReminders(response.data);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  return (
    <>
      {/* <div className="my-3">
        {reminders.length > 0 && (
          <NewThought
            newReminderPost={newReminderPost}
            reminders={reminders}
          />
        )}
      </div> */}
      {/* {props.reminders.map((reminder, index) => (
        <div key={reminder.id}>{reminder.reminder}</div>
      ))} */}
      <button onClick={() => handleLogout()}>HOME</button>
    </>
  );
}

export default Reminders;
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
