import React, { Fragment, useState } from "react";
import "./Avatar.css";
import ImageClip from "../ImageClip";

export default ({ data }) => {
  const { nickName, avatar, desc, tags } = data;
  const [avatarUrl, setAvatarUrl] = useState(avatar);

  return (
    <Fragment>
      <div className="avatarBox">
        <div className="avatar">
          <img src={avatarUrl} alt="avatar" />
        </div>
        <div className="info">
          <h4>{nickName}</h4>
          <h5>{desc}</h5>
          <div className="tagBox">
            {tags.map(tag => {
              return <span className="tag">{tag}</span>;
            })}
          </div>
        </div>
      </div>
      <ImageClip />
    </Fragment>
  );
};
