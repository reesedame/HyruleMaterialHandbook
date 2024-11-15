import { useState, useEffect } from "react";
import MaterialCard from "../../components/MaterialCard/MaterialCard";
import "./MaterialsIndexPage.css";
import Select from "react-select";

function MaterialsIndexPage() {
	const [allMaterials, setAllMaterials] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [locations, setLocations] = useState([]);
	const [cookingEffects, setCookingEffects] = useState([]);
	const [locationFilteredMaterials, setLocationFilteredMaterials] = useState(
		[]
	);
	const [cookingEffectFilteredMaterials, setCookingEffectFilteredMaterials] =
		useState([]);

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
				"https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials"
			);

			// Set materials & allMaterials
			const materialDataObject = await response.json();
			const materialDataArray = materialDataObject.data;
			// API returns materials in a random order, so the array is sorted to give users a consistent experience
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
			// This array of unique locations is used for the options of the filter by location feature
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
			// This array of unique cooking effects is used for the options of the filter by cokking effect feature
			setCookingEffects(cookingEffectsArray);
		} catch (error) {
			return (
				<>
					<h1>Something went wrong!</h1>
					<h2>Please try again later...</h2>
				</>
			);
		}
	};

	useEffect(() => {
		fetchMaterials();
	}, []);

	// allMaterials array is filtered based on the selectedLocation, generating a filtered array
	// If a cooking effect filter has been applied, the newly generated filtered array is compared to the cooking effect filtered array
	// Materials that are in the location filtered array AND the cooking effect filtered array are included in the new array doubleFilteredMaterials
	function handleLocationFilter(selectedLocation) {
		let filteredMaterials = [];
		if (selectedLocation.value === "All Locations") {
			filteredMaterials = allMaterials;
			setLocationFilteredMaterials([]);
		} else {
			allMaterials.forEach((material) => {
				if (material.common_locations.includes(selectedLocation.value)) {
					filteredMaterials.push(material);
				}
			});
			setLocationFilteredMaterials(filteredMaterials);
		}
		if (cookingEffectFilteredMaterials.length === 0) {
			setMaterials(filteredMaterials);
		} else {
			const doubleFilteredMaterials = filteredMaterials.filter((material) =>
				cookingEffectFilteredMaterials.includes(material)
			);
			setMaterials(doubleFilteredMaterials);
		}
	}

	// allMaterials array is filtered based on the selectedCookingEffect, generating a filtered array
	// If a location filter has been applied, the newly generated filtered array is compared to the location filtered array
	// Materials that are in the location filtered array AND the cooking effect filtered array are included in the new array doubleFilteredMaterials
	function handleCookingEffectFilter(selectedCookingEffect) {
		let filteredMaterials = [];
		if (selectedCookingEffect.value === "All") {
			filteredMaterials = allMaterials;
			setCookingEffectFilteredMaterials([]);
		} else {
			allMaterials.forEach((material) => {
				if (material.cooking_effect === selectedCookingEffect.value) {
					filteredMaterials.push(material);
				}
			});
			setCookingEffectFilteredMaterials(filteredMaterials);
		}
		if (locationFilteredMaterials.length === 0) {
			setMaterials(filteredMaterials);
		} else {
			const doubleFilteredMaterials = filteredMaterials.filter((material) =>
				locationFilteredMaterials.includes(material)
			);
			setMaterials(doubleFilteredMaterials);
		}
	}

	// allMaterials is sorted based upon the selectedSortOption
	// The resulting sorted materials are then compared to the current materials (ie re-filtered) to ensure the filtering persists
	function handleSort(selectedSortOption) {
		let sortedMaterials = [...allMaterials];
		if (selectedSortOption.value === "Alphabetical") {
			sortedMaterials.sort((a, b) =>
				a.name > b.name ? 1 : a.name < b.name ? -1 : 0
			);
		} else if (selectedSortOption.value === "Hearts Recovered: High - Low") {
			sortedMaterials.sort((a, b) =>
				a.hearts_recovered < b.hearts_recovered
					? 1
					: a.hearts_recovered > b.hearts_recovered
					? -1
					: 0
			);
		} else {
			sortedMaterials.sort((a, b) =>
				a.hearts_recovered > b.hearts_recovered
					? 1
					: a.hearts_recovered < b.hearts_recovered
					? -1
					: 0
			);
		}
		setAllMaterials(sortedMaterials);
		const reFilteredMaterials = sortedMaterials.filter((material) =>
			materials.includes(material)
		);
		setMaterials(reFilteredMaterials);
	}

	return (
		<>
			<div className="index-sub-header">
				<div className="selector">
					<p>
						<i className="fa-solid fa-heart"></i> <strong> Sort:</strong>
					</p>
					<Select options={sortOptions} onChange={handleSort} />
				</div>
				<div className="selector">
					<p>
						<i className="fa-solid fa-map"></i>
						<strong> Filter by location:</strong>
					</p>
					<Select options={locations} onChange={handleLocationFilter} />
				</div>
				<div className="selector">
					<p>
						<i className="fa-solid fa-utensils"></i>
						<strong> Filter by cooking effect:</strong>
					</p>
					<Select
						options={cookingEffects}
						onChange={handleCookingEffectFilter}
					/>
				</div>
			</div>
			<div className="container">
				{materials.map((material) => {
					return <MaterialCard material={material} key={material.id} />;
				})}
			</div>
		</>
	);
}

export default MaterialsIndexPage;
