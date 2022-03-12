import TreeControls from '../components/Hub/TreeControls';
import TreeHub from '../components/Hub/TreeHub';
import Navbar from '../components/Navbar/Navbar';

const HubLayout = () => {
  return (
    <>
      <Navbar width="90%" />
      <TreeControls />
      <TreeHub />
    </>
  );
};

export default HubLayout;
