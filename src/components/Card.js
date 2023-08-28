const Card = ({imgSrc, name}) => {
	return (
		<div className="card">
			<img src={imgSrc} alt={name} />
			<button className="btn-recipe">{name}</button>
		</div>
	);
};
export default Card;
