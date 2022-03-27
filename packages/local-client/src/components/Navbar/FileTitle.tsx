import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import ChangeNameModal from '../Modals/ChangeNameModal';

const FileTitle = () => {
  const [name, setName] = useState<string>('');
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const path = useTypedSelector((state) => {
    const intersection = state.trees.root.path.includes('\\') ? '\\' : '/';

    return `${
      state.trees.root.path
    }${intersection}${window.location.pathname.replace('/notebooks/', '')}`;
  });

  const onNameChanged = (filename: string) => {
    setIsShowing(false);
    window.history.pushState(
      '',
      '',
      window.location.pathname.replace(name, filename)
    );
    setName(filename);
  };

  const onCancel = () => {
    setIsShowing(false);
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
          onSuccess={onNameChanged}
          onCancel={onCancel}
          tree={{ type: 'file', path, name: `${name}.js` }}
        />
      )}
    </>
  );
};

export default FileTitle;
