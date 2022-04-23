interface NotFoundProps {
  error: string;
}

const NotFound: React.FC<NotFoundProps> = ({ error }) => {
  return (
    <div
      className="notification"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: 'fit-content' }}>
        <p className="title is-1">Notebook Error</p>
        <p className="subtitle is-3" style={{ color: '#8c9b9d' }}>
          {error}
        </p>
        <a href="/">Go back to main hub.</a>
      </div>
    </div>
  );
};

export default NotFound;
