import { Link } from "react-router-dom";

function Header() {
	return (
		<nav>
			<Link to="/">Home</Link>
			&nbsp; | &nbsp;
			<Link to="/materials">Materials</Link>
		</nav>
	);
}

export default Header;
