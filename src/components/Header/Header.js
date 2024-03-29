import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/materials">Materials</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Header;
