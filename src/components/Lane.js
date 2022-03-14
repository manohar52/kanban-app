import React, { useState } from "react";
import "../styles/Lane.css";
import {
  MdModeEditOutline,
  MdOutlineDeleteOutline,
  MdCreateNewFolder,
} from "react-icons/md";
import EditLaneDialog from "./EditLaneDialog";
import Card from "./Card";
import useFetchData from "../hooks/useFetchData";
import { getAllCardsForLane } from "../api/cardApi";
import CreateCardDialog from "./CreateCardDialog";
import { BiLoaderAlt } from "react-icons/bi";
import { removeLane } from "../api/laneApi";

const handleLaneDeletion = (totalCards, lane, setLaneMessage, refreshLane) => {
  if (totalCards > 0) {
    setLaneMessage("Cards present! Lane cannot be removed");
  } else {
    removeLane(lane.id)
      .then((res) => {
        if (res.status >= 400) {
          setLaneMessage(res.message);
        } else {
          refreshLane();
        }
      })
      .catch((err) => {
        setLaneMessage(err);
      });
  }
};

const Lane = ({ lane, refreshLane, setLaneMessage }) => {
  const [cards, cardError, refreshCards] = useFetchData([], () =>
    getAllCardsForLane(lane.id)
  );
  const [showEditLane, setShowEditLane] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);

  if (cardError) {
    return <p style={{ color: "red" }}>{cardError}</p>;
  }
  if (!cards) {
    return <BiLoaderAlt />;
  }

  return (
    <div className="lane">
      <div className="lane-header">
        <div className="lane-name">
          {lane.name} - ({cards.length})
        </div>
        <div title="create card" className="create-card">
          <MdCreateNewFolder
            className="icons"
            onClick={() => setShowCreateCard(true)}
          />
        </div>
        <div
          title="edit lane"
          className="edit-lane"
          onClick={() => setShowEditLane(true)}
        >
          <MdModeEditOutline className="icons" />
        </div>
        <div title="remove lane" className="delete-lane">
          <MdOutlineDeleteOutline
            className="icons"
            onClick={() =>
              handleLaneDeletion(
                cards.length,
                lane,
                setLaneMessage,
                refreshLane
              )
            }
          />
        </div>
      </div>
      <div className="lane-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleMessage={setLaneMessage}
            refreshLane={refreshCards}
          />
        ))}
      </div>
      <EditLaneDialog
        show={showEditLane}
        currentLane={lane}
        setMessage={setLaneMessage}
        onClose={() => setShowEditLane(false)}
        refresh={() => refreshLane()}
      />
      <CreateCardDialog
        show={showCreateCard}
        currentLane={lane}
        setMessage={setLaneMessage}
        onClose={() => setShowCreateCard(false)}
        refresh={() => refreshCards()}
      />
    </div>
  );
};

export default Lane;
