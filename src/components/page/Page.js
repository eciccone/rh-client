import './Page.css';

export const Page = ({ title = "", loading = false, error = null, children }) => {

  if (error) {
    return <div className="page">{ error }</div>
  }

  if (loading) {
    return <div className="page">Loading...</div>
  }

  return (
    <div className="page">
      <h1>{ title }</h1>
      
      { children }
    </div>
  );
};