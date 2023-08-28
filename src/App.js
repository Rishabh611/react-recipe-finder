import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import {RecipeContext} from "./context/RecipeContext";
import MainSearch from "./components/MainSearch";
import Results from "./components/Results";
function App() {
	const [recipeSearchTerm, setRecipeSearchTerm] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("Recipe Finder");
	const [currentURL, setCurrentURL] = useState(null);
	const [data, setData] = useState(null);
	const handleSearchRecipe = async (url) => {
		setTitle(`Search Results: ${recipeSearchTerm}`);
		setIsLoading(true);
		const response = await fetch(url);
		const result = await response.json();
		setData(result);
		setIsLoading(false);
	};
	useEffect(() => {
		document.title = title;
	}, [title]);
	const handleSearch = () => {
		setCurrentURL(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearchTerm}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
		);
		handleSearchRecipe(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearchTerm}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
		);
	};
	return (
		<RecipeContext.Provider
			value={{
				recipeSearchTerm,
				setRecipeSearchTerm,
				isLoading,
				setIsLoading,
				setTitle,
				handleSearch,
				currentURL,
				setCurrentURL,
				data,
				setData,
				handleSearchRecipe,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />}>
						<Route index element={<MainSearch />} />
						<Route path="/search" element={<Results />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</RecipeContext.Provider>
	);
}

export default App;
