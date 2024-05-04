import React, { useContext } from 'react';
import { Minus, Plus } from 'lucide-react';
import { MapContext } from './Map/Map';

const MapCustomControl = () => {
  const map = useContext(MapContext);

  const zoomIn = () => {
    if (map) {
      const level = map.getLevel();

      map.setLevel(level - 1);
    }
  };

  const zoomOut = () => {
    if (map) {
      const level = map.getLevel();

      map.setLevel(level + 1);
    }
  };

  return (
    <div className="absolute right-10pxr top-10pxr z-30 rounded shadow-md">
      <button
        onClick={zoomIn}
        className="flex h-32pxr w-32pxr items-center justify-center rounded-t-[3px] border-b border-solid border-gray-300 bg-white"
        type="button"
      >
        <Plus
          width={18}
          height={18}
          stroke="#444444"
        />
      </button>
      <button
        onClick={zoomOut}
        className="flex h-32pxr w-32pxr items-center justify-center rounded-b-[3px] border-b border-solid border-gray-300 bg-white"
        type="button"
      >
        <Minus
          width={18}
          height={18}
          stroke="#444444"
        />
      </button>
    </div>
  );
};

export default MapCustomControl;
