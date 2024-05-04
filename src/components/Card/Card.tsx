import { DragEvent, useState } from "react";
import { listIDs } from "../types";
import styles from "./Card.module.scss";

type Props = {
  id: string;
  title: string;
  listID: listIDs;
  handleDeleteCard: (cardId: string, currentlistID: listIDs) => void;
};

const Card = ({ id, listID, title, handleDeleteCard }: Props) => {
  const [onHold, setOnHold] = useState(false);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({ id, listID }));
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };

  const dragEndHandler = () => {
    setOnHold(false);
  };

  return (
    <div
      id={id}
      className={`${styles.card} ${onHold ? styles.hidden : ""}`}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      <h5>{title}</h5>
      <button
        className={styles.delete}
        onClick={() => handleDeleteCard(id, listID)}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
