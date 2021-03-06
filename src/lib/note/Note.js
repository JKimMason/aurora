import Attribute from "./Attribute.js";
import Tag from "./Tag.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import { loadNoteContent } from "../io";

export default class Note {
  constructor(content, mutationName, tags, attributes, options) {
    options = options || {}; // avoid undefined errors

    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.id = options.id;
    this.created_at = options.created_at;
    this.updated_at = options.updated_at;
    this.attributes = attributes;
    this.tags = tags;

    const cont = {};
    cont[mutationName] = content;
    this.content = cont;
    this.mutationName = mutationName;

    this.forceUUIdToBeString();
  }

  addAttribute = attribute => {
    this.attributes.push(attribute);
  };

  addTag = tag => {
    this.tags.push(tag);
  };

  removeAttribute = id => {
    const index = this.attributes.findIndex(attr => {
      return attr.id === id;
    });
    if (index !== -1) {
      this.attributes.splice(index, 1);
    }
  };

  removeTag = id => {
    const index = this.tags.findIndex(tag => {
      return tag.id === id;
    });
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  };

  loadContent = (callback, onFailure) => {
    loadNoteContent(
      this,
      data => {
        this.content = JSON.parse(data);
        callback(this.content);
      },
      onFailure
    );
  };

  getContent = () => {
    return new Promise((resolve, reject) => {
      if (this.content[this.mutationName] === null) {
        this.loadContent(resolve, reject);
      } else {
        resolve(this.content);
      }
    });
  };

  setContent = content => {
    const cont = {};
    cont[this.mutationName] = content;
    this.content = cont;
    return this.content;
  };

  forceUUIdToBeString = () => {
    this.uuid = `${this.uuid}`; // Force id's to be strings.
  };

  /**
   * Returns true if there's no text
   */
  isEmpty() {
    const text = this.editorState.getCurrentContent().getPlainText();
    return !text || _.trim(text).length === 0;
  }

  /**
   * Returns a Note object from file data
   */
  static fromDBData(data) {
    const json = data.toJSON();
    const attrs = [];
    const tags = [];
    json.tag.forEach(t => {
      tags.push(new Tag(t.value), { id: t.id });
    });
    json.attribute.forEach(at => {
      attrs.push(new Attribute(at.key, at.value, at.searchable, { id: at.id }));
    });
    const mutationName = json.mutationName;
    return new Note(null, mutationName, tags, attrs, {
      uuid: `${json.uuid}`,
      id: json.id,
      created_at: json.created_at,
      updated_at: json.updated_at
    });
  }
}
