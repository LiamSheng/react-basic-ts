// 万恶之源，项目开始运行的地方。

// react 必要的两个核心依赖包。
import React from "react";
import ReactDOM from "react-dom/client";

// 导入项目的根组件
import App from "./App";

// 把 App 根组件渲染到 id 为 root 的 DOM 节点上，这个节点在 ./public/index.html 里。
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);