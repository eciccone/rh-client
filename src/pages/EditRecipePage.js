import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetRecipe } from "../api/Recipe";
import RecipeForm from "../components/recipe/RecipeForm";

function EditRecipePage() {

  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState();

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
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="page">
      <h1>Edit a recipe</h1>
      <RecipeForm editingId={recipeId} editingName={recipe.name} editingIngredients={recipe.ingredients} editingSteps={recipe.steps} />
    </div>
  )
}

export default withAuthenticationRequired(EditRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});