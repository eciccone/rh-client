import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GetRecipe, PutRecipe, PutRecipeImage } from "../api/Recipe";
import { Page } from "../components/page/Page";
import RecipeForm from "../components/recipe/RecipeForm";

function EditRecipePage() {

  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState();
  const [submitError, setSubmitError] = useState(null);

  const updateRecipe = useCallback(async (id, data, imageFile) => {
    const token = await getAccessTokenSilently();
    const res = await PutRecipe(token, id, data);
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

  useEffect(() => {
    const getRecipe = async () => {

      const token = await getAccessTokenSilently();
      
      await GetRecipe(token, recipeId)
        .then(async res => {
          if (!res.ok) {
            const json = await res.json();
            const err = new Error(json.msg);
            throw err;
          }

          return res;
        })
        .then(res => res.json())
        .then(res => setRecipe(res.recipe))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    };

    getRecipe();
  }, [getAccessTokenSilently, recipeId]);

  return (
    <Page title="Edit recipe" loading={isLoading} error={error}>
      
      { submitError }

      <RecipeForm 
        editingId={recipeId} 
        editingName={recipe?.name} 
        editingIngredients={recipe?.ingredients} 
        editingSteps={recipe?.steps}
        submitCallback={updateRecipe}
      />
    </Page>
  )
}

export default withAuthenticationRequired(EditRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});