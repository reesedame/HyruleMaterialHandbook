import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
	return (
		<div className="home-page-container">
			<div className="title-container">
				<img
					src="./assets/GameTitle.svg"
					alt="Legend of Zelda: Breath of the Wild"
					className="game-title"
				/>
				<h1 id="app-title">Hyrule Material Handbook</h1>
			</div>
			<div className="home-page-content">
				<h3 id="welcome-header">Welcome!</h3>
				<p>
					Here you will find all of the materials you can gather in the game
					Breath of the Wild. Clicking on the show details button will reveal
					additional information about each material. You can also filter and
					sort the materials using the dropdown menu.
				</p>
				<p>
					I hope you will find this information useful as you traverse through
					the open world of Hyrule. Enjoy and good luck on your adventure!
				</p>
				<Link to="/materials">View Materials</Link>
			</div>
		</div>
	);
}

export default HomePage;
