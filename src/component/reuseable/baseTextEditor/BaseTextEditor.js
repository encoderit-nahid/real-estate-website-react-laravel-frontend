import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "react-rte";

function BaseTextEditor({ control, name, defaultEditorValue }) {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );

  useEffect(() => {
    if (defaultEditorValue) {
      setEditorValue(
        RichTextEditor.createValueFromString(defaultEditorValue, "html")
      );
    }
  }, [defaultEditorValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={editorValue.toString("html")}
      render={({ field: { onChange, value } }) => (
        <RichTextEditor
          value={editorValue}
          onChange={(newValue) => {
            setEditorValue(newValue);
            onChange(newValue.toString("html"));
          }}
          placeholder="Property Description"
          editorClassName="demo-editor"
        />
      )}
    />
  );
}

export default BaseTextEditor;
