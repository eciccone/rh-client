import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Recipes from "../components/recipe/Recipes";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import { GetRecipes } from "../api/Recipe";

function RecipesPage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const res = await GetRecipes(token);
    const json = await res.json();

    if (!res.ok) {
      if (json.msg === "profile not found") {
        navigate("/profile/new",  { state: { redirect: "/recipes" }});
      } else {
        setError(json.msg);
      }
    } else {
      setRecipes(json.recipes);
    }

    setIsLoading(false);
  }, [getAccessTokenSilently, navigate])

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (isLoading) {
    return <div>Fetching recipes...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="page">
      <h1>My Recipes</h1>
      <ButtonBar>
        <Button onClick={() => navigate("/recipes/new", { state: { redirect: "/recipes" }})}>Add Recipe</Button>
      </ButtonBar>
      <Recipes recipes={recipes} />
    </div>
  );
}

export default withAuthenticationRequired(RecipesPage, {
  onRedirecting: () => <div>Loading...</div>,
});