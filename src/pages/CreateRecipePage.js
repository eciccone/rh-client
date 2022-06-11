import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Page } from "../components/page/Page";
import RecipeForm from "../components/recipe/RecipeForm";

function CreateRecipePage() {
  return (
    <Page title="Create a recipe">
      <RecipeForm />
    </Page>
  )
}

export default withAuthenticationRequired(CreateRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});