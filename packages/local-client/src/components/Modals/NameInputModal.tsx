import { useState } from 'react';
import { TreeFileTypes } from '../../state';
import ModalBase from './ModalBase';

interface ChangeNameModalProps {
  type: TreeFileTypes;
  currName: string;
  setFilename: (filename: string) => void;
  onCancel: () => void;
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({
  type,
  currName,
  setFilename,
  onCancel,
}) => {
  const [value, setValue] = useState<string>(currName.replace('.js', ''));
  const [error, setError] = useState<string>('');

  const labelName = type === 'file' ? 'Notebook' : 'Directory';

  const onProceed = () => {
    const regexName = /([a-zA-Z0-9\s_\-():])+/g;
    if (regexName.test(value) === false) {
      setError(
        'Filename can contains letters, digits, spaces, hyphen, underscore and parenthesis'
      );
    } else {
      setFilename(type === 'file' ? `${value}.js` : value);
    }
  };

  const renderInput = () => {
    const icon = type === 'file' ? 'fa fa-book' : 'fa fa-folder';

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
        <p className="help is-danger">{error}</p>
      </div>
    );
  };

  const renderFooter = (
    <>
      <button className="button is-outlined" onClick={onProceed}>
        Save
      </button>
      <button className="button is-danger is-outlined" onClick={onCancel}>
        Cancel
      </button>
    </>
  );

  return (
    <ModalBase
      onCancel={onCancel}
      section={renderInput()}
      footer={renderFooter}
    />
  );
};

export default ChangeNameModal;
