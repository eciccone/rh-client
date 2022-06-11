import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import { GetRecipe } from "../api/Recipe";
import { Page } from "../components/page/Page";
import { Recipe } from "../components/recipe/Recipe";

function RecipePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = useCallback(async () => {
    setIsLoading(true);

    const token = await getAccessTokenSilently();
    const res = await GetRecipe(token, recipeId);
    const json = await res.json();

    if (!res.ok) {
      setError(json.msg);
    } else {
      setRecipe(json.recipe);
    }

    setIsLoading(false);
  }, [getAccessTokenSilently, recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <Page title={recipe?.name} loading={isLoading} error={error}>
      <ButtonBar>
        <Button onClick={() => navigate(`/recipes/${recipeId}/edit`, { state: { redirect: `/recipes/${recipeId}` }})}>Edit</Button>
        <Button onClick={() => navigate(`/recipes/${recipeId}/delete`, { state: { redirect: `/recipes` }})}>Delete</Button>
      </ButtonBar>
      <Recipe recipe={recipe} />
    </Page>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});