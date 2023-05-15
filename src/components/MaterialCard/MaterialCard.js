import "./MaterialCard.css";
import { useState } from "react";

function MaterialCard({ material }) {
	const [detailsHidden, setDetailsHidden] = useState(true);

	return (
		<>
			{detailsHidden ? (
				<>
					<div key={material.id} className="material-card">
						<h4>{material.name.toUpperCase()}</h4>
						<button onClick={() => setDetailsHidden(!detailsHidden)}>
							Show Details
						</button>
						<img src={material.image} alt={material.name} />
					</div>
				</>
			) : (
				<>
					<div key={material.id} className="material-card">
						<h4>{material.name.toUpperCase()}</h4>
						<button onClick={() => setDetailsHidden(!detailsHidden)}>
							Hide Details
						</button>
						<ul>
							<li>Common Locations: {material.common_locations}</li>
							<li>Hearts Recovered: {material.hearts_recovered}</li>
							<li>Cooking Effect: {material.cooking_effect}</li>
							<li>Description: {material.description}</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
}

export default MaterialCard;
