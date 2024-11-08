import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./Canvas.css";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  const [color, setColor] = useState("#000000"); 

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f5f5f5",
    });

    
    fabricCanvas.current.on("object:selected", (e) => {
      const selectedObject = e.target;
      setColor(selectedObject.fill);
    });
  }, []);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: color, 
      width: 100,
      height: 100,
    });
    fabricCanvas.current.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 300,
      top: 100,
      fill: color, 
      radius: 50,
    });
    fabricCanvas.current.add(circle);
  };

  const clearCanvas = () => {
    fabricCanvas.current.clear();
    fabricCanvas.current.backgroundColor = "#f5f5f5";
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);

   
    const selectedObject = fabricCanvas.current.getActiveObject();
    if (selectedObject) {
      selectedObject.set({ fill: newColor });
      fabricCanvas.current.renderAll(); 
    }
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="toolbar">
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={clearCanvas}>Clear Canvas</button>
        <div>
          {/* Color Picker */}
          <label>Change Color:</label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
