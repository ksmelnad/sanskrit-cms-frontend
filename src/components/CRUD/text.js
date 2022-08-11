import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { EDITOR_JS_TOOLS } from "./tools.js";
import EditorJS from "@editorjs/editorjs";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";


const Text = () => {
  const [text, setText] = useState({});
  const [open, setOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://sanskrit-cms-backend.herokuapp.com/text/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const text = await response.json();

      if (!text) {
        window.alert(`Text with id ${id} not found`);
        navigate("/dashboard");
        return;
      }
      setText(text);
      const editor = new EditorJS({
        tools: EDITOR_JS_TOOLS,
        holder: "editorjs",
        logLevel: "ERROR",
        data: text.content,
        readOnly: true,
        // onReady: () => {
        //   console.log("Editor.js is ready to work!");
        // },
        autofocus: false,
      });
      console.log(editor);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(text.content, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${text.title}.json`;
    link.click();
  };


  return (
    <Container>
      <div className="mt-5">
        <h3>Title: {text.title}</h3>
        <h5 className="mt-3">Status: {text.status}</h5>
        <div className="bg-light mt-3" id="editorjs">
          {" "}
        </div>
        <div className="row mt-3">
          <div className="col">
            <Button
              style={{ backgroundColor: "#0a58ca" }}
              size="sm"
              onClick={() => {
                setOpen(!open);
              }}
              aria-controls="toggle-json"
              aria-expanded={open}
            >
              Toggle JSON
            </Button>
            <Collapse in={open}>
              <div id="toggle-json">
                <pre>{JSON.stringify(text.content, null, 2)}</pre>
              </div>
            </Collapse>
          </div>
          <div className="col align">
            <Button
              style={{ backgroundColor: "#0a58ca" }}
              size="sm"
              className="float-end"
              type="button"
              onClick={exportData}
            >
              Export Data
            </Button>
          </div>
        </div>
        <div className="mb-5"></div>
      </div>
    </Container>
  );
};

export default Text;
