import { FormEvent, useState } from "react";
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
      listID: "list1",
      order: 1,
    },
    {
      id: "abc2",
      title: "Card 3",
      listID: "list1",
      order: 2,
    },
    {
      id: "abc3",
      title: "Card 5",
      listID: "list1",
      order: 3,
    },
  ],
  list2: [
    {
      id: "abc4",
      title: "Card 2",
      listID: "list2",
      order: 1,
    },
  ],
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const cardTitle = formData.get("cardTitle")?.toString().trim();
    const currentListId = e.currentTarget.id as listIDs;
    if (!cardTitle) return;

    const newListOrderValueMax = data[currentListId]
      .map((item) => item.order)
      .reduce((maxValue, a) => Math.max(maxValue, a), 0);
    const cardInfo: card = {
      id: Date() + cardTitle,
      listID: currentListId,
      title: cardTitle,
      order: newListOrderValueMax + 1,
    };

    const addedList = [
      ...data[currentListId],
      {
        ...cardInfo,
        order: newListOrderValueMax + 1,
      },
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    setData((d) => {
      return { ...d, [currentListId]: addedList };
    });

    e.currentTarget.reset();
  };

  const handleDeleteCard = (cardId: string, currentlistID: listIDs) => {
    const remainList = data[currentlistID]
      .filter((item) => item.id !== cardId)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    setData((d) => {
      return { ...d, [currentlistID]: remainList };
    });
  };

  const cardChangeHandler = (
    cardInfo: card,
    newListId: listIDs,
    targetCardId: string
  ) => {
    const { id, listID: oldListId } = cardInfo;
    const dropCard = data[oldListId].find((el) => el.id === id);
    if (!dropCard) return;

    const targetCard =
      targetCardId !== ""
        ? data[newListId].find((el) => el.id === targetCardId)
        : null;

    const newListOrderValueMax = data[newListId]
      .map((item) => item.order)
      .reduce((maxValue, a) => Math.max(maxValue, a), 0);

    if (oldListId === newListId) {
      const newList = data[oldListId]
        .map((item) => {
          if (item.id === dropCard.id)
            return {
              ...dropCard,
              order: targetCard
                ? targetCard.order - 1
                : newListOrderValueMax + 1,
            };
          return item;
        })
        .sort((a, b) => a.order - b.order)
        .map((item, i) => {
          return { ...item, order: i + 1 };
        });
      setData((d) => {
        return { ...d, [oldListId]: newList };
      });

      return;
    }

    const remainList = data[oldListId]
      .filter((item) => item.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    const addedList = [
      ...data[newListId],
      {
        ...dropCard,
        order: targetCard ? targetCard.order - 1 : newListOrderValueMax + 1,
      },
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });
    setData((d) => {
      return { ...d, [oldListId]: remainList, [newListId]: addedList };
    });
  };

  return (
    <div className={styles.wrapper}>
      {lists.map((l) => (
        <div key={l.listID}>
          <List
            cards={data[l.listID]}
            title={l.title}
            listID={l.listID}
            cardChangeHandler={cardChangeHandler}
            handleDeleteCard={handleDeleteCard}
          />

          <form className={styles.add} onSubmit={handleAddCard} id={l.listID}>
            <input
              type="text"
              id="cardTitle"
              name="cardTitle"
              placeholder="card title"
            />
            <button type="submit">Add card</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Kanban;
