import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import MaterialsIndexPage from "../MaterialsIndexPage/MaterialsIndexPage";
import Header from "../../components/Header/Header";

function App() {
	return (
		<main className="App">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/materials" element={<MaterialsIndexPage />} />
			</Routes>
		</main>
	);
}

export default App;
