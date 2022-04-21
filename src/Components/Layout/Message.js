import { useState, useEffect } from "react";
import "./Message.css";

function Message({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <>{visible && <p className={"message_" + type}>{message}</p>}</>;
}

export default Message;
