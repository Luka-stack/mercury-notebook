import { useState } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import ShortcutsModal from '../../Modals/ShortcutsModal';
import DropdownItem from './DropdownItem';

const OptionsDropdown = () => {
  const [shortcutsInfo, setShortcutsInfo] = useState<boolean>(false);

  const { autoCompile, autoSave } = useTypedSelector((state) => state.cells);

  const { toggleAutoCompile, toggleAutoSave } = useActions();

  return (
    <>
      <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
        <b className="cst-navbar-link">Options</b>

        <div className="cst-navbar-dropdown">
          <DropdownItem
            label={`${autoSave ? 'Disable' : 'Enable'} auto save`}
            desc="Disable/Enable auto saving file after change"
            onClick={() => toggleAutoSave(!autoSave)}
            active={autoSave}
          />
          <DropdownItem
            label={`${autoCompile ? ' Disable' : 'Enable'} Auto compile`}
            desc="Disable/Enable auto compiling"
            onClick={toggleAutoCompile}
            active={autoCompile}
          />
          <hr className="dropdown-divider" />
          <DropdownItem
            label="Shortcuts"
            desc="List of all shortcuts"
            onClick={() => {
              setShortcutsInfo(true);
            }}
          />
        </div>
      </div>
      {shortcutsInfo && (
        <ShortcutsModal
          onCancel={() => {
            setShortcutsInfo(false);
          }}
        />
      )}
    </>
  );
};

export default OptionsDropdown;
