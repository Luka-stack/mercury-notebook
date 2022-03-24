import { useActions } from '../../../hooks/use-actions';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import DropdownItem from './DropdownItem';

const OptionsDropdown = () => {
  const { autoCompile, autoSave } = useTypedSelector((state) => state.cells);

  const { toggleAutoCompile, toggleAutoSave } = useActions();

  return (
    <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
      <b className="cst-navbar-link">Options</b>

      <div className="cst-navbar-dropdown">
        <DropdownItem
          label={`${autoSave ? 'Disable' : 'Enable'} auto save`}
          desc="Disable/Enable auto saving file"
          onClick={toggleAutoSave}
          active={autoSave}
        />
        <DropdownItem
          label={`${autoCompile ? ' Disable' : 'Enable'} Auto compile`}
          desc="Disable/Enable auto compiling"
          onClick={toggleAutoCompile}
          active={autoCompile}
        />
        <DropdownItem
          label="Shortcuts"
          desc="List of all shortcuts"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default OptionsDropdown;
