import React, { useEffect, useState, useRef } from "react";

export default function CatMeme() {
  const [image, setImage] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    const catImage = new Image();
    catImage.src = "https://thiscatdoesnotexist.com/";
    catImage.onload = () => setImage(catImage);
  }, []);

  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.drawImage(image, 0, 0);
    }
  }, [image, canvas]);

  return (
    <div>
      {image && canvas && (
        <canvas ref={canvas} height={image.height} width={image.width} />
      )}
    </div>
  );
}
