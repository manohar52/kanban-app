import React from "react";
import "../styles/Card.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeCard } from "../api/cardApi";

const getCardTypeStyle = (cardType) => {
  switch (cardType) {
    case "BUG":
      return "card-type type-bug";
    case "FEATURE":
      return "card-type type-feature";
    case "REQUEST":
      return "card-type type-request";
  }
};
const cardDeleteHandler = (card, handleMessage, refreshLane) => {
  removeCard(card.id)
    .then((res) => {
      if (res.status >= 400) {
        handleMessage(res.message);
      } else {
        refreshLane();
      }
    })
    .catch((err) => {
      handleMessage(err);
    });
};

const Card = ({ card, handleMessage, refreshLane }) => {
  const cardTypeClass = getCardTypeStyle(card.type);
  return (
    <div
      className="card">
      <div className="card-header">
        <div className={cardTypeClass}>{card.type}</div>
        <div className="card-delete">
          <MdOutlineDeleteOutline
            onClick={() => cardDeleteHandler(card, handleMessage, refreshLane)}
          />
        </div>
      </div>
      <div className="card-text">{card.name}</div>
    </div>
  );
};

export default Card;
