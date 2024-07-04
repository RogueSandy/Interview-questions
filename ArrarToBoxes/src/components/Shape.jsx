// display the boxes where box === 1
// display nothing where box === 0
// turn green when clicking
// when all boxes are selected it deselect in order of selecting
// when deselecting cannot select other boxes

import React, { useEffect, useMemo, useRef, useState } from "react";

function Shape({ data }) {
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);
  const timerRef = useRef(null);

  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box === 1) {
        acc += 1;
      }

      return acc;
    }, 0);
  }, [boxes]);

  const handleClick = (e) => {
    const { target } = e;

    const index = target.getAttribute("data-index");
    const status = target.getAttribute("data-status");

    if (
      index === null ||
      status === "hidden" ||
      selected.has(index) ||
      unloading
    ) {
      return;
    }

    setSelected((prev) => {
      return new Set(prev.add(index));
    });
  };

  const unload = () => {
    setUnloading(true);
    const keys = Array.from(selected.keys());

    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift();

        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });

        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(false);
        clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    // selected.size >= countOfVisibleBoxes
    if (selected.size >= countOfVisibleBoxes) {
      unload();
    }
  }, [selected]);

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((box, index) => {
        const isSelected = selected.has(index.toString());
        return (
          <div
            key={`${box}-${index}`}
            className={`
                box 
                ${box === 1 ? "visible" : "hidden"}
                ${isSelected && "selected"} 
            `}
            data-index={index}
            data-status={box === 1 ? "visible" : "hidden"}
          />
        );
      })}
    </div>
  );
}

export default Shape;
