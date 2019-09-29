import React, { useState, useRef } from "react";
import "./Resizeable.css";

export default ({ className, style }) => {
  // 创建ref
  const myRef = useRef(null);

  function resize(option) {
    option = option || {};
    var minWidth = parseInt(option.minWidth) || 5, //最小宽度，未设置则默认5
      minHeight = parseInt(option.minHeight) || 5, //最小高度，未设置则默认5
      el = document.querySelector(option.el),
      hasWidth,
      hasHeight;
    el.draggable = false;
    el.parentNode.draggable = false;
    switch (option.type) {
      case "bottom":
        hasHeight = true;
        break;
      case "right":
        hasWidth = true;
        break;
      case "bottom-right":
        hasWidth = true;
        hasHeight = true;
        break;
      default:
        return;
    }
    el.onmousedown = function(e) {
      //鼠标按下，计算当前元素距离可视区的距离
      if (hasWidth) {
        var disX = e.clientX;
        var w = parseInt(window.getComputedStyle(el.parentNode).width);
      }
      if (hasHeight) {
        var disY = e.clientY;
        var h = parseInt(window.getComputedStyle(el.parentNode).height);
      }
      document.onmousemove = function(e) {
        var ew, eh;
        //通过事件委托，计算移动的距离
        if (hasWidth) {
          var tx = disX - e.clientX;
          ew = w - tx;
          el.parentNode.style.width = (ew < minWidth ? minWidth : ew) + "px";
        }
        if (hasHeight) {
          var ty = disY - e.clientY;
          eh = h - ty;
          el.parentNode.style.height = (eh < minHeight ? minHeight : eh) + "px";
        }
        //回调函数
        option.callBack && option.callBack(ew ? ew : eh, ew ? eh : null);
      };
      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
  function callBack(w, h) {
    console.log(w, h);
  }
  ["bottom", "right", "bottom-right"].forEach(function(item, index) {
    resize({
      el: myRef,
      type: item,
      callBack: callBack //回调函数
    });
  });

  return (
    // 在你的元素或者组件上面挂载ref
    <div className={`myResize ${className}`} style={style} ref={myRef}>
      <div className="bottom"></div>
      <div className="right"></div>
      <div className="bottom-right"></div>
      <div className="content"></div>
    </div>
  );
};
