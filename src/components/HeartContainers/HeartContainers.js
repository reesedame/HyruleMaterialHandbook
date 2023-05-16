function HeartContainers({ numHearts }) {
	if (numHearts === 0) {
		return (
			<>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-heart"></i>
			</>
		);
	} else if (numHearts === 0.5) {
		return (
			<>
				<i class="fa-solid fa-heart-half-stroke"></i>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-heart"></i>
			</>
		);
	} else {
		return <p>{numHearts}</p>;
	}
}

export default HeartContainers;
