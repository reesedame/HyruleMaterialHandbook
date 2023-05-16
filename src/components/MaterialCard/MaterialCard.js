import "./MaterialCard.css";
import { useState } from "react";
// import HeartContainers from "../HeartContainers/HeartContainers";

function MaterialCard({ material }) {
	const [detailsHidden, setDetailsHidden] = useState(true);

	return (
		<>
			{detailsHidden ? (
				<div className="details-hidden">
					<h4>{material.name.toUpperCase()}</h4>
					<button onClick={() => setDetailsHidden(!detailsHidden)}>
						Show Details
					</button>
					<img src={material.image} alt={material.name} />
				</div>
			) : (
				<>
					<div className="details-shown">
						<h4>{material.name.toUpperCase()}</h4>
						<button onClick={() => setDetailsHidden(!detailsHidden)}>
							Hide Details
						</button>
						<img src={material.image} alt={material.name} />
						<ul>
							<li>
								<p>
									<strong>Common Locations</strong>
								</p>
								{material.common_locations.map((location, index) => {
									return <p>{location}</p>;
								})}
							</li>
							<li>
								<p>
									<strong>Hearts Recovered</strong>
								</p>
								<p>{material.hearts_recovered}</p>
							</li>
							<li>
								<p>
									<strong>Cooking Effect</strong>
								</p>
								<p>
									{material.cooking_effect.charAt(0).toUpperCase() +
										material.cooking_effect.slice(1)}
								</p>
							</li>
							<li>
								<p>
									<strong>Description</strong>
								</p>
								<p>{material.description}</p>
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
}

export default MaterialCard;
