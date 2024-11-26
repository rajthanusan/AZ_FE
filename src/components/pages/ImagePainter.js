import React, { useState, useRef, useEffect } from 'react';

const ImagePainter = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#ff9999');
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Set image data URL
    };
    reader.readAsDataURL(file);
  };

  const applyColorFilter = (ctx, width, height) => {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.4; // Adjust opacity to simulate wall color
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0; // Reset opacity
  };

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    imgRef.current.onload = () => {
      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;

      // Draw image to canvas
      ctx.drawImage(imgRef.current, 0, 0);

      // Apply color filter on top
      applyColorFilter(ctx, canvas.width, canvas.height);
    };
    imgRef.current.src = image;
  };

  useEffect(() => {
    if (image) {
      handleImageLoad();
    }
  }, [image, color]);

  return (
    <section className="d-flex flex-column align-items-center">
      <div className="mb-3">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control mb-2" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="form-control mb-2" />
      </div>
      <div>
        {image && (
          <canvas ref={canvasRef} style={{ border: '1px solid black', cursor: 'pointer', width: '500px' }} />
        )}
      </div>
    </section>
  );
};

export default ImagePainter;
