import Preview from "./Preview.js";
import React from "react";
import { deSerializeContent, EDITOR_NAME } from "../editor";

const MAX_PREVIEW_LENGTH = 40;

function renderPreview(preview) {
  return <Preview preview={preview} />;
}

function serializePreview(note) {
  if (note.content[note.mutationName] === null) {
    return "No preview";
  }
  const editorState = deSerializeContent(note.content[EDITOR_NAME]);
  let text = editorState.getCurrentContent().getFirstBlock().text;
  text = text === "" ? "New Note" : text;
  text =
    text.length > MAX_PREVIEW_LENGTH
      ? text.substring(0, MAX_PREVIEW_LENGTH - 3) + "..."
      : text;
  return text;
}

export { renderPreview, serializePreview };
