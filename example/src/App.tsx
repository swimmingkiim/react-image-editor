import { useEffect } from "react";

import RIE from "react-image-editor";

import "./App.css";

function App() {
  const editor = new RIE.ReactImageEditor({
    fabricCanvasOptions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  useEffect(() => {
    console.log(editor.data);
  }, []);

  return (
    <RIE.ReactImageEditorCanvas reactImageEditor={editor}>
      <RIE.Rect x={100} y={100} width={300} height={300} />
    </RIE.ReactImageEditorCanvas>
  );
}

export default App;
