import {useContext} from "react";
import {RecipeContext} from "../context/RecipeContext";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
function Navbar() {
	const navigate = useNavigate();
	const {recipeSearchTerm, setRecipeSearchTerm} = useContext(RecipeContext);
	return (
		<nav className="nav">
			<div className="nav-logo-wrapper">
				<Link to="/">
					<img
						src={process.env.PUBLIC_URL + "/recipe-finder-logo.png"}
						alt="logo"
						className="nav-logo"
					/>
				</Link>
			</div>
			<div className="nav-search">
				<input
					value={recipeSearchTerm}
					onChange={(e) => {
						setRecipeSearchTerm(e.target.value);
					}}
				/>
				<button onClick={() => navigate(`/search?q=${recipeSearchTerm}`)}>Search</button>
			</div>
		</nav>
	);
}

export default Navbar;
