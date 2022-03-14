import React, { useState } from "react";
import Modal from "./Modal";
import { createNewLane } from "../api/laneApi";

const handleLaneCreation = (laneName, refreshLanes, handleError) => {
  createNewLane({ name: laneName })
    .then((res) => {
      if (res.status >= 400) {
        handleError(res.message);
      } else {
        refreshLanes();
      }
    })
    .catch((err) => {
      handleError(err);
    });
};

const CreateLaneDialog = ({ show, setMessage, onClose, refresh }) => {
  const [laneName, setLaneName] = useState("");

  const body = (
    <form>
      <label>
        Lane Name
        <input
          style={{ margin: "20px" }}
          type="text"
          value={laneName}
          onChange={(e) => setLaneName(e.target.value)}
          name="name"
        />
      </label>
    </form>
  );

  return (
    <>
      <Modal
        title="Create Lane"
        body={body}
        onClose={onClose}
        show={show}
        onSubmit={() => {
          handleLaneCreation(laneName, refresh, setMessage);
          onClose();
        }}
      />
    </>
  );
};

export default CreateLaneDialog;
