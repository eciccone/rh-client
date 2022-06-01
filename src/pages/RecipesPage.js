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
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getRecipes = async () => {
      const token = await getAccessTokenSilently();
      await GetRecipes(token)
        .then(async res => {
          if (res.ok) return res;

          const json = await res.json();
          const err = new Error(json.msg);
          throw err;
        })
        .then(res => res.json())
        .then(json => setRecipes(json.recipes))
        .catch(err => {
          if (err.message === "profile not found") {
            navigate("/");
          } else {
            setError(err.message);
          }
        })
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

      {error}
      
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