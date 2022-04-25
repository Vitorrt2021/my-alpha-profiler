import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>{visible && <p className={styles["message_" + type]}>{message}</p>}</>
  );
}

export default Message;
