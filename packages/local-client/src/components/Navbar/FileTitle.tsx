import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import ChangeNameModal from '../Modals/ChangeNameModal';

const FileTitle = () => {
  const [name, setName] = useState<string>('');
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const { renameFile, cleanRenameErrors } = useActions();

  const path = useTypedSelector((state) => {
    const intersection = state.trees.root.path.includes('\\') ? '\\' : '/';

    return `${state.trees.root.path}${intersection}`;
  });

  const onNameChanged = (filename: string) => {
    const fullPath = path + window.location.pathname.replace('/notebooks/', '');

    renameFile(fullPath, fullPath.replace(`${name}.js`, filename), () => {
      setIsShowing(false);
      window.history.pushState(
        '',
        '',
        window.location.pathname.replace(name, filename)
      );
      setName(filename);
    });
  };

  const onCancel = () => {
    setIsShowing(false);
    cleanRenameErrors();
  };

  useEffect(() => {
    setName(
      window.location.pathname.split('/').slice(-1)[0].replace('.js', '')
    );
  }, []);

  return (
    <>
      <div
        onClick={() => setIsShowing(true)}
        className="cst-navbar-item cst-is-hoverable"
        style={{ marginLeft: '64px' }}
      >
        <b
          className="subtitle"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            position: 'relative',
          }}
        >
          {name}
        </b>
      </div>
      {isShowing && (
        <ChangeNameModal
          setFilename={onNameChanged}
          onCancel={onCancel}
          tree={{ type: 'file', path, name: `${name}.js` }}
        />
      )}
    </>
  );
};

export default FileTitle;
