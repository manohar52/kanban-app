import React, { useState } from "react";
import { getAllLanes } from "../api/laneApi";
import useFetchData from "../hooks/useFetchData";
import "../styles/KanbanBoard.css";
import CreateLaneDialog from "./CreateLaneDialog";
import Lane from "./Lane";
import { BiLoaderAlt } from "react-icons/bi";
import Notification from "./Notification";

const KanbanBoard = () => {
  const [lanes, laneError, refreshLanes] = useFetchData([], () =>
    getAllLanes()
  );
  const [showCreateLane, setShowCreateLane] = useState(false);
  const [message, setMessage] = useState(null);

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  if (laneError) {
    return <p style={{ color: "red" }}>{laneError}</p>;
  }
  if (!lanes) {
    return <BiLoaderAlt />;
  }
  return (
    <div style={{marginLeft:"1em"}}>
      <div className="title">Kanban Board</div>
      <div style={{margin:"1em"}}>
        <button className="create-btn" onClick={() => setShowCreateLane(true)}>Create New Lane</button>
      </div>
      <div className="board">
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            lane={lane}
            refreshLane={refreshLanes}
            setLaneMessage={handleMessage}
          />
        ))}
      </div>
      <CreateLaneDialog
        show={showCreateLane}
        setMessage={handleMessage}
        onClose={() => setShowCreateLane(false)}
        refresh={() => refreshLanes()}
      />
      {message ? <Notification message={message} /> : null}
    </div>
  );
};

export default KanbanBoard;
