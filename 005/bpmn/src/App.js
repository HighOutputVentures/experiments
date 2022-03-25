import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import resizeTask from 'bpmn-js-task-resize/lib';
import axios from "axios";

import nyanDrawModule from './lib/nyan/draw';
import nyanPaletteModule from './lib/nyan/palette';
import userDrawModule from './lib/user/draw';
import userPaletteModule from './lib/user/palette';

// const BPMN_URL = "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn";
// const BPMN_URL = "/empty.bpmn";
const BPMN_URL = "/export.bpmn";
// const BPMN_URL = "/temp.bpmn";

function App() {
  const [diagram, setDiagram] = useState("");
  const [isModelerInit, setModelerInit] = useState(false);
  const [modeler, setModeler] = useState();
  const container = document.getElementById("container");

  useEffect(() => {
    axios.get(BPMN_URL).then((r) => setDiagram(r.data)).catch(console.error);
  }, []);
  
  useEffect(() => {
    if (!isModelerInit && diagram.length > 0) {
      setModelerInit(true);
      
      const modeler = new Modeler({
        container,
        keyboard: { bindTo: document },
        additionalModules: [
          resizeTask,
          // nyanDrawModule,
          // nyanPaletteModule,
          userDrawModule,
          userPaletteModule,
        ],
        taskResizingEnabled: true,
      });
      
      modeler
        .importXML(diagram)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.warn(warnings);
          }
        })
        .catch(console.error);

      setModeler(modeler);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram, isModelerInit]);

  const downloadXml = (data) => {
    const element = document.createElement("a");
    const file = new Blob([data], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "export.bpmn";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  
  const saveDiagram = async () => {
    if (!modeler) return;

    const result = await modeler.saveXML({ format: true });
    downloadXml(result.xml);
  }

  return (
    <>
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "90vh",
          width: "90vw",
          margin: "auto"
        }}
      />

      <button onClick={saveDiagram}>EXPORT</button>
    </>
  );
}

export default App;
