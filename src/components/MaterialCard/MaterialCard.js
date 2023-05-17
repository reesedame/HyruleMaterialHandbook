import "./MaterialCard.css";
import { useState } from "react";
// import HeartContainers from "../HeartContainers/HeartContainers";

function MaterialCard({ material }) {
	const [detailsHidden, setDetailsHidden] = useState(true);

	return (
		<>
			{detailsHidden ? (
				<div className="details-hidden">
					<h2 className="material-name">{material.name.toUpperCase()}</h2>
					<button onClick={() => setDetailsHidden(!detailsHidden)}>
						Show Details
					</button>
					<img src={material.image} alt={material.name} />
				</div>
			) : (
				<>
					<div className="details-shown">
						<h2 className="material-name">{material.name.toUpperCase()}</h2>
						<button onClick={() => setDetailsHidden(!detailsHidden)}>
							Hide Details
						</button>
						{/* <img src={material.image} alt={material.name} /> */}
						<div className="detail-contents">
							<ul>
								<li>
									<p>
										<strong>
											<u>Common Locations</u>
										</strong>
									</p>
									{material.common_locations.map((location, index) => {
										return <p key={index}>{location}</p>;
									})}
								</li>
								<li>
									<p>
										<strong>
											<u>Hearts Recovered</u>
										</strong>
									</p>
									<p>{material.hearts_recovered}</p>
								</li>
								<li>
									<p>
										<strong>
											<u>Cooking Effect</u>
										</strong>
									</p>
									<p>
										{material.cooking_effect === ""
											? "None"
											: material.cooking_effect.charAt(0).toUpperCase() +
											  material.cooking_effect.slice(1)}
									</p>
								</li>
								<li>
									<p>
										<strong>
											<u>Description</u>
										</strong>
									</p>
									<p>{material.description}</p>
								</li>
							</ul>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default MaterialCard;
