import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Recipes from "../components/recipe/Recipes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import { GetRecipe, GetRecipes } from "../api/Recipe";

function RecipePage() {
  
  const { getAccessTokenSilently } = useAuth0();
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
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
      <h1>{recipe.name}</h1>

      <ButtonBar>
        <Button onClick={() => navigate(`/recipes/${recipeId}/edit`, { state: { redirect: `/recipes/${recipeId}` }})}>Edit</Button>
      </ButtonBar>

      <p>{recipe.username}</p>
      <img src={`http://localhost:8080/static/images/${recipe.image}?time=${new Date()}`} style={{width: "300px"}} />

      <h2>Ingredients:</h2>

      {recipe.ingredients.map((ing, index) => {
        return (
        <div key={index}>
          {ing.amount} {ing.unit} {ing.name}
        </div>
        )
      })}

    </div>
  );
}

export default withAuthenticationRequired(RecipePage, {
  onRedirecting: () => <div>Loading...</div>,
});