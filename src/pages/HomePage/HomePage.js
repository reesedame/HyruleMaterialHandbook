import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
	return (
		<div className="home-page-container">
			<div className="title">
				<h1>Hyrule Material Handbook</h1>
				<h2> for Legend of Zelda: Breath of the Wild</h2>
			</div>
			<div className="home-page-content">
				<h3 id="welcome-header">Welcome!</h3>
				<p>
					Here you will find all of the materials featured in the game Breath of
					the Wild. Clicking on the show details button will reveal additional
					information about each material such as common locations, how many
					hearts it will give you, and what effects it has after cooking. I hope
					you will find this information useful as you traverse through the open
					world game. Enjoy and good luck on your adventure!
				</p>
				<Link to="/materials">View Materials</Link>
			</div>
		</div>
	);
}

export default HomePage;
