import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

export default class Note {
  constructor(editorState, options) {
    options = options || {}; // avoid undefined errors

    this.editorState = editorState;
    this.contentState = convertToRaw(editorState.getCurrentContent());

    const now = Date.now();
    this.date = options.date ? options.date : now;
    this.id = options.id ? options.id : now;

    this.toJSON = this.toJSON.bind(this);
  }

  setEditorState(editorState) {
    this.editorState = editorState;
    this.contentState = convertToRaw(editorState.getCurrentContent());
  }

  /**
   * Gets information we care about saving to JSON
   */
  toJSON() {
    return {
      contentState: this.contentState,
      date: this.date,
      id: this.id
    };
  }

  /**
   * Returns a Note object from file data
   */
  static fromFileData(data) {
    const json = JSON.parse(data);
    const contentState = convertFromRaw(json.contentState);
    const editorState = EditorState.createWithContent(contentState);
    return new Note(editorState, {
      date: json.date,
      id: json.id
    });
  }
}
