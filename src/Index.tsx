import React from "react";
import { createRoot } from "react-dom/client";
import styles from './index.scss'


const Index = () => {
  return (
    <div>
      <h1 className={styles.title}>Hello!!</h1>
    </div>
  );
};

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Index />)

