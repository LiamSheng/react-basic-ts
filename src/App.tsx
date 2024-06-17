import React, { useState } from "react";
import "./index.css";

const count: number = 100;

const sayHi = () => {
  return "Hi~";
};

const items = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const loggedIn: boolean = false;

const style = {
  color: "pink",
  fontSize: "larger",
};

function ButtonComponent() {
  // 1. 调用 useState 添加一个状态变量：
  const [count, setCount] = useState(0);
  // 2. 点击事件回调：
  const handleClick = () => {
    // 作用1：用传入的新的值 count + 1 修改原有的 count 值。
    // 作用2：重新使用新的 count 的值渲染按钮 UI。
    setCount(count + 1);
  };
  return <button onClick={handleClick}>{count}</button>;
}

const handleClick = (name: any, event: any) => {
  console.log("clicked! event->", name, event);
};

function App() {
  const [form, setForm] = useState({ name: "linzi" });
  const changeForm = () => {
    setForm({ ...form, name: "Linzi2" });
  };
  return (
    <div className="App">
      This is a streamlined React starter project.
      {/*使用引号传递字符串*/}
      <div style={{ color: "red" }}>{"this is a message"}</div>
      {/*使用 JavaScript 变量*/}
      {count}
      {/*函数调用*/}
      <div>{sayHi()}</div>
      {/*方法调用*/}
      <div>{new Date().getDate()}</div>
      {/*使用 JavaScript 对象*/}
      <div className="foo">This is a div</div>
      <div style={style}>This is a div</div>
      {/* 渲染列表 */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}---{item.name}
          </li>
        ))}
      </ul>
      <div>
        {/* 逻辑与 &&*/}
        {loggedIn && <span>logged in!</span>}
        {/* 三元运算符 */}
        {loggedIn ? <span>logged in!</span> : <span>IDLE</span>}
      </div>
      <div>
        <button onClick={(e) => handleClick("Linzi", e)}>click here!</button>
      </div>
      <ButtonComponent />
      <ButtonComponent></ButtonComponent>
      {/* 修改对象的状态 */}
      <div>
        <button onClick={changeForm}>change form: {form.name}</button>
      </div>
    </div>
  );
}

export default App;
