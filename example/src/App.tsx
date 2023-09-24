import RIE from "react-image-editor";

import "./App.css";

function App() {
  const editor = new RIE.ReactImageEditor({
    fabricCanvasOptions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    initialState: [
      new RIE.Tab({
        name: "default",
        initialHistory: new RIE.History({
          initialData: new RIE.Data({
            prevData: null,
            snapshot: {
              version: "6.0.0-beta10",
              objects: [
                {
                  rx: 0,
                  ry: 0,
                  type: "Rect",
                  version: "6.0.0-beta10",
                  originX: "left",
                  originY: "top",
                  left: 100,
                  top: 100,
                  width: 300,
                  height: 300,
                  fill: "#000000",
                  stroke: "#000000",
                  strokeWidth: 1,
                  strokeDashArray: null,
                  strokeLineCap: "butt",
                  strokeDashOffset: 0,
                  strokeLineJoin: "miter",
                  strokeUniform: false,
                  strokeMiterLimit: 4,
                  scaleX: 1,
                  scaleY: 1,
                  angle: 0,
                  flipX: false,
                  flipY: false,
                  opacity: 1,
                  shadow: null,
                  visible: true,
                  backgroundColor: "",
                  fillRule: "nonzero",
                  paintFirst: "fill",
                  globalCompositeOperation: "source-over",
                  skewX: 0,
                  skewY: 0,
                },
              ],
            },
          }),
        }),
      }),
    ],
  });

  const handleAddRect = () => {
    const newRect = new RIE.ShapeRect({
      editorController: editor,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 100 + Math.random() * 100,
      height: 100 + Math.random() * 100,
    });
    editor.addObject(newRect);
  }

  return (
  <>
    <button
        onClick={handleAddRect}
        style={{
          position: 'fixed',
          zIndex: 100,
        }}
      >add rect</button>
    <RIE.ReactImageEditorCanvas reactImageEditor={editor}>
      <RIE.Rect x={100} y={100} width={300} height={300}/>
    </RIE.ReactImageEditorCanvas>
  </>
  );
}

export default App;
