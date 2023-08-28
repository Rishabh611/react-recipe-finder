import {RecipeContext} from "../context/RecipeContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
const Search = () => {
	const {recipeSearchTerm, setRecipeSearchTerm} = useContext(RecipeContext);

	const navigate = useNavigate();
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			navigate(`/search?q=${recipeSearchTerm}`);
		}
	};
	return (
		<div className="main-search-input">
			<div className="main-search-input-item-wrap">
				<div className="main-search-input-item">
					<input
						type="text"
						value={recipeSearchTerm}
						placeholder="Search Recipes..."
						onChange={(e) => {
							setRecipeSearchTerm(e.target.value);
						}}
						onKeyDown={handleKeyDown}
					/>
				</div>

				<button
					className="main-search-button"
					onClick={() => {
						navigate(`/search?q=${recipeSearchTerm}`);
					}}
				>
					Search
				</button>
			</div>
		</div>
	);
};
export default Search;
