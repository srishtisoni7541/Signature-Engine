export function cssBoxToPdfPoints(box, viewerRect, pagePoints) {
  const canvasCssWidth = viewerRect.width;
  const canvasCssHeight = viewerRect.height;

  const xNorm = (box.left - viewerRect.left) / canvasCssWidth;
  const yNormTop = (box.top - viewerRect.top) / canvasCssHeight;
  const wNorm = box.width / canvasCssWidth;
  const hNorm = box.height / canvasCssHeight;

  const xPts = xNorm * pagePoints.width;
  const widthPts = wNorm * pagePoints.width;
  const heightPts = hNorm * pagePoints.height;

  const yPts = pagePoints.height - (yNormTop * pagePoints.height) - heightPts;

  return {
    x: Number(xPts.toFixed(2)),
    y: Number(yPts.toFixed(2)),
    width: Number(widthPts.toFixed(2)),
    height: Number(heightPts.toFixed(2))
  };
}
