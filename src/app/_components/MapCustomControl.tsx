import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface MapCustomControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
}

const MapCustomControl = ({ zoomIn, zoomOut }: MapCustomControlProps) => {
  return (
    <div className="absolute right-10pxr top-10pxr z-30 rounded shadow-md">
      <button
        onClick={zoomIn}
        className="flex h-32pxr w-32pxr items-center justify-center rounded-t-[3px] border-b border-solid border-gray-300 bg-white"
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
