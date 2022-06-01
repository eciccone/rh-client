import "./Page.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function RecipePage() {
  return (
    <div className="page">
      <h1>My Recipes</h1>

    </div>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});