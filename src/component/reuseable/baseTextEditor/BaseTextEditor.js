import React from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "react-rte";

function BaseTextEditor({ control, name }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={RichTextEditor.createEmptyValue()}
      render={({ field: { onChange, value } }) => (
        <RichTextEditor
          value={value}
          onChange={onChange}
          placeholder="Property Description"
          editorClassName="demo-editor"
        />
      )}
    />
  );
}

export default BaseTextEditor;
