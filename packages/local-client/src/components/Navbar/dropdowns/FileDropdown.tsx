import DropdownItem from './DropdownItem';

const FileDropdown = () => {
  return (
    <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
      <b className="cst-navbar-link">File</b>
      <div className="cst-navbar-dropdown">
        <DropdownItem label="Save" onClick={() => {}} />
        <DropdownItem label="Save as" onClick={() => {}} />
        <DropdownItem
          label="Open"
          desc="Open note in new a tab"
          onClick={() => {}}
        />
        <DropdownItem
          label="Load"
          desc="Load note into current tab"
          onClick={() => {}}
        />
        <DropdownItem
          label="New Note"
          desc="Open new note"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default FileDropdown;
