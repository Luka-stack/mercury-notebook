import './CellList.css';

import { Fragment, useEffect } from 'react';

import { Cell } from '../../state';
import AddCell from '../AddCell/AddCell';
import Section from '../Section/Section';
import AddSection from '../AddSection/AddSection';
import CellListItem from './CellListItem/CellListItem';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useActions } from '../../hooks/use-actions';
import { Chapter } from '../../state/chapter';
import socket from '../../socket-connection';

const CellList: React.FC = () => {
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

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();

    socket.emit('openNotebook', {
      partialPath: window.location.pathname.replace('/notebooks', ''),
    });

    return () => {
      socket.emit('closeNotebook', {
        partialPath: window.location.pathname.replace('/notebooks', ''),
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
