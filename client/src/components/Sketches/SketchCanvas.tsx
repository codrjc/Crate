import React, { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";

interface SketchCanvasProps {
  reviews: Review[];
}

interface Review {
  _id: string;
  review: string;
  albumId: string;
  imageUrl: string; // Add imageUrl property
}

interface Square {
  x: number;
  y: number;
  image: any;
}

const SketchCanvas: React.FC<SketchCanvasProps> = ({ reviews }) => {
  const [squares, setSquares] = useState<Square[]>([]);

  const setup = (p5: any, canvasParentRef: any) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background("#f1f1e6");
  };

  const draw = async (p5: any) => {
    p5.background("#f1f1e6");

    for (const square of squares) {
      p5.rect(square.x, square.y, 200, 200);
      if (square.image) {
        p5.image(square.image, square.x, square.y, 200, 200);
      }
    }

    if (squares.length < reviews.length) {
      const image = await loadImageAsync(reviews[squares.length].imageUrl, p5);

      const [x, y] = generateRandomCoordinates(p5);
      setSquares((prevSquares) => [...prevSquares, { x, y, image }]);
    }
  };

  const generateRandomCoordinates = (p5: any): number[] => {
    const x = p5.random(p5.windowWidth - 200);
    const y = p5.random(p5.windowHeight - 200);
    return [x, y];
  };

  const loadImageAsync = (url: string, p5: any): Promise<any> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(p5.loadImage(url));
    });
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default SketchCanvas;
