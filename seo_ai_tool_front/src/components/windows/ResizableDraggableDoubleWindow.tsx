import { useState, useEffect } from "react";

type ResizableDraggableDoubleWindowProps = {
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  clientWidth?: number;
  defaultWidthPercentage?:
    | "0.1"
    | "0.2"
    | "0.3"
    | "0.4"
    | "0.5"
    | "0.6"
    | "0.7"
    | "0.8"
    | "0.9";
};
const ResizableDraggableDoubleWindow = ({
  leftChildren,
  rightChildren,
  minWidth = 300,
  maxWidth = 300,
  defaultWidthPercentage = "0.5",
}: ResizableDraggableDoubleWindowProps) => {
  const [width, setWidth] = useState(
    window.innerWidth * Number(defaultWidthPercentage)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [clientWidth, setClientWidth] = useState(0);

  const dragStart = (e: any) => {
    setIsDragging(true);
    setClientWidth(window.innerWidth);
    document.body.style.userSelect = "none";
  };

  const dragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  const dragging = (e: any) => {
    if (isDragging) {
      const newWidth =
        e.pageX > clientWidth - maxWidth
          ? clientWidth - maxWidth
          : e.pageX < minWidth
          ? minWidth
          : e.pageX;
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (width >= window.innerWidth) {
        setWidth(window.innerWidth - maxWidth);
      }
    };

    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("mousemove", dragging);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("mousemove", dragging);
      window.removeEventListener("resize", handleResize);
    };
  }, [width, clientWidth, isDragging]);

  return (
    <div className="main h-screen w-full">
      <div className="main-contents grid grid-cols-[minmax(min-content,max-content)_6px_auto] items-start h-full">
        <div
          className={`sticky overflow-y-auto h-full bg-pink`}
          style={{ width: `${width}px` }}
        >
          {leftChildren}
        </div>
        <div
          className="drag h-screen w-[3px] cursor-ew-resize bg-transparent bg-gray-200 hover:bg-primary-1"
          onMouseDown={dragStart}
        ></div>
        <div className="main-contents-body w-full h-screen overflow-y-auto bg-cornflowerblue">
          {rightChildren}
        </div>
      </div>
    </div>
  );
};

export default ResizableDraggableDoubleWindow;
