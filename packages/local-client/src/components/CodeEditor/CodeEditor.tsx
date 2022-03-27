import './CodeEditor.css';
import './syntax.css';

import { useRef } from 'react';
import parser from 'prettier/parser-babel';
import prettier from 'prettier';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  runBundle(): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  runBundle,
}) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-controls">
        <button
          className="button button-format is-primary is-small"
          onClick={onFormatClick}
        >
          Format
        </button>
        <button
          className="button button-format is-primary is-small"
          style={{ marginTop: '4px' }}
          onClick={runBundle}
        >
          Run
        </button>
      </div>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        theme="dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
