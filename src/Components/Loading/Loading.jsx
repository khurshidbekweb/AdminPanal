import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loader">
        <div className="loader-circle"></div>
        <span className="loader-text">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
