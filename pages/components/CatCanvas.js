import React, { useEffect, useState, useRef } from "react";

export default function CatCanvas() {
  const [image, setImage] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const catImage = new Image();
    catImage.src = "https://thiscatdoesnotexist.com/";
    catImage.onload = () => setImage(catImage);
  }, []);

  useEffect(() => {
    if (image && canvas) {
      import("@silvia-odwyer/photon").then((photon) => {
        // Module has now been imported.
        // All image processing logic w/ Photon goes here.
        // See sample code below.
        // Create a canvas and get a 2D context from the canvas

        const ctx = canvas.current.getContext("2d");
        ctx.drawImage(image, 0, 0);

        // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
        let newImage = photon.open_image(canvas, ctx);

        // Filter the image, the PhotonImage's raw pixels are modified
        photon.filter(newImage, "radio");

        photon.grayscale(newImage);

        photon.alter_red_channel(newImage, 20);

        // Place the pixels back on the canvas
        photon.putImageData(canvas, ctx, newImage);
      });
    }
  }, [image, canvas]);

  return (
    <>
      {image && canvas && (
        <canvas
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            margin: "auto",
            display: "block",
            width: "500px",
          }}
          ref={canvas}
          height={image.height}
          width={image.width}
        />
      )}
      {/* <button onClick={filterImage}>Apply Filter</button> */}
    </>
  );
}
