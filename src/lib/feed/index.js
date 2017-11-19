import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import {
  selectedNote,
  editorState,
  isLoadingContent
} from "../../redux/selectors";
import NoteView from "./NoteView";
import styled from "styled-components";
import { selectNote, newNote, loadNoteContent } from "../../redux/actions";
import { noteWithEmptyEditor } from "../editor";

const AddButton = styled.button`
  float: right;
  position: relative;
  background: transparent;
  border: none;
  color: #e600e6;
  top: 5%;
  right: 7%;
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  onAdd = () => {
    const note = noteWithEmptyEditor();
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedNote === null) {
      return;
    }
    if (this.props.selectedNote !== prevProps.selectedNote) {
      this.props.dispatch(loadNoteContent(this.props.selectedNote));
    }
  }

  render() {
    return (
      <div>
        <AddButton onClick={this.onAdd}>📝 New</AddButton>
        <NoteView
          ourEditorState={this.props.editorState}
          note={this.props.selectedNote}
          placeholder={"Change me!"}
        />
      </div>
    );
  }
}

Feed.propTypes = {};

const mapStateToProps = state => {
  return {
    selectedNote: selectedNote(state),
    editorState: editorState(state),
    isLoadingContent: isLoadingContent(state)
  };
};

export default connect(mapStateToProps)(mutate(Feed, "Feed"));
