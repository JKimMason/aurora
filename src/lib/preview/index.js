import Preview from "./Preview.js";
import React from "react";
import { deSerializeContent, EDITOR_NAME } from "../editor";

const MAX_PREVIEW_LENGTH = 40;

function renderPreview(preview) {
  return <Preview preview={preview} />;
}

function formatText(text) {
  let formattedText = text === "" ? "New Note" : text;
  formattedText =
    text.length > MAX_PREVIEW_LENGTH
      ? text.substring(0, MAX_PREVIEW_LENGTH - 3) + "..."
      : text;
  return formattedText;
}

function serializePreview(note) {
  if (note.content[note.mutationName] === null) {
    return "No preview";
  }
  const editorState = deSerializeContent(note.content[EDITOR_NAME]);
  const text = editorState.getCurrentContent().getFirstBlock().text;
  return formatText(text);
}

export { renderPreview, serializePreview };
