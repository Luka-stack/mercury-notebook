import './CellList.css';

import { Fragment } from 'react';

import { Cell } from '../../state';
import AddCell from '../AddCell/AddCell';
import Section from '../Section/Section';
import AddSection from '../AddSection/AddSection';
import CellListItem from './CellListItem/CellListItem';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Chapter } from '../../state/chapter';

const CellList: React.FC = () => {
  console.log('Rendered');

  const [cells, chapters] = useTypedSelector(({ cells }) => {
    const chapters = cells.order.map((id) => cells.chapters[id]);
    const cellsData: Map<string, Cell[]> = new Map();

    chapters.forEach((chapter) => {
      cellsData.set(
        chapter.id,
        chapter.content.map((id) => cells.data[id])
      );
    });

    return [cellsData, chapters];
  });

  const renderCells = (sectionId: string) =>
    cells.get(sectionId)?.map((cell) => (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell prevCellId={cell.id} currSection={sectionId} />
      </Fragment>
    ));

  const renderDescription = (chapter: Chapter): JSX.Element => {
    return (
      <Fragment key={chapter.description.id}>
        <CellListItem cell={chapter.description} showActions={false} />
      </Fragment>
    );
  };

  const renderedSections = chapters.map((chapter) => (
    <Fragment key={chapter.id}>
      <Section id={chapter.id} description={renderDescription(chapter)}>
        <AddCell
          forceVisible={chapter.content.length === 0}
          prevCellId={null}
          currSection={chapter.id}
        />
        {renderCells(chapter.id)}
      </Section>
      <AddSection prevSectionId={chapter.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddSection forceVisible={cells.size === 0} prevSectionId={null} />
      {renderedSections}
    </div>
  );
};

export default CellList;
