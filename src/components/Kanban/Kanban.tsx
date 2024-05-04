import { useState } from "react";
import List from "../Board/List";
import { card, list, listIDs } from "../types";
import styles from "./Kanban.module.scss";

const lists: list[] = [
  {
    title: "List 1",
    listID: "list1",
  },
  {
    title: "List 2",
    listID: "list2",
  },
];

type data = {
  [key in listIDs]: card[];
};
const initialData: data = {
  list1: [
    {
      id: "abc1",
      title: "Card 1",
      listId: "list1",
      order: 1,
    },
    {
      id: "abc2",
      title: "Card 3",
      listId: "list1",
      order: 2,
    },
    {
      id: "abc3",
      title: "Card 5",
      listId: "list1",
      order: 3,
    },
  ],
  list2: [
    {
      id: "abc4",
      title: "Card 2",
      listId: "list2",
      order: 1,
    },
  ],
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  return (
    <div className={styles.wrapper}>
      {lists.map((l) => (
        <List cards={data[l.listID]} title={l.title} listID={l.listID} />
      ))}
    </div>
  );
};

export default Kanban;
