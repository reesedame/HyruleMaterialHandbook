import "./MaterialCard.css";
import { useState } from "react";

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
					<div key={material.id} className="details-shown">
						<div>
							<h4>{material.name.toUpperCase()}</h4>
							<button onClick={() => setDetailsHidden(!detailsHidden)}>
								Hide Details
							</button>
						</div>
						<img src={material.image} alt={material.name} />
						<ul>
							<li>
								<p>
									<strong>Common Locations</strong>
								</p>
								<p>{material.common_locations}</p>
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
								<p>{material.cooking_effect}</p>
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
