import React, { useState } from "react";
import Modal from "./Modal";
import { createNewCard } from "../api/cardApi";
import { isEmptyOrSpaces } from "../utils/util";

const handleCardCreation = (
  currentLane,
  cardName,
  cardType,
  refreshLane,
  handleError
) => {
  if (isEmptyOrSpaces(cardName)) {
    handleError("Name cannot be empty!");
  } else {
    createNewCard({
      name: cardName,
      type: cardType,
      laneid: currentLane.id,
    })
      .then((res) => {
        if (res.status >= 400) {
          handleError(res.message);
        } else {
          refreshLane();
        }
      })
      .catch((err) => {
        handleError(err);
      });
  }
};

const CreateCardDialog = ({
  currentLane,
  show,
  setMessage,
  onClose,
  refresh,
}) => {
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("BUG");

  const body = (
    <form>
      <label>
        Lane: <span style={{ margin: "10px" }}>{currentLane.name}</span>
      </label>
      <br />
      <label>Card type: </label>
      <select
        style={{ margin: "10px" }}
        value={cardType}
        onChange={(e) => setCardType(e.target.value)}
      >
        <option value="BUG">BUG</option>
        <option value="FEATURE">FEATURE</option>
        <option value="REQUEST">REQUEST</option>
      </select>
      <br />
      <label>
        Card Name:
        <input
          style={{ margin: "10px" }}
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          name="card-name"
        />
      </label>
    </form>
  );

  return (
    <>
      <Modal
        title="Create Card"
        body={body}
        onClose={onClose}
        show={show}
        onSubmit={() => {
          handleCardCreation(
            currentLane,
            cardName,
            cardType,
            refresh,
            setMessage
          );
          onClose();
        }}
      />
    </>
  );
};

export default CreateCardDialog;
