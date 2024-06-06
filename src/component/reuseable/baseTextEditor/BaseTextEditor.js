import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "react-rte";
import en from "locales/en";
import pt from "locales/pt";
function BaseTextEditor({ control, name, allValues }) {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createValueFromString(allValues?.description || "", "html")
  );
  const [myValue, setMyValue] = useState("pt");
  const t = myValue === "en" ? en : pt;

  // Update editorValue when allValues.description changes
  useEffect(() => {
    setEditorValue(
      RichTextEditor.createValueFromString(allValues?.description || "", "html")
    );
  }, [allValues?.description]);
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
