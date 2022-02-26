import './AddSection.css';

import { useActions } from '../../hooks/use-actions';

interface AddSectionProps {
  prevSectionId: string | null;
  forceVisible?: boolean;
}

const AddSection: React.FC<AddSectionProps> = ({
  prevSectionId,
  forceVisible,
}) => {
  const { insertChapterAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertChapterAfter(prevSectionId)}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Section</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddSection;
