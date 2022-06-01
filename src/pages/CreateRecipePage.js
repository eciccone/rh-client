import { withAuthenticationRequired } from "@auth0/auth0-react";
import RecipeForm from "../components/recipe/RecipeForm";

function CreateRecipePage() {
  return (
    <div className="page">
      <h1>Create a recipe</h1>
      <RecipeForm />
    </div>
  )
}

export default withAuthenticationRequired(CreateRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});