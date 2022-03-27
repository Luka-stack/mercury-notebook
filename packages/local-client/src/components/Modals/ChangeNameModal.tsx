import { useState } from 'react';
import { useActions } from '../../hooks/use-actions';

interface ChangeNameModalProps {
  tree: {
    path: string;
    type: string;
    name: string;
  };
  onSuccess: (filename: string) => void;
  onCancel: () => void;
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  tree,
  onSuccess,
  onCancel,
}) => {
  const [value, setValue] = useState<string>(tree.name.replace('.js', ''));
  const [error, setError] = useState<string>('');

  const { renameFile } = useActions();

  const labelName = tree.type === 'file' ? 'Notebook' : 'Directory';

  const onSave = () => {
    const regexName = /([a-zA-Z0-9\s_\-\(\):])+/g;
    if (regexName.test(value) === false) {
      setError(
        'Filename can contains letters, digits, spaces, hyphen, underscore and parenthesis'
      );
    } else {
      const extName = tree.type === 'file' ? `${value}.js` : value;
      renameFile(tree.path, tree.path.replace(tree.name, extName));
      onSuccess(value);
    }
  };

  const renderInput = () => {
    const icon = tree.type === 'file' ? 'fa fa-book' : 'fa fa-folder';

    return (
      <div className="field">
        <label className="label">{`Enter a New ${labelName} Name:`}</label>
        <p className="control has-icons-left">
          <input
            type="text"
            className="input"
            placeholder={`${labelName} name`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className={icon} />
          </span>
        </p>
        {error !== '' && <p className="help is-danger">{error}</p>}
      </div>
    );
  };

  return (
    <div className="modal is-active">
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete is-medium" onClick={onCancel}></button>
        </header>

        <section className="modal-card-body">{renderInput()}</section>

        <footer className="modal-card-foot">
          <button className="button is-outlined" onClick={onSave}>
            Save
          </button>
          <button className="button is-danger is-outlined" onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChangeNameModal;
