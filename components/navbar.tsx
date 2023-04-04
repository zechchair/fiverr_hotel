export default function Navbar(props) {
	return (
		<ul className="flex shadow z-10 border-b max-w-screen overflow-x-auto overflow-y-hidden rounded">
			{props.labelsFilter.map((elem, index) => (
				<li className={props.filter.selectedType.name == elem.name ? "-mb-px" : null} key={index}>
					<button
						type="button"
						className={
							props.filter.selectedType.name == elem.name
								? " bg-opacity-50 truncate bg-purple-50 inline-block border-l border-t border-r shadow-inner rounded-t py-2 px-8 text-blue-700 font-semibold md:text-sm text-xs"
								: " truncate bg-opacity-50 bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold md:text-sm text-xs"
						}
						// href="#"
						onClick={() => props.onClick(elem)}
					>
						{elem.name}
					</button>
				</li>
			))}
		</ul>
	)
}
