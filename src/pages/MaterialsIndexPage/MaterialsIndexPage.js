import { useState, useEffect } from "react";
import MaterialCard from "../../components/MaterialCard/MaterialCard";
import "./MaterialsIndexPage.css";

function MaterialsIndexPage() {
	const [materials, setMaterials] = useState([]);

	const fetchMaterials = async () => {
		try {
			const response = await fetch(
				"https://botw-compendium.herokuapp.com/api/v2/category/materials"
			);
			const materialDataObject = await response.json();
			const materialDataArray = materialDataObject.data;
			setMaterials(materialDataArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMaterials();
	}, []);

	return (
		<div className="container">
			<h1>Materials</h1>
			{materials.map((material) => {
				return <MaterialCard material={material} />;
			})}
		</div>
	);
}

export default MaterialsIndexPage;
