import React, { Component } from "react";
import "./ImageClip.css";
import Resizeable from "../Resizeable";

class ImageClip extends Component {
  constructor(props) {
    super(props);

    const winW = document.documentElement.clientWidth;
    const viewW = winW - 40,
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
      isMaskShow: this.props.img
    };
  }
  componentDidMount() {
    const { img } = this.props;
    this.renderImage(img);
  }
  handleChooseImage = e => {
    this._file.click();
  };
  handleZoomUp = () => {
    const { scaleStep } = this.props;
    if (!this.img) {
      return;
    }

    this.imageW += scaleStep;
    this.imageH += scaleStep;

    // 重新绘制图片
    this.drawImage();
  };
  handleZoomDown = () => {
    const { scaleStep } = this.props;
    if (!this.img) {
      return;
    }

    this.imageW -= scaleStep;
    this.imageH -= scaleStep;

    // 重新绘制图片
    this.drawImage();
  };
  handleSaveImage = () => {
    if (!this.img) {
      return;
    }

    const { maskW, maskH, maskOffsetL, maskOffsetT } = this.state;
    const { change } = this.props;
    let imgData = this._ctx.getImageData(
      maskOffsetL,
      maskOffsetT,
      maskW,
      maskH
    );

    let tCanvas = document.createElement("canvas"),
      tCtx = tCanvas.getContext("2d");

    tCanvas.width = maskW;
    tCanvas.height = maskH;
    tCtx.putImageData(imgData, 0, 0, 0, 0, maskW, maskH);

    // 更新裁剪后的图片给外部
    change(tCanvas.toDataURL("image/png"));
  };
  touchStart = e => {
    const point = e.changedTouches[0];
    // 获取point pos
    this.startX = point.clientX;
    this.startY = point.clientY;
  };
  touchMove = e => {
    const point = e.changedTouches[0];
    const changeX = point.clientX - this.startX;
    const changeY = point.clientY - this.startY;
    const { scaleStep } = this.props;

    if (Math.abs(changeX) > scaleStep || Math.abs(changeY) > scaleStep) {
      this.imageL += changeX;
      this.imageT += changeY;

      // 重新绘制图片
      this.drawImage();

      // 更新point pos
      this.startX = point.clientX;
      this.startY = point.clientY;
    }
  };
  // 获取上传的图片
  fileChange = e => {
    this.setState({
      isMaskShow: true
    });

    // 获取到的文件对象
    const tImgFile = this._file.files[0];
    if (!tImgFile) {
      return;
    }

    // 单独处理js事件处理函数的this
    const that = this;
    // 从获取的文件对象中读取图像数据
    let fileData = new FileReader();
    fileData.readAsDataURL(tImgFile);
    fileData.onload = e => {
      that.renderImage(e.target.result);
    };
  };
  renderImage = src => {
    // 单独处理js事件处理函数的this
    const that = this;
    // 创建一张图片
    this.img = new Image();
    this.img.onload = e => {
      console.log(e.path[0].src);
      const { viewW, viewH } = that.state;
      let tScale = 1; // 缩放比例

      that.imageW = that.img.width;
      that.imageH = that.img.height;
      console.log("图片的宽度为" + that.imageW + ",长度为" + that.imageH);

      // 根据缩放比例设置图片绘制尺寸
      if (that.imageW > that.imageH) {
        tScale = that.imageW / viewW;
        that.imageW = viewW;
        that.imageH = that.imageH / tScale;
      } else {
        tScale = that.imageH / viewH;
        that.imageH = viewH;
        that.imageW = that.imageW / tScale;
      }

      // 根据缩放比例设置图片绘制起始位置
      that.imageL = (viewW - that.imageW) / 2;
      that.imageT = (viewH - that.imageH) / 2;

      // 把图片绘制到canvas中
      that.drawImage();
    };
    this.img.src = src;
  };
  drawImage = () => {
    const { viewW, viewH } = this.state;

    this._ctx = this._canvas.getContext("2d");
    this._ctx.clearRect(0, 0, viewW, viewH);
    this._ctx.drawImage(
      this.img,
      this.imageL,
      this.imageT,
      this.imageW,
      this.imageH
    );
  };
  render() {
    const { viewW, viewH, maskW, maskH, isMaskShow } = this.state;

    return (
      <div>
        <div
          className="imageView"
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
        >
          <canvas
            ref={x => (this._canvas = x)}
            className="imageCanvas"
            width={viewW}
            height={viewH}
          >
            浏览器未支持Canvas
          </canvas>
          {isMaskShow && (
            <div
              className="mask"
              style={{ width: `${maskW}px`, height: `${maskH}px` }}
            />
            // <Resizeable className={"mask"} style={{ width: `${maskW}px`, height: `${maskH}px` }} />
          )}
        </div>
        <div className="optArea">
          <input
            ref={x => (this._file = x)}
            type="file"
            accept="image/*"
            className="file"
            onChange={this.fileChange}
          />
          <button onClick={this.handleChooseImage}>选择图片</button>
          <button onClick={this.handleZoomUp}>放大</button>
          <button onClick={this.handleZoomDown}>缩小</button>
          <button onClick={this.handleSaveImage}>保存图片</button>
        </div>
      </div>
    );
  }
}

ImageClip.defaultProps = {
  scaleStep: 10 // 默认缩放步进
};

export default ImageClip;
