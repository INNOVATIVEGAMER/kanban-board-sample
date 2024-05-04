import { DragEvent } from "react";
import Card from "../Card/Card";
import { card, listIDs } from "../types";
import styles from "./List.module.scss";

type Props = {
  cards: card[];
  title: string;
  listID: listIDs;
  cardChangeHandler: (
    cardInfo: card,
    newListId: listIDs,
    targetCardId: string
  ) => void;
  handleDeleteCard: (cardId: string, currentlistID: listIDs) => void;
};

const List = ({
  cards,
  listID,
  title,
  cardChangeHandler,
  handleDeleteCard,
}: Props) => {
  const sortedCards = cards.sort((a, b) => a.order - b.order);

  const onDragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    const cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    const targetCardId = e.currentTarget.id;
    cardChangeHandler(cardInfo, listID, targetCardId);
  };

  return (
    <div className={styles.list}>
      <h4>{title}</h4>
      <div
        className={styles.content}
        onDrop={onDropHandler}
        onDragEnter={onDragEnterHandler}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
      >
        {sortedCards.map((c) => (
          <Card
            key={`listId-${c.id}`}
            id={c.id}
            listID={listID}
            title={c.title}
            handleDeleteCard={handleDeleteCard}
          />
        ))}
        <div className={styles.dropText}>Drop here</div>
      </div>
    </div>
  );
};

export default List;
