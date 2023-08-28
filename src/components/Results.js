import Card from "./Card";
import {RecipeContext} from "../context/RecipeContext";
import {useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
const Results = () => {
	const {isLoading, currentURL, setCurrentURL, handleSearchRecipe, data, setTitle} =
		useContext(RecipeContext);
	const [searchParam, setSearchParam] = useSearchParams();
	const [pageNumber, setPageNumber] = useState(1);
	const [prevURLs, setPrevURLs] = useState([]);

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
	useEffect(() => {
		setCurrentURL(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${searchParam.get(
				"q"
			)}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
		);
		handleSearchRecipe(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${searchParam.get(
				"q"
			)}&app_id=0dc9b923&app_key=%20dfe52ebe9b2a240d3ea2539ed1fb9a07`
		);
		setTitle(`Search Results: ${searchParam.get("q")}`);
		setPrevURLs("");
		setPageNumber(1);
	}, [searchParam]);
	return (
		<>
			{isLoading ? (
				<div className="loader-wrapper">
					<div className="loader"></div>
				</div>
			) : (
				data && (
					<div className="card-container clear">
						{data.hits.map((data) => {
							return <Card imgSrc={data.recipe.image} name={data.recipe.label} />;
						})}
					</div>
				)
			)}
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
		</>
	);
};
export default Results;
