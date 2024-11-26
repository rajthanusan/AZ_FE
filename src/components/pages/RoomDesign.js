
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import '../style/RoomDesign.css';
// import { FiDownload, FiPackage } from 'react-icons/fi';
// import Plans from './Plans';
// import { useNavigate } from 'react-router-dom';



// const RoomDesign = () => {
//   const [roomImage, setRoomImage] = useState(null);
//   const [furniture, setFurniture] = useState([]);
//   const [selectedFurniture, setSelectedFurniture] = useState(null);
//   const [isResizing, setIsResizing] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const RESIZE_HANDLE_SIZE = 8;
//   const MIN_SIZE = 20;

//   const preloadImage = (src) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.crossOrigin = 'Anonymous'; // Allow cross-origin access for canvas
//       img.src = src;
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//     });
//   };

//   // Handle room image upload
//   const handleRoomImageUpload = async (e) => {
//     const reader = new FileReader();
//     reader.onload = async () => {
//       try {
//         const img = await preloadImage(reader.result);
//         setRoomImage(img);
//       } catch (error) {
//         console.error('Failed to load room image:', error);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   // Add furniture to the canvas
//   const addFurnitureIcon = async (iconSrc) => {
//     try {
//       const img = await preloadImage(iconSrc);
//       const newFurniture = {
//         id: Date.now(),
//         img,
//         x: Math.random() * (800 - img.width),
//         y: Math.random() * (600 - img.height),
//         width: img.width,
//         height: img.height,
//       };
//       setFurniture((prevFurniture) => [...prevFurniture, newFurniture]); // Add furniture to the array
//     } catch (error) {
//       console.error('Failed to load furniture image:', error);
//     }
//   };

//   // Handle custom furniture upload (with remove background)
//   const handleCustomFurnitureUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image_file', file);

//     try {
      
//       const response = await axios.post(
//         'https://api.remove.bg/v1.0/removebg',
//         formData,
//         {
//           headers: {
//             'X-Api-Key': 'eV3qcghXMzVafoQ5Xm39BK8H', 
//           },
//           responseType: 'blob',
//         }
//       );

//       const blob = response.data;
//       const imgURL = URL.createObjectURL(blob);
//       await addFurnitureIcon(imgURL); 
//     } catch (error) {
//       console.error('Failed to remove background:', error);
//     }
//   };

//   const drawCanvas = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (roomImage) {
//       ctx.drawImage(roomImage, 0, 0, canvas.width, canvas.height);
//     }

//     furniture.forEach((item) => {
//       ctx.drawImage(item.img, item.x, item.y, item.width, item.height);

//       if (selectedFurniture && selectedFurniture.id === item.id) {
//         ctx.strokeStyle = 'blue';
//         ctx.lineWidth = 2;
//         ctx.strokeRect(item.x, item.y, item.width, item.height);
//         drawResizeHandles(ctx, item);
//       }
//     });
//   };

//   const drawResizeHandles = (ctx, item) => {
//     const { x, y, width, height } = item;
//     const handleX = x + width - RESIZE_HANDLE_SIZE / 2;
//     const handleY = y + height - RESIZE_HANDLE_SIZE / 2;

//     ctx.fillStyle = 'red';
//     ctx.fillRect(handleX, handleY, RESIZE_HANDLE_SIZE, RESIZE_HANDLE_SIZE);
//   };

//   // Handle dragging or resizing of furniture
//   const handleMouseDown = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     const foundFurniture = [...furniture].reverse().find((item) => (
//       mouseX >= item.x &&
//       mouseX <= item.x + item.width &&
//       mouseY >= item.y &&
//       mouseY <= item.y + item.height
//     ));

//     if (foundFurniture) {
//       const isOnResizeHandle = (
//         mouseX >= foundFurniture.x + foundFurniture.width - RESIZE_HANDLE_SIZE &&
//         mouseY >= foundFurniture.y + foundFurniture.height - RESIZE_HANDLE_SIZE
//       );

//       setSelectedFurniture(foundFurniture);

//       if (isOnResizeHandle) {
//         setIsResizing(true);
//       } else {
//         setOffset({ x: mouseX - foundFurniture.x, y: mouseY - foundFurniture.y });
//         const handleMouseMove = (eMove) => {
//           const newMouseX = eMove.clientX - rect.left;
//           const newMouseY = eMove.clientY - rect.top;

//           setFurniture((prevFurniture) =>
//             prevFurniture.map((item) => {
//               if (item.id === foundFurniture.id) {
//                 return {
//                   ...item,
//                   x: newMouseX - offset.x,
//                   y: newMouseY - offset.y,
//                 };
//               }
//               return item;
//             })
//           );
//         };

