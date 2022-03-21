import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";

const EXAMPLE_URL = "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn";

function App() {
  const [diagram, setDiagram] = useState("");
  const [isModelerInit, setModelerInit] = useState(false);
  const container = document.getElementById("container");

  useEffect(() => {
    axios.get(EXAMPLE_URL).then((r) => setDiagram(r.data)).catch(console.error);
  }, []);
  
  useEffect(() => {
    if (!isModelerInit && diagram.length > 0) {
      setModelerInit(true);
      
      const modeler = new Modeler({
        container,
        keyboard: { bindTo: document }
      });
      
      modeler
        .importXML(diagram)
        .then(({ warnings }) => {
          if (warnings.length) {
            console.warn(warnings);
          }
  
          const canvas = modeler.get("modeling");
          canvas.setColor("CalmCustomerTask", {
            stroke: "green",
            fill: "yellow"
          });
        })
        .catch(console.error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram, isModelerInit]);

  return (
    <div
      id="container"
      style={{
        border: "1px solid #000000",
        height: "90vh",
        width: "90vw",
        margin: "auto"
      }}
    />
  );
}

export default App;
