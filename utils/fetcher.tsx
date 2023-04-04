export async function fetcher(url: any, data: any, setPopUp: any = undefined) {
	if (setPopUp) {
		setPopUp({
			typeButton: false,
			loader: true,
			show: true,
		})
	}

	const r = await fetch(window.location.origin + url, {
		method: data ? "POST" : "GET",
		// credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		// body: JSON.parse(data),
	})
	if (setPopUp) {
		setPopUp({
			typeButton: false,
			loader: false,
			type: "info",
			show: false,
		})
	}

	return r.json()
}