//         const handleMouseUp = () => {
//           setIsResizing(false);
//           window.removeEventListener('mousemove', handleMouseMove);
//           window.removeEventListener('mouseup', handleMouseUp);
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('mouseup', handleMouseUp);
//       }
//     } else {
//       setSelectedFurniture(null);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isResizing || !selectedFurniture) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     const newWidth = Math.max(MIN_SIZE, mouseX - selectedFurniture.x);
//     const newHeight = Math.max(MIN_SIZE, mouseY - selectedFurniture.y);

//     setFurniture((prevFurniture) =>
//       prevFurniture.map((item) => {
//         if (item.id === selectedFurniture.id) {
//           return {
//             ...item,
//             width: newWidth,
//             height: newHeight,
//           };
//         }
//         return item;
//       })
//     );
//   };

//   const handleMouseUp = () => {
//     setIsResizing(false);
//   };

//   const deleteSelectedFurniture = () => {
//     if (selectedFurniture) {
//       setFurniture((prevFurniture) => prevFurniture.filter(item => item.id !== selectedFurniture.id));
//       setSelectedFurniture(null);
//     }
//   };

//   // Function to download the final customized room image
//   const downloadCanvasImage = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const image = canvas.toDataURL('image/png');
//     const link = document.createElement('a');
//     link.href = image;
//     link.download = 'customized-room-design.png';
//     link.click();
//   };

  

//   useEffect(() => {
//     drawCanvas();
//   }, [roomImage, furniture, selectedFurniture]);

  


//   return (
//     <div className="room-design-container">
//       <h2 className="display-5 mb-3 cheading">
//       Room <span>Design</span> Tool
//         </h2>
     
//       <h3>After customizing, download your image to upload it during package booking</h3>
//       <div className="image-upload">
//         <label htmlFor="roomImage" className="custom-file-upload"    
//          style={{
//                     transition: 'transform 0.3s, box-shadow 0.3s',
//                     borderRadius: '10px',
//                      border: '3px solid #333333'
                    
//                   }}>
//           Upload Room Image
//         </label>
//         <input
//           type="file"
//           id="roomImage"
//           accept="image/*"
//           onChange={handleRoomImageUpload}
//         />
//       </div>
//       <div className="image-upload">
//         <label htmlFor="furnitureImage" className="custom-file-upload"     
//          style={{
                    
//                     transition: 'transform 0.3s, box-shadow 0.3s',
//                     borderRadius: '10px',
//                      border: '3px solid #333333'
                    
//                   }}>
//           Upload Furniture Image
//         </label>
//         <input
//           type="file"
//           id="furnitureImage"
//           accept="image/*"
//           onChange={handleCustomFurnitureUpload}
//         />
//       </div>
//       <div
//         className="canvas-container"    
//          style={{
//           height: '500px',
//           transition: 'transform 0.3s, box-shadow 0.3s',
//           borderRadius: '10px',
//            border: '3px solid #113047'
          
//         }}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       >
//         <canvas ref={canvasRef} width={800} height={600}></canvas>
//       </div>

//       {selectedFurniture && (
//         <button className="delete-button"  style={{ backgroundColor: '#D97D7D', borderColor: '#8f2347'}}
//         onClick={deleteSelectedFurniture}>
//           Delete Selected Furniture
//         </button>
//       )}
// <div>
//       {/* New Download Button */}
//       <button className="custom-button" 
// onClick={downloadCanvasImage}>
//       <FiDownload /> Download Room Design
//       </button>
//       <button className="custom-button"  
//  onClick={() => navigate('/plans')}>
//           <FiPackage /> Book Your Package Now
//         </button>
// </div>

//     </div>
//   );
// };

// export default RoomDesign;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../style/RoomDesign.css';
import { FiDownload, FiPackage } from 'react-icons/fi';
import Plans from './Plans';
import { useNavigate } from 'react-router-dom';



