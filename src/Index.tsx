import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import styles from './index.scss'


const Index = () => {
  return (
    <div>
      <h1 className={styles.title}>Hello!!</h1>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
