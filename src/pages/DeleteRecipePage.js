import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import { DeleteRecipe, GetRecipe } from "../api/Recipe";
import { Page } from "../components/page/Page";

function DeleteRecipePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const res = await DeleteRecipe(token, recipeId);
    const json = await res.json();

    if (!res.ok) {
      setError(json.msg);
    } else {
      navigate("/recipes");
    }

    setIsLoading(false);
  }

  const fetchRecipe = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const res = await GetRecipe(token, recipeId);
    const json = await res.json();

    if (!res.ok) {
      setError(json.msg);
    } else {
      setRecipe(json.recipe);
    }

    setIsLoading(false);
  }, [getAccessTokenSilently, recipeId])

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <Page title={`Confirm delete ${recipe?.name}?`} loading={isLoading} error={error}>
      <ButtonBar>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={() => navigate(`/recipes/${recipeId}`)}>Cancel</Button>
      </ButtonBar>
    </Page>
  );
}

export default withAuthenticationRequired(DeleteRecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});