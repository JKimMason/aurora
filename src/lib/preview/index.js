import Preview from "./Preview.js";
import React from "react";

function renderPreview(preview) {
  return <Preview preview={preview} />;
}

function serializePreview(note) {
  return "Note: " + note.uuid;
}

export { renderPreview, serializePreview };
