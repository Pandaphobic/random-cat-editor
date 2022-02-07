import React from "react";
// import img_src from "/nft.png";
// import img2_src from "/watermark.png";
// TODO
// - Make this thing assemble an NFT
// - Fetch / Load image from external resource
// - Look into service workers and Nextjs

const img_src = () => {
  return "/nft.png";
};

const img2_src = () => {
  return "/watermark.png";
};

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.imgCanvasRef = React.createRef();
    this.imgCanvasRef2 = React.createRef();
    this.state = {
      count: 0,
      loadedWasm: false,
      isLoaded: false,
      wasm: null,
      img: null,
      img2: null,
    };
  }
  componentDidMount() {
    this.loadWasm();
  }

  drawOriginalImage = async () => {
    const img = new Image();

    img.onload = () => {
      this.img = img;
      const canvas = this.imgCanvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
    };
    img.src = img_src();
  };

  drawOriginalImage2 = async () => {
    const img2 = new Image();

    img2.onload = () => {
      this.img = img2;
      const canvas2 = this.imgCanvasRef2.current;
      canvas2.width = img2.width;
      canvas2.height = img2.height;
      const ctx = canvas2.getContext("2d");

      ctx.drawImage(img2, 0, 0);
    };
    img2.src = img2_src();
  };

  loadWasm = async () => {
    try {
      const photon = await import("@silvia-odwyer/photon").then(
        (this.wasm = photon)
      );

      this.drawOriginalImage();
      this.drawOriginalImage2();
    } finally {
      console.log("loaded wasm successfully");
      this.loadedWasm = true;
      console.log("this.loadedWasm is", this.loadedWasm);
    }
  };

  alterChannel = async (channel_index) => {
    const canvas1 = this.imgCanvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(this.img, 0, 0);

    let photon = this.wasm;

    // Convert the canvas and context to a PhotonImage
    let image = photon.open_image(canvas1, ctx);

    // Filter the image
    photon.alter_channel(image, channel_index, 50);

    // Replace the current canvas' ImageData with the new image's ImageData.
    photon.putImageData(canvas1, ctx, image);
  };

  solarize = async () => {
    const canvas1 = this.imgCanvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(this.img, 0, 0);

    let photon = this.wasm;

    // Convert the canvas and context to a PhotonImage
    let image = photon.open_image(canvas1, ctx);

    // Filter the image
    photon.solarize(image);

    // Replace the current canvas' ImageData with the new image's ImageData.
    photon.putImageData(canvas1, ctx, image);
  };

  watermark = async () => {
    const canvas1 = this.imgCanvasRef.current;
    const canvas2 = this.imgCanvasRef2.current;

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    ctx1.drawImage(this.img, 0, 0);
    // ctx2.drawImage(this.img2, 0, 0);

    let photon = this.wasm;

    // Convert the canvas and context to a PhotonImage
    let image = photon.open_image(canvas1, ctx1);
    let image2 = photon.open_image(canvas2, ctx2);
    let image3 = photon.open_image(canvas2, ctx2);
    let image4 = photon.open_image(canvas2, ctx2);
    let image5 = photon.open_image(canvas2, ctx2);

    // Filter the image
    photon.watermark(image, image2, 25, 0);
    photon.watermark(image, image3, 260, 0);
    photon.watermark(image, image4, 0, 100);
    photon.watermark(image, image5, 0, 150);

    // Replace the current canvas' ImageData with the new image's ImageData.
    photon.putImageData(canvas1, ctx1, image);
  };

  effectPipeline = async () => {
    const canvas1 = this.imgCanvasRef.current;
    const ctx = canvas1.getContext("2d");

    ctx.drawImage(this.img, 0, 0);

    let photon = this.wasm;
    let phtimg = photon.open_image(canvas1, ctx);

    console.time("PHOTON_WITH_RAWPIX");
    photon.alter_channel(phtimg, 2, 70);
    photon.grayscale(phtimg);
    console.timeEnd("PHOTON_WITH_RAWPIX");

    // // Replace the current canvas' ImageData with the new image's ImageData.
    photon.putImageData(canvas1, ctx, phtimg);

    console.time("PHOTON_CONSTR");
    // photon.canvas_wasm_only(canvas1, ctx);
    console.timeEnd("PHOTON_CONSTR");
  };

  render() {
    return (
      <div className="default">
        <div className="sidebar">
          <h3 className="logo">Photon</h3>

          <ul>
            <h4>Channels</h4>
            <li id="alter_red" onClick={() => this.alterChannel(0)}>
              Increase Red Channel
            </li>
            <li id="alter_green" onClick={() => this.alterChannel(1)}>
              Increase Green Channel
            </li>
            <li id="alter_blue" onClick={() => this.alterChannel(2)}>
              Increase Blue Channel
            </li>

            <li id="alter_blue" onClick={this.effectPipeline}>
              Inc Channel + Threshold
            </li>
          </ul>
          <ul>
            <h4>Effects</h4>
            <li id="solarize" onClick={() => this.solarize()}>
              Solarize
            </li>
          </ul>
          <ul>
            <h4>Watermark</h4>
            <li id="watermak" onClick={() => this.watermark()}>
              Watermark
            </li>
          </ul>
        </div>

        <div className="main">
          <div className="main_content">
            <section className="content">
              <h2>Image</h2>
              <canvas ref={this.imgCanvasRef} />
            </section>

            <section>
              <h2>Watermark</h2>
              <canvas style={{ display: "none" }} ref={this.imgCanvasRef2} />
            </section>

            <section className="benchmarks">
              <div id="time"></div>
              <div id="code"></div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
