import { Link } from "react-router-dom";

function HomePage() {
	return (
		<>
			<h1>Home Page</h1>
			<Link to="/materials">View Materials</Link>
		</>
	);
}

export default HomePage;
