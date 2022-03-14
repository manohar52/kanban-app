import React, { useState } from "react";
import Modal from "./Modal";
import { updateLane } from "../api/laneApi";
import { isEmptyOrSpaces } from "../utils/util";

const handleLaneUpdate = (currentLane, laneName, refreshLanes, handleError) => {
  if (isEmptyOrSpaces(laneName)) {
    handleError("Name cannot be empty!");
  } else {
    updateLane(currentLane.id, { name: laneName })
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
  }
};

const EditLaneDialog = ({
  currentLane,
  show,
  setMessage,
  onClose,
  refresh,
}) => {
  const [laneName, setLaneName] = useState(currentLane.name);

  const body = (
    <form>
      <label>
        Lane Name
        <input
        style={{margin:"20px"}}
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
        title="Edit Lane"
        body={body}
        onClose={onClose}
        show={show}
        onSubmit={() => {
          handleLaneUpdate(currentLane, laneName, refresh, setMessage);
          onClose();
        }}
      />
    </>
  );
};

export default EditLaneDialog;
