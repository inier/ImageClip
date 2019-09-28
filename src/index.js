import React from "react";
import ReactDOM from "react-dom";
import Avatar from "./components/Avatar";

import "./styles.css";

const userInfo = {
  nickName: "你的昵称",
  avatar:
    "http://img3.imgtn.bdimg.com/it/u=1999118259,336484788&fm=26&gp=0.jpg",
  desc: "这家伙什么都没留下",
  tags: ["够傻", "够呆", "够坏"]
};

function App() {
  return (
    <div className="App">
      <header />
      <main>
        <Avatar data={userInfo} />
      </main>
      <footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
