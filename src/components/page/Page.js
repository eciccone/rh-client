import './Page.css';

export const Page = ({ title = "", children }) => {
  return (
    <div className="page">
      <h1>{ title }</h1>
      { children }
    </div>
  );
};