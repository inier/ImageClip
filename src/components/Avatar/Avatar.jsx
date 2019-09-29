import React, { Fragment, useState } from "react";
import "./Avatar.css";
import ImageClip from "../ImageClip";

export default ({ data }) => {
  const { nickName, avatar, desc, tags } = data;
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [showImageClip, setVisiable] = useState(false);

  function handleChange(imgData) {
    setAvatarUrl(imgData);
    setVisiable(false);
  }

  return (
    <Fragment>
      <div className="avatarBox">
        <div
          className="avatar"
          onClick={() => {
            setVisiable(true);
          }}
        >
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className="info">
          <div className="h4">{nickName}</div>
          <div className="h5">{desc}</div>
          <div className="tagBox">
            {tags.map(tag => {
              return (
                <span key={tag} className="tag">
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {showImageClip && (
        <div className="layer">
          <header className="flex-lc">
            <div
              onClick={() => {
                setVisiable(false);
              }}
            >
              ← 返回
            </div>
          </header>
          <ImageClip img={avatarUrl} change={handleChange} />
        </div>
      )}
    </Fragment>
  );
};
