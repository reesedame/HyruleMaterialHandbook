import { useState, useEffect } from "react";
import MaterialCard from "../../components/MaterialCard/MaterialCard";
import "./MaterialsIndexPage.css";
import Select from "react-select";

function MaterialsIndexPage() {
	const [materials, setMaterials] = useState([]);
	const [locations, setLocations] = useState([]);
	const [allMaterials, setAllMaterials] = useState([]);
	const [cookingEffects, setCookingEffects] = useState([]);

	const sortOptions = [
		{ value: "Alphabetical", label: "Alphabetical" },
		{
			value: "Hearts Recovered: High - Low",
			label: "Hearts Recovered: High - Low",
		},
		{
			value: "Hearts Recovered: Low - High",
			label: "Hearts Recovered: Low - High",
		},
	];

	const fetchMaterials = async () => {
		try {
			const response = await fetch(
				"https://botw-compendium.herokuapp.com/api/v2/category/materials"
			);

			// Set materials & allMaterials
			const materialDataObject = await response.json();
			const materialDataArray = materialDataObject.data;
			materialDataArray.sort((a, b) =>
				a.name > b.name ? 1 : a.name < b.name ? -1 : 0
			);
			setAllMaterials(materialDataArray);
			setMaterials(materialDataArray);

			// Set locations
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

			// Set cooking effects
			const cookingEffectsSet = new Set();
			materialDataArray.forEach((material) => {
				cookingEffectsSet.add(material.cooking_effect);
			});
			const cookingEffectsArray = [];
			cookingEffectsSet.forEach((cookingEffect) => {
				if (cookingEffect === "") {
					cookingEffectsArray.push({ value: "", label: "None" });
				} else {
					cookingEffectsArray.push({
						value: cookingEffect,
						label:
							cookingEffect.charAt(0).toUpperCase() + cookingEffect.slice(1),
					});
				}
			});
			cookingEffectsArray.sort((a, b) =>
				a.value > b.value ? 1 : a.value < b.value ? -1 : 0
			);
			cookingEffectsArray.unshift({
				value: "All",
				label: "All",
			});
			setCookingEffects(cookingEffectsArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMaterials();
	}, []);

	function handleLocationFilter(selectedLocation) {
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

	function handleCookingEffectFilter(selectedCookingEffect) {
		if (selectedCookingEffect.value === "All") {
			setMaterials(allMaterials);
		} else {
			let filteredMaterials = [];
			allMaterials.forEach((material) => {
				if (material.cooking_effect === selectedCookingEffect.value) {
					filteredMaterials.push(material);
				}
			});
			setMaterials(filteredMaterials);
		}
	}

	function handleSort(selectedSortOption) {
		if (selectedSortOption.value === "Alphabetical") {
			let sortedMaterials = [...materials];
			sortedMaterials.sort((a, b) =>
				a.name > b.name ? 1 : a.name < b.name ? -1 : 0
			);
			setMaterials(sortedMaterials);
		} else if (selectedSortOption.value === "Hearts Recovered: High - Low") {
			let sortedMaterials = [...materials];
			sortedMaterials.sort((a, b) =>
				a.hearts_recovered < b.hearts_recovered
					? 1
					: a.hearts_recovered > b.hearts_recovered
					? -1
					: 0
			);
			setMaterials(sortedMaterials);
		} else {
			let sortedMaterials = [...materials];
			sortedMaterials.sort((a, b) =>
				a.hearts_recovered > b.hearts_recovered
					? 1
					: a.hearts_recovered < b.hearts_recovered
					? -1
					: 0
			);
			setMaterials(sortedMaterials);
		}
	}

	return (
		<div className="container">
			<div className="index-sub-header">
				<h1>Materials</h1>
				<p>Filter by location: </p>
				<Select options={locations} onChange={handleLocationFilter} />
				<p>Filter by cooking effect: </p>
				<Select options={cookingEffects} onChange={handleCookingEffectFilter} />
				<p>Sort: </p>
				<Select options={sortOptions} onChange={handleSort} />
			</div>
			{materials.map((material) => {
				return <MaterialCard material={material} key={material.id} />;
			})}
		</div>
	);
}

export default MaterialsIndexPage;
