function MaterialCard({ material }) {
	return (
		<>
			<p key={material.id}>{material.name}</p>
		</>
	);
}

export default MaterialCard;
