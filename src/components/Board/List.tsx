import { card, listIDs } from "../types";

type Props = {
  cards: card[];
  title: string;
  listID: listIDs;
};

const List = ({ cards, listId, title }: Props) => {
  return <div>{title}</div>;
};

export default List;
