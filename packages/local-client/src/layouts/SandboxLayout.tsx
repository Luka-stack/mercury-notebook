import CellList from '../components/CellList/CellList';
import FileDropdown from '../components/Navbar/dropdowns/FileDropdown';
import OptionsDropdown from '../components/Navbar/dropdowns/OptionsDropdown';
import Navbar from '../components/Navbar/Navbar';

const SandboxLayout = () => {
  return (
    <div>
      <Navbar width="100%">
        <FileDropdown />
        <OptionsDropdown />
      </Navbar>
      <CellList />
    </div>
  );
};

export default SandboxLayout;
