import { useState } from "react";
import { listIDs } from "../types";
import styles from "./Card.module.scss";

type Props = {
  id: string;
  title: string;
  listID: listIDs;
};

const Card = ({ id, listID, title }: Props) => {
  const [onHold, setOnHold] = useState(false);

  return (
    <div id={id} className={`${styles.card} ${onHold ? styles.hidden : ""}`}>
      <h5>{title}</h5>
    </div>
  );
};

export default Card;
