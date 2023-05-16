import { useState, useEffect } from "react";
import MaterialCard from "../../components/MaterialCard/MaterialCard";
import "./MaterialsIndexPage.css";
import Select from "react-select";

function MaterialsIndexPage() {
	const [materials, setMaterials] = useState([]);
	const [locations, setLocations] = useState([]);
	const [allMaterials, setAllMaterials] = useState([]);

	const fetchMaterials = async () => {
		try {
			const response = await fetch(
				"https://botw-compendium.herokuapp.com/api/v2/category/materials"
			);

			const materialDataObject = await response.json();
			const materialDataArray = materialDataObject.data;
			materialDataArray.sort((a, b) =>
				a.name > b.name ? 1 : a.name < b.name ? -1 : 0
			);
			setAllMaterials(materialDataArray);
			setMaterials(materialDataArray);

			const locationsSet = new Set();
			materialDataArray.forEach((material) => {
				material.common_locations.forEach((location) => {
					locationsSet.add(location);
				});
			});
			const locationsArray = [];
			locationsSet.forEach((location) => {
				locationsArray.push({ value: location, label: location });
			});
			locationsArray.sort((a, b) =>
				a.value > b.value ? 1 : a.value < b.value ? -1 : 0
			);
			locationsArray.unshift({
				value: "All Locations",
				label: "All Locations",
			});
			setLocations(locationsArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMaterials();
	}, []);

	function handleFilter(selectedLocation) {
		if (selectedLocation.value === "All Locations") {
			setMaterials(allMaterials);
		} else {
			let filteredMaterials = [];
			allMaterials.forEach((material) => {
				if (material.common_locations.includes(selectedLocation.value)) {
					filteredMaterials.push(material);
				}
			});
			setMaterials(filteredMaterials);
		}
	}

	return (
		<div className="container">
			<h1>Materials</h1>
			<Select options={locations} onChange={handleFilter} />
			{materials.map((material) => {
				return <MaterialCard material={material} key={material.id} />;
			})}
		</div>
	);
}

export default MaterialsIndexPage;
