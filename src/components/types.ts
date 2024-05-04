export type listIDs = "list1" | "list2";
export type list = {
  title: string;
  listID: listIDs;
};

export type card = {
  id: string;
  title: string;
  listId: listIDs;
  order: number;
};