const RoomDesign = () => {
  const [roomImage, setRoomImage] = useState(null);
  const [furniture, setFurniture] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const RESIZE_HANDLE_SIZE = 8;
  const MIN_SIZE = 20;

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Allow cross-origin access for canvas
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  // Handle room image upload
  const handleRoomImageUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const img = await preloadImage(reader.result);
        setRoomImage(img);
      } catch (error) {
        console.error('Failed to load room image:', error);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Add furniture to the canvas
  const addFurnitureIcon = async (iconSrc) => {
    try {
      const img = await preloadImage(iconSrc);
      const newFurniture = {
        id: Date.now(),
        img,
        x: Math.random() * (800 - img.width),
        y: Math.random() * (600 - img.height),
        width: img.width,
        height: img.height,
      };
      setFurniture((prevFurniture) => [...prevFurniture, newFurniture]); // Add furniture to the array
    } catch (error) {
      console.error('Failed to load furniture image:', error);
    }
  };

  // Handle custom furniture upload (with remove background)
  const handleCustomFurnitureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image_file', file);

    try {
      
      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            'X-Api-Key': 'eV3qcghXMzVafoQ5Xm39BK8H', 
          },
          responseType: 'blob',
        }
      );

      const blob = response.data;
      const imgURL = URL.createObjectURL(blob);
      await addFurnitureIcon(imgURL); 
    } catch (error) {
      console.error('Failed to remove background:', error);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (roomImage) {
      ctx.drawImage(roomImage, 0, 0, canvas.width, canvas.height);
    }

    furniture.forEach((item) => {
      ctx.drawImage(item.img, item.x, item.y, item.width, item.height);

      if (selectedFurniture && selectedFurniture.id === item.id) {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.strokeRect(item.x, item.y, item.width, item.height);
        drawResizeHandles(ctx, item);
      }
    });
  };

  const drawResizeHandles = (ctx, item) => {
    const { x, y, width, height } = item;
    const handleX = x + width - RESIZE_HANDLE_SIZE / 2;
    const handleY = y + height - RESIZE_HANDLE_SIZE / 2;

    ctx.fillStyle = 'red';
    ctx.fillRect(handleX, handleY, RESIZE_HANDLE_SIZE, RESIZE_HANDLE_SIZE);
  };

  // Handle dragging or resizing of furniture
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const foundFurniture = [...furniture].reverse().find((item) => (
      mouseX >= item.x &&
      mouseX <= item.x + item.width &&
      mouseY >= item.y &&
      mouseY <= item.y + item.height
    ));

    if (foundFurniture) {
      const isOnResizeHandle = (
        mouseX >= foundFurniture.x + foundFurniture.width - RESIZE_HANDLE_SIZE &&
        mouseY >= foundFurniture.y + foundFurniture.height - RESIZE_HANDLE_SIZE
      );

      setSelectedFurniture(foundFurniture);

      if (isOnResizeHandle) {
        setIsResizing(true);
      } else {
        setOffset({ x: mouseX - foundFurniture.x, y: mouseY - foundFurniture.y });
        const handleMouseMove = (eMove) => {
          const newMouseX = eMove.clientX - rect.left;
          const newMouseY = eMove.clientY - rect.top;

          setFurniture((prevFurniture) =>
            prevFurniture.map((item) => {
              if (item.id === foundFurniture.id) {
                return {
                  ...item,
                  x: newMouseX - offset.x,
                  y: newMouseY - offset.y,
                };
              }
              return item;
            })
          );
        };

        const handleMouseUp = () => {
          setIsResizing(false);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }
    } else {
      setSelectedFurniture(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!isResizing || !selectedFurniture) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newWidth = Math.max(MIN_SIZE, mouseX - selectedFurniture.x);
    const newHeight = Math.max(MIN_SIZE, mouseY - selectedFurniture.y);

    setFurniture((prevFurniture) =>
      prevFurniture.map((item) => {
        if (item.id === selectedFurniture.id) {
          return {
            ...item,
            width: newWidth,
            height: newHeight,
          };
        }
        return item;
      })
    );
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const deleteSelectedFurniture = () => {
    if (selectedFurniture) {
      setFurniture((prevFurniture) => prevFurniture.filter(item => item.id !== selectedFurniture.id));
      setSelectedFurniture(null);
    }
  };

  // Function to download the final customized room image
  const downloadCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'customized-room-design.png';
    link.click();
  };

  

  useEffect(() => {
    drawCanvas();
  }, [roomImage, furniture, selectedFurniture]);

  


  return (
    <div className="room-design-container">
       <h2 className="display-5 mb-3 cheading">
       Room <span>Design</span> Tool
         </h2>
     
     <h3>After customizing, download your image to upload it during package booking</h3>
      <div className="image-upload">
        <label htmlFor="roomImage" className="custom-file-upload">
          Upload Room Image
        </label>
        <input
          type="file"
          id="roomImage"
          accept="image/*"
          onChange={handleRoomImageUpload}
        />
      </div>
      <div className="image-upload">
        <label htmlFor="furnitureImage" className="custom-file-upload">
          Upload Furniture Image
        </label>
        <input
          type="file"
          id="furnitureImage"
          accept="image/*"
          onChange={handleCustomFurnitureUpload}
        />
      </div>
      <div
        className="canvas-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <canvas ref={canvasRef} width={800} height={600}></canvas>
      </div>

      {selectedFurniture && (
        <button className="delete-button" onClick={deleteSelectedFurniture}>
          Delete Selected Furniture
        </button>
      )}
<div>
      {/* New Download Button */}
      <button className="custom-button" onClick={downloadCanvasImage}>
      <FiDownload /> Download Room Design
      </button>
      <button className="custom-button" onClick={() => navigate('/plans')}>
          <FiPackage /> Book Your Package Now
        </button>
</div>

    </div>
  );
};

export default RoomDesign;