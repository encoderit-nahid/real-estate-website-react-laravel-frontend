import React, { useEffect, useState } from 'react'
import RichTextEditor from 'react-rte';

function BaseTextEditor(field,setValue) {

    // const defaultValue = '<p>Default text here</p>';

    // // Initialize the state with the default editor value
    // const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(defaultValue, 'html'));

    const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());

    const handleChange = (value) => {
      // Update the state with the new editor value when it changes
      setEditorValue(value);
      console.log(value.toString('html'))
     
    };
  return (
    <RichTextEditor
    value={editorValue}
    onChange={handleChange}
    placeholder='Property Description'
    editorClassName="demo-editor"

/>
  )
}

export default BaseTextEditor