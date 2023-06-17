import { useRef, useState } from "react";

const SNAP_THRESHOLD = 100;

const Carousel = ({ slides }: { slides: React.ReactNode[] }) => {
  const [index, setIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);

  const translate = `-${index * 100}%`;

  // ### touch/drag related ###
  const pointerId = useRef(-1);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    pointerId.current = e.pointerId;
    dragStartX.current = e.clientX;
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.pointerId === pointerId.current) {
      setIsSliding(false);
      dragDeltaX.current = dragStartX.current - e.clientX;
      e.currentTarget.style.transform = `translateX(calc(${translate} - ${dragDeltaX.current}px))`;
      e.currentTarget.style.transition = "none";
    }
  }
  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.pointerId === pointerId.current) {
      if (dragDeltaX.current >= SNAP_THRESHOLD) slide(1);
      else if (dragDeltaX.current <= -SNAP_THRESHOLD) slide(-1);
      else {
        e.currentTarget.style.transform = `translateX(${translate})`;
        e.currentTarget.style.transition = "transform .1s ease-in-out";
      }

      pointerId.current = -1;
      dragStartX.current = 0;
      dragDeltaX.current = 0;
    }
  }
  // ###  ###

  function slide(qty: number) {
    setIndex(index + qty);
    setIsSliding(true);
  }

  function checkIndex() {
    if (index === 0) setIndex(slides.length);
    if (index === slides.length + 1) setIndex(1);
    setIsSliding(false);
  }

  return (
    <>
      <div className="w-full h-full overflow-hidden touch-none select-none">
        <div
          style={{
            transform: `translateX(${translate}%)`,
            transition: isSliding ? "transform .3s ease-in-out" : "none",
          }}
          className="w-full h-full flex [&>*]:flex-none"
          onTransitionEnd={checkIndex}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {slides[slides.length - 1]}
          {slides}
          {slides[0]}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 font-bold text-3xl">
        <button disabled={isSliding} className="p-4" onClick={() => slide(-1)}>
          &larr;
        </button>
        {[...slides.keys()].map((k) => (
          <button
            key={k}
            disabled={isSliding}
            className={`w-3 h-3 mx-2 rounded-full ${
              index !== k + 1 ? "opacity-50" : ""
            } bg-current`}
            onClick={() => setIndex(k + 1)}
          />
        ))}
        <button disabled={isSliding} className="p-4" onClick={() => slide(1)}>
          &rarr;
        </button>
      </div>
    </>
  );
};

export default Carousel;
