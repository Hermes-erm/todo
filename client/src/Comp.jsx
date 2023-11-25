import React, { useState } from "react";
import "./Comp.css";
import del from "../src/assets/del.svg";

function Comp({ item, delt, todos }) {
  const { ttext, id, pending } = item;
  const [pend, usePend] = useState(pending);

  return (
    <div className="comp_cont">
      <div
        className="comp_check"
        style={{ backgroundColor: !pend && "#ac7cec" }}
      ></div>
      <div
        className="comp_text"
        style={{ textDecoration: !pend && "line-through" }}
        onClick={(e) => {
          usePend(false);
          delt(`update`, id);
        }}
      >
        <p>{ttext}</p>
      </div>
      <img
        className="but_del"
        src={del}
        onClick={() => {
          delt(`delete`, id);
        }}
      ></img>
    </div>
  );
}

export default Comp;
