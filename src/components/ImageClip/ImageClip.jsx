import React, { Component } from "react";
import "./ImageClip.css";

class ImageClip extends Component {
  constructor(props) {
    super(props);

    const winW = document.documentElement.clientWidth;
    const viewW = winW - 20,
      viewH = viewW;
    const maskW = viewW * 0.7,
      maskH = maskW;
    const maskOffsetL = (viewW - maskW) / 2,
      maskOffsetT = (viewH - maskH) / 2;

    this.state = {
      viewW,
      viewH,
      maskW,
      maskH,
      maskOffsetL,
      maskOffsetT,
      isMaskShow: false
    };
  }
  handleChooseImage = e => {
    this.file.click();
  };
  handleFileChange = (e) => {
    const tImgFile = this.file.files[0];
    
  };
  handleZoom = () => {};
  handleSaveImage = () => {};
  handleSaveImage = () => {
    if (!this.img) {
      return;
    }
    const { maskW, maskH, maskOffsetL, maskOffsetT } = this.state;
    let imgData = this._ctx.getImageData(
      maskOffsetL,
      maskOffsetT,
      maskW,
      maskH
    );
  };
  render() {
    const {
      viewW,
      viewH,
      maskW,
      maskH,
      isMaskShow,
      maskOffsetL,
      maskOffsetT
    } = this.state;
    return (
      <div>
        <div className="imageView">
          <canvas
            ref={x => (this._canvas = x)}
            className="imageCanvas"
            width={viewW}
            height={viewH}
          >
            浏览器未支持Canvas
          </canvas>
          <div className="mask" />
          <input
            ref={x => (this._file = x)}
            type="file"
            className="file"
            onChange={this.handleFileChange}
          />
        </div>
        <div className="optArea">
          <button onClick={this.handleChooseImage}>选择图片</button>
          <button onClick={this.handleChooseImage}>放大</button>
          <button onClick={this.handleChooseImage}>缩小</button>
          <button onClick={this.handleSaveImage}>保存图片</button>
        </div>
      </div>
    );
  }
}

export default ImageClip;
