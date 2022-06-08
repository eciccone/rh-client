import { useNavigate } from 'react-router';
import './Recipes.css';

export default function Recipes(props) {

  const navigate = useNavigate();

  return (
    <div className="recipes">
      {props.recipes ? props.recipes.map((recipe, index) => {
          return (
            <div className="recipe-card" key={index} onClick={() => navigate(`/recipes/${recipe.id}`)}>
              <img className="recipe-card-img" src={`http://localhost:8080/static/images/${recipe.image}?${new Date()}`} alt="recipe"/>
              <p className="recipe-card-title">{recipe.name}</p>
              <p>{recipe.username}</p>
            </div>
          )
      }) : ( <div>No recipes :(</div> )}
    </div>
  )
}