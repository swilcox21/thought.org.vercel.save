import "../App.css";
import React, { useState } from "react";
import Thought from "./thought";
import PropTypes from "prop-types";

function Folder(props) {
  const [folderName, setFolderName] = useState("");
  const [toggle, setToggle] = useState(props.folder.toggle);
  const [thought, setThought] = useState("");
  const [dashboard, setDashboard] = useState(props.folder.dashboard);

  return (
    <div className="mb-4">
      <div className="d-flex">
        <h4
          onClick={() => {
            setToggle(!toggle);
            props.folderPut(
              props.folder.id,
              props.folder.name,
              props.folder.dashboard,
              !toggle
            );
          }}
        >
          {props.folder.name}
          {toggle === false ? (
            <i className="fas fa-folder"></i>
          ) : (
            <i className="fas fa-folder-open"></i>
          )}
        </h4>
        &nbsp;&nbsp;
        <span
          onClick={() => {
            props.folderPut(
              props.folder.id,
              props.folder.name,
              !props.folder.dashboard,
              props.folder.toggle
            );
            setDashboard(!dashboard);
          }}
        >
          [
          {props.allThoughts.length > 0 &&
            props.allThoughts.filter(
              (thought) => thought.folder.id === props.folder.id
            ).length}
          ]&nbsp;
        </span>
        <div className="dropdown">
          <span
            className=""
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            &nbsp;&nbsp;
            <i className="fas fa-cog"></i>
          </span>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <input
              type="text"
              placeholder="add thought"
              onChange={(e) => setThought(e.target.value)}
              onBlur={() => props.thoughtPost(thought, props.folder.id)}
            />
            <input
              type="text"
              placeholder="edit folder"
              onChange={(e) => setFolderName(e.target.value)}
              onBlur={() => props.folderPut(props.folder.id, folderName)}
            />
            <div
              className="text-center"
              onClick={() => props.folderDelete(props.folder.id)}
            >
              X
            </div>
          </div>
        </div>
      </div>
      {toggle === true
        ? props.allThoughts.length > 0 &&
          props.allThoughts
            .filter(
              (thought) =>
                (thought.folder.id === props.folder.id) &
                (thought.dashboard === false)
            )
            .map((thought, index) => (
              <div key={thought.id}>
                <Thought
                  folderPost={props.folderPost}
                  thoughtPut={props.thoughtPut}
                  thought={thought}
                  folder={props.folder}
                  allFolders={props.allFolders}
                  allThoughts={props.allThoughts}
                  thoughtDelete={props.thoughtDelete}
                />
              </div>
            ))
        : null}
    </div>
  );
}

export default Folder;

Folder.propTypes = {
  folder: PropTypes.object,
  allFolders: PropTypes.array,
  allThoughts: PropTypes.array,
  thoughtPut: PropTypes.func,
  folderPut: PropTypes.func,
  folderPost: PropTypes.func,
  thoughtDelete: PropTypes.func,
  folderDelete: PropTypes.func,
};
