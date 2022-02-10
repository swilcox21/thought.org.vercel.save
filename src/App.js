/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./App.css";
import axios from "axios";
import Folder from "./components/folder";
import Thought from "./components/thought";
import NewThought from "./components/newThought";
// vercel
function App() {
  const [loading, setLoading] = useState(false);
  const [allFolders, setAllFolders] = useState({});
  const [allThoughts, setAllThoughts] = useState({});

  // onLoad Get Requests
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/folder").then(function (response) {
      setAllFolders(response.data);
      console.log(response);
    });
    axios.get("http://127.0.0.1:8000/thought").then(function (response) {
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
      .post("http://127.0.0.1:8000/folder", data)
      .then((response) => {
        setLoading(false);
        axios.get("http://127.0.0.1:8000/folder").then(function (response) {
          setAllFolders(response.data);
        });
        axios.get("http://127.0.0.1:8000/thought").then(function (response) {
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
      .post("http://127.0.0.1:8000/folder/new/", data)
      .then((response) => {
        setLoading(false);
        thoughtPut(thought_id, thought, dashboard, response.data.id);
        axios.get("http://127.0.0.1:8000/folder").then(function (response) {
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
      .post("http://127.0.0.1:8000/thought", data)
      .then((response) => {
        setLoading(false);
        axios.get("http://127.0.0.1:8000/thought").then(function (response) {
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
      .put("http://127.0.0.1:8000/folder/" + folder_id, data)
      .then(function (response) {
        setLoading(false);
        axios.get("http://127.0.0.1:8000/folder").then(function (response) {
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
      .put("http://127.0.0.1:8000/thought/" + thought_id, data)
      .then(function (response) {
        setLoading(false);
        axios.get("http://127.0.0.1:8000/thought").then(function (response) {
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
    await axios
      .delete("http://127.0.0.1:8000/thought/" + thought_id)
      .then((response) =>
        axios.get("http://127.0.0.1:8000/thought").then(function (response) {
          setAllThoughts(response.data);
        })
      );
  }
  async function folderDelete(thought_id) {
    await axios
      .delete("http://127.0.0.1:8000/folder/" + thought_id)
      .then((response) => {
        setLoading(false);
        axios.get("http://127.0.0.1:8000/folder").then(function (response) {
          setAllFolders(response.data);
        });
        axios.get("http://127.0.0.1:8000/thought").then(function (response) {
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
    <div className="App container-fluid">
      <h1>I love my girlfriend</h1>
      {allThoughts.length > 0 &&
        allThoughts
          .filter((thought) => thought.dashboard === true)
          .map((thot, index) => (
            <div key={thot.id} className="my-3">
              <Thought
                folderPost={folderPost}
                thoughtPut={thoughtPut}
                thought={thot}
                folder={thot.folder}
                allFolders={allFolders}
                allThoughts={allThoughts}
                thoughtDelete={thoughtDelete}
              />
              <br />
            </div>
          ))}
      <NewThought
        newThoughtPost={newThoughtPost}
        allFolders={allFolders}
        allThoughts={allThoughts}
      />
      {allFolders.length > 0 &&
        allFolders.map((folder, index) => (
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
  );
}

export default App;
