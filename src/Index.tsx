import React from "react";
import { createRoot } from "react-dom/client";
import './index.scss'
import Timer  from "./Timer/Timer";


const Index = () => {
  return (
    <div>
      <Timer/>
    </div>
  );
};

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Index />)

