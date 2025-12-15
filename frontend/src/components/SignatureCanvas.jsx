import React, { useRef, useEffect, useState } from "react";

export default function SignatureCanvas({ onSave, onCancel }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111827";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
  }

  function start(e) {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault();
  }

  function move(e) {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    e.preventDefault();
  }

  function stop(e) {
    if (!isDrawing) return;
    setIsDrawing(false);
    e.preventDefault();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function save() {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave(dataUrl);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[640px]">
        <h3 className="font-semibold mb-2">Draw Signature</h3>
        <canvas
          ref={canvasRef}
          width={600}
          height={180}
          className="w-full border border-gray-200 mb-3"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={stop}
        />
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 rounded bg-gray-200" onClick={clearCanvas}>
            Clear
          </button>
          <button className="px-3 py-1 rounded bg-gray-200" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-3 py-1 rounded bg-indigo-600 text-white" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
