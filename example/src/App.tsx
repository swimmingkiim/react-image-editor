import "./App.css";
import RIE from "react-image-editor";

function App() {
  const editor = new RIE.ReactImageEditor({
    fabricCanvasOptions: {},
  });

  return (
    <RIE.ReactImageEditorCanvas reactImageEditor={editor}>
      <></>
    </RIE.ReactImageEditorCanvas>
  );
}

export default App;
