const NotFound = () => {
  return (
    <div
      className="notification"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: 'fit-content' }}>
        <p className="title is-1">Not Found</p>
        <p className="subtitle is-3" style={{ color: '#8c9b9d' }}>
          Page not found. Go back to hub
        </p>
      </div>
    </div>
  );
};

export default NotFound;
