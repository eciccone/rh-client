import "./Page.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Recipes from "../components/recipe/Recipes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ButtonBar } from "../components/btn/ButtonBar";
import { Button } from "../components/btn/Button";
import { GetRecipes } from "../api/Recipe";

function RecipesPage() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  // if 404 on a request to /recipes then a profile has not yet been made with recihub.
  const check404 = res => {
    if (res.ok) {
      return res;
    } else {
      const err = new Error(404);
      err.nav = "/";
      throw err;
    }
  }

  useEffect(() => {
    const getRecipes = async () => {
      const token = await getAccessTokenSilently();
      await GetRecipes(token)
        .then(res => check404(res))
        .then(res => res.json())
        .then(res => setRecipes(res.recipes))
        .catch(err => navigate(err.nav))
        .finally(() => setIsLoading(false));
    };

    getRecipes();
  }, [getAccessTokenSilently, navigate]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="page">
      <h1>My Recipes</h1>
      <ButtonBar>
        <Button onClick={() => navigate("/recipes/new")}>Add Recipe</Button>
      </ButtonBar>
      <Recipes recipes={recipes} />
    </div>
  );
}

export default withAuthenticationRequired(RecipesPage, {
  onRedirecting: () => <div>Loading...</div>,
});