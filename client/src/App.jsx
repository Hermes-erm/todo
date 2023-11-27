import { useState, useEffect } from "react";
import Comp from "./Comp";
import "./App.css";

const read = (endpoint, callback) => {
  fetch(`http://localhost:3000/${endpoint}`)
    .then((response) => response.json())
    .then(callback)
    .catch((err) => alert("Falied to get data!"));
};

const post = (endpoint, data, callback) => {
  fetch(`http://localhost:3000/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    })
    .catch((err) => alert(err));
};

function App() {
  const [tags, useTags] = useState([]);
  const [todos, useTodos] = useState([]);
  const [text, useText] = useState("");

  const delt = (endpoint, id) => {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("There's not ok with delete!");
        else if (response.status == 200)
          useTodos((prev) => prev.filter((obj) => obj.id != id));
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    read("read", (data) => {
      useTodos([...data]);
    });
  }, []);

  const onPress = (e) => {
    if (text == "") return;
    post("write", { val: text }, (data) => {
      useTodos((prev) => [...prev, data]);
      useText("");
    });
  };

  return (
    <>
      <div className="cont">
        <div className="text_div">
          <input
            type="text"
            id="text_box"
            value={text}
            placeholder="add list..."
            onChange={(e) => {
              useText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onPress(e);
            }}
          />
          <button
            className="but"
            onClick={(e) => {
              onPress(e);
            }}
          >
            Add
          </button>
        </div>
        <div className="disp">
          {todos.map((item) => {
            return <Comp item={item} delt={delt} todos={todos} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
