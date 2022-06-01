import './Recipes.css';

export default function Recipes(props) {
  return (
    <div className="recipes">
      {props.recipes ? props.recipes.map((recipe, index) => {
          return (
            <div className="recipe-card" key={index}>
              <img className="recipe-card-img" src={`http://localhost:8080/static/images/${recipe.image}`} alt="recipe"/>
              <p className="recipe-card-title">{recipe.name}</p>
              <p>{recipe.username}</p>
            </div>
          )
      }) : ( <div>No recipes :(</div> )}
    </div>
  )
}