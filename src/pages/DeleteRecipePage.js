import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";

const getRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const deleteRecipe = (accessToken, recipeId) => {
  return fetch(`http://localhost:8080/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

function RecipePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const res = await deleteRecipe(token, recipeId);
    const json = await res.json();

    if (!res.ok) {
      setError(json.msg);
    } else {
      navigate("/recipes");
    }
  }

  const fetchRecipe = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const res = await getRecipe(token, recipeId);
    const json = await res.json();

    if (!res.ok) {
      setError(json.msg);
    } else {
      setRecipe(json.recipe);
    }

    setFetched(true);
  }, [getAccessTokenSilently, recipeId])

  useEffect(() => {
    if (!fetched) {
      fetchRecipe();
    }
  }, [fetched, fetchRecipe]);

  return (
    <div className="page">
      { !fetched && <p>Fetching Recipe...</p> }
      
      { error && <p>{error}</p> }

      { recipe !== null && (
        <>
          <h1>Confirm delete {recipe.name}?</h1>
          
          <ButtonBar>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => navigate(`/recipes/${recipeId}`)}>Cancel</Button>
          </ButtonBar>
        </>
      )}
    </div>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});