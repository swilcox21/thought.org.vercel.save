/* eslint-disable no-unused-vars */
import "../App.css";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import PropTypes from "prop-types";

function NewThought(props) {
  const [thought, setThought] = useState({ thought: "" });
  const [allFolders, setAllFolders] = useState(props.allFolders);
  const [folderValue, setFolderValue] = useState("1. thought");
  const [folderPlaceholder, setFolderPlaceholder] = useState("");

  return (
    <>
      <div>
        <input
          className="borderBottomRight col-3 col-md-3"
          placeholder={folderValue}
          defaultValue={folderPlaceholder}
          value={folderPlaceholder}
          onChange={(e) => {
            setFolderValue(e.target.value);
            setFolderPlaceholder(e.target.value);
          }}
          onBlur={() => setFolderPlaceholder("")}
          list="folders"
          name="folder"
          id="folder"
        />
        <datalist id="folders">
          {allFolders.lenght > 0 &&
            allFolders.map((folder) => (
              <div key={folder.id}>
                <option value={folder.name} />
              </div>
            ))}
        </datalist>
        <TextareaAutosize
          id="textareaautosize"
          className="col-12 activeTodo py-1 pl-2"
          placeholder="Type your Thought here"
          type="text"
          defaultValue={""}
          value={thought.thought}
          onChange={(e) => {
            setThought({ thought: e.target.value });
          }}
        />
        <button
          onClick={() => {
            props.newThoughtPost(folderValue, thought);
            setThought({ thought: "" });
          }}
        >
          SUGMIT
        </button>
      </div>
    </>
  );
}

export default NewThought;

NewThought.propTypes = {
  allFolders: PropTypes.array,
  allThoughts: PropTypes.array,
  newThoughtPost: PropTypes.func,
};
