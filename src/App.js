import {useEffect, useState} from "react";
function App() {
	const [recipeSearchTerm, setRecipeSearchTerm] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [prevURLs, setPrevURLs] = useState([]);
	const [currentURL, setCurrentURL] = useState(null);
	const [title, setTitle] = useState("Recipe Finder");
	useEffect(() => {
		document.title = title;
	}, [title]);
	console.log(prevURLs);
	const handleSearchRecipe = async (url) => {
		setTitle(`Search Results: ${recipeSearchTerm}`);
		setIsLoading(true);
		const response = await fetch(url);
		const result = await response.json();
		setData(result);
		setIsLoading(false);
	};
	const handleNext = () => {
		if (pageNumber > prevURLs.length) {
			setPrevURLs(prevURLs.concat(currentURL));
		}
		setPageNumber(pageNumber + 1);
		setCurrentURL(data._links.next.href);
		handleSearchRecipe(data._links.next.href);
	};
	const handlePrev = () => {
		setPageNumber(pageNumber - 1);
		setCurrentURL(prevURLs[pageNumber - 2]);
		handleSearchRecipe(prevURLs[pageNumber - 2]);
	};
	return (
		<div>
			<div className="logo-wrapper">
				<img src="/recipe-finder-logo.png" alt="Recipe finder logo" className="logo" />
			</div>
			<Search
				searchTerm={recipeSearchTerm}
				setSearchTerm={setRecipeSearchTerm}
				handleSearchRecipe={handleSearchRecipe}
				currentURL={currentURL}
				setCurrentURL={setCurrentURL}
			/>
			{data && <Results data={data} isLoading={isLoading} />}
			{data && (
				<div className="btn-wrapper">
					<button
						className="btn-prev"
						style={{visibility: pageNumber === 1 ? "hidden" : "visible"}}
						onClick={handlePrev}
					>
						Previous
					</button>
					<p>
						{pageNumber} of {Math.floor(Number(data.count) / 20)}
					</p>
					<button className="btn-next" onClick={handleNext}>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
const Search = ({searchTerm, setSearchTerm, handleSearchRecipe, currentURL, setCurrentURL}) => {
	return (
		<div className="main-search-input">
			<div className="main-search-input-item-wrap">
				<div className="main-search-input-item">
					<input
						type="text"
						value={searchTerm}
						placeholder="Search Recipes..."
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>
				</div>

				<button
					className="main-search-button"
					onClick={() => {
						setCurrentURL(
							`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
						);
						handleSearchRecipe(
							`https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
						);
					}}
				>
					Search
				</button>
			</div>
		</div>
	);
};
const Results = ({data, isLoading}) => {
	return (
		<>
			{isLoading ? (
				<div className="loader-wrapper">
					<div className="loader"></div>
				</div>
			) : (
				<div className="card-container clear">
					{data.hits.map((data) => {
						return <Card imgSrc={data.recipe.image} name={data.recipe.label} />;
					})}
				</div>
			)}
		</>
	);
};
const Card = ({imgSrc, name}) => {
	return (
		<div className="card">
			<img src={imgSrc} alt={name} />
			<button className="btn-recipe">{name}</button>
		</div>
	);
};
export default App;
