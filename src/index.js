import React from "react";
import ReactDOM from "react-dom";
import Avatar from "./components/Avatar";

import "./styles.css";
import avatarUrl from "./assets/avatar.jpg";

const userInfo = {
  nickName: "你的昵称",
  avatar: avatarUrl || "https://www.w3school.com.cn/i/eg_planets.jpg",
  desc: "这家伙什么都没留下",
  tags: ["够傻", "够呆", "够坏"]
};

function App() {
  return (
    <div className="App">
      <header>首页</header>
      <main>
        <Avatar data={userInfo} />
      </main>
      <footer>底部</footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
