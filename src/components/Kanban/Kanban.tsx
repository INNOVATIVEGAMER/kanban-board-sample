import { useState } from "react";
import List from "../Board/List";
import { card, list, listIDs } from "../types";

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
      id: "qwe1",
      title: "Card 1",
      listId: "list1",
      order: 1,
    },
    {
      id: "qwe3",
      title: "Card 3",
      listId: "list1",
      order: 2,
    },
    {
      id: "qwe5",
      title: "Card 5",
      listId: "list1",
      order: 3,
    },
  ],
  list2: [
    {
      id: "qwe2",
      title: "Card 2",
      listId: "list2",
      order: 1,
    },
  ],
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  return (
    <div>
      {lists.map((l) => (
        <List cards={data[l.listID]} title={l.title} listID={l.listID} />
      ))}
    </div>
  );
};

export default Kanban;
