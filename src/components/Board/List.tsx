import Card from "../Card/Card";
import { card, listIDs } from "../types";
import styles from "./List.module.scss";

type Props = {
  cards: card[];
  title: string;
  listID: listIDs;
};

const List = ({ cards, listID, title }: Props) => {
  const sortedCards = cards.sort((a, b) => a.order - b.order);

  return (
    <div className={styles.list}>
      <h4>{title}</h4>
      <div className={styles.content}>
        {sortedCards.map((c) => (
          <Card
            key={`listId-${c.id}`}
            id={c.id}
            listID={listID}
            title={c.title}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
