import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { PostRecipe, PutRecipeImage } from "../api/Recipe";
import { Page } from "../components/page/Page";
import RecipeForm from "../components/recipe/RecipeForm";

function CreateRecipePage() {

  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const createRecipe = useCallback(async (id, data, imageFile) => {
    const token = await getAccessTokenSilently();
    const res = await PostRecipe(token, data);
    const json = await res.json();

    if (!res.ok) {
      setSubmitError(json.msg);
    } else {
      if (imageFile !== null) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        await PutRecipeImage(token, json.recipe.id, imageFormData);
      }
      navigate(`/recipes/${json.recipe.id}`);
    }
  }, [getAccessTokenSilently, navigate])

  return (
    <Page title="Create a recipe">
      { submitError }
      <RecipeForm submitCallback={createRecipe} />
    </Page>
  )
}

export default withAuthenticationRequired(CreateRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});