import Preview from "./Preview.js";
import React from "react";
import { deSerializeContent, EDITOR_NAME } from "../editor";

function renderPreview(preview) {
  return <Preview preview={preview} />;
}

function serializePreview(note) {
  if (note.content[note.mutationName] === null) {
    return "No preview";
  }
  const editorState = deSerializeContent(note.content[EDITOR_NAME]);
  let text = editorState.getCurrentContent().getFirstBlock().text;
  if (text === "") {
    text = "New Note";
  }
  return text;
}

export { renderPreview, serializePreview };
