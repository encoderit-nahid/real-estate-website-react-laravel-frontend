import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "react-rte";
import en from "locales/en";
import pt from "locales/pt";
function BaseTextEditor({ control, name, language, defaultEditorValue }) {
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
  const [myValue, setMyValue] = useState(language || "pt");
  const t = myValue === "en" ? en : pt;
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
          placeholder={t["Property Description"]}
          editorClassName="demo-editor"
        />
      )}
    />
  );
}

export default BaseTextEditor;
