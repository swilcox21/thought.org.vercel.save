/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Folder from './components/folder';
import Thought from './components/thought';
import NewThought from './components/newThought';
import Navbar from './components/navbar2';
import Dashboard from './components/dashboard';

function App() {
  const [loading, setLoading] = useState(false);
  const [allFolders, setAllFolders] = useState([]);
  const [allThoughts, setAllThoughts] = useState([]);

  // onLoad Get Requests
  useEffect(() => {
    axios.get('https://thought-org.herokuapp.com/folder').then(function (response) {
      setAllFolders(response.data);
      console.log(response);
    });
    axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
      setAllThoughts(response.data);
      console.log(response);
    });
  }, []);
  // Post Requests
  async function newThoughtPost(name, thought) {
    setLoading(true);
    const data = {
      name: name,
      thought: [thought],
    };
    await axios
      .post('https://thought-org.herokuapp.com/folder', data)
      .then((response) => {
        setLoading(false);
        axios.get('https://thought-org.herokuapp.com/folder').then(function (response) {
          setAllFolders(response.data);
        });
        axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
          setAllThoughts(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function folderPost(name, thought_id, thought, dashboard) {
    setLoading(true);
    const data = {
      name: name,
      thought: [thought],
    };
    await axios
      .post('https://thought-org.herokuapp.com/folder/new/', data)
      .then((response) => {
        setLoading(false);
        thoughtPut(thought_id, thought, dashboard, response.data.id);
        axios.get('https://thought-org.herokuapp.com/folder').then(function (response) {
          setAllFolders(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function thoughtPost(thought, folder_id) {
    setLoading(true);
    const data = {
      thought: thought,
      folder: folder_id,
    };
    await axios
      .post('https://thought-org.herokuapp.com/thought', data)
      .then((response) => {
        setLoading(false);
        axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
          setAllThoughts(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  // Put Requests
  async function folderPut(folder_id, name, dashboard, toggle) {
    setLoading(true);
    const data = {
      name: name,
      dashboard: dashboard,
      toggle: toggle,
    };
    await axios
      .put('https://thought-org.herokuapp.com/folder/' + folder_id, data)
      .then(function (response) {
        setLoading(false);
        axios.get('https://thought-org.herokuapp.com/folder').then(function (response) {
          setAllFolders(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function thoughtPut(thought_id, thought, dashboard, folder_id) {
    setLoading(true);
    const data = {
      thought: thought,
      dashboard: dashboard,
      folder: folder_id,
    };
    await axios
      .put('https://thought-org.herokuapp.com/thought/' + thought_id, data)
      .then(function (response) {
        setLoading(false);
        axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
          setAllThoughts(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  // delete requests
  async function thoughtDelete(thought_id) {
    await axios.delete('https://thought-org.herokuapp.com/thought/' + thought_id).then((response) =>
      axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
        setAllThoughts(response.data);
      }),
    );
  }
  async function folderDelete(thought_id) {
    await axios
      .delete('https://thought-org.herokuapp.com/folder/' + thought_id)
      .then((response) => {
        setLoading(false);
        axios.get('https://thought-org.herokuapp.com/folder').then(function (response) {
          setAllFolders(response.data);
        });
        axios.get('https://thought-org.herokuapp.com/thought').then(function (response) {
          setAllThoughts(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  // HTML code
  return (
    <>
      <Navbar allFolders={allFolders} folderPut={folderPut} />
      <div className="App container-fluid col-md-8 col-lg-6 col-xl-5">
        <br />
        <br />
        {/* DASHBOARD */}
        {allThoughts.length > 0 &&
          allThoughts
            .filter((thought) => thought.dashboard === true)
            .map((thot, index) => (
              <div key={thot.id} className="my-3">
                <Dashboard
                  thoughtPut={thoughtPut}
                  thought={thot}
                  folder={thot.folder}
                  allThoughts={allThoughts}
                  thoughtDelete={thoughtDelete}
                  allFolders={allFolders}
                />
                <br />
              </div>
            ))}
        {/* NEW THOUGHT */}
        <div className="my-3">
          {allFolders.length > 0 && (
            <NewThought
              newThoughtPost={newThoughtPost}
              allFolders={allFolders}
              allThoughts={allThoughts}
            />
          )}
        </div>
        {/* REMINDERS DASHBOARD */}
        {allThoughts.length > 0 &&
          allThoughts
            .filter(
              (thought) => (thought.dashboard !== true) & (thought.folder.name === 'reminders'),
            )
            .map((thought, index) => (
              <div key={thought.id}>
                <Thought
                  folderPost={folderPost}
                  thoughtPut={thoughtPut}
                  thought={thought}
                  folder={thought.folder}
                  allFolders={allFolders}
                  allThoughts={allThoughts}
                  thoughtDelete={thoughtDelete}
                />
              </div>
            ))}
        {/* ALL OTHER FOLDERS DASHBOARD */}
        <br />
        <br />
        <br />
        <div className="borderBottom mb-3"></div>
        {allFolders.length > 0 &&
          allFolders
            .filter((folder) => (folder.dashboard === true) & (folder.name !== 'reminders'))
            .map((folder, index) => (
              <div key={folder.id}>
                <Folder
                  folderPost={folderPost}
                  thoughtPost={thoughtPost}
                  thoughtPut={thoughtPut}
                  folderPut={folderPut}
                  folderDelete={folderDelete}
                  thoughtDelete={thoughtDelete}
                  folder={folder}
                  allFolders={allFolders}
                  allThoughts={allThoughts}
                />
              </div>
            ))}
      </div>
    </>
  );
}

export default App;
