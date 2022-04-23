import './TextEditor.css';

import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editting, setEditting] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditting(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editting) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, cell.chapterId, v || '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditting(true)}>
      <div className="card-content">
        <MDEditor.Markdown
          className="text-editor"
          source={cell.content || 'Click to edit'}
        />
      </div>
    </div>
  );
};

export default TextEditor;
