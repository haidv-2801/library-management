import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { buildClass } from '../../../constants/commonFunction';
import { Editor as EditorTiny } from '@tinymce/tinymce-react';
import './editor.scss';

Editor.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Editor.defaultProps = {
  id: '',
  className: '',
  style: {},
};

function Editor(props) {
  const { id, style, className } = props;
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div
      id={id}
      style={style}
      className={buildClass(['toe-editor', 'toe-font-body', className])}
    >
      <EditorTiny
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:OpenSans-Regula,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
}

export default Editor;
