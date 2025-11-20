const params = new URLSearchParams(location.search)
document.addEventListener("DOMContentLoaded", () => {
	if (!params.has("id")) {
		location.href = "/"
		return
	}
	document.getElementById("transcript").src = "https://api.tomatenkuchen.com/transcript/" + params.get("id")
})
