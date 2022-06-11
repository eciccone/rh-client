import './Page.css';

export const Page = ({ title = "", loading = false, error = null, children }) => {

  if (loading) {
    return <div className="page">Loading...</div>
  }

  if (error) {
    return <div className="page">{ error }</div>
  }

  return (
    <div className="page">

      { error && <p>{ error }</p> }

      <h1>{ title }</h1>
      
      { children }
    </div>
  );
};