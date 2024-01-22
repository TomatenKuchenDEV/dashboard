const documentCopy = document
let documentBody = null
let documentGetElementById = null
const locationCopy = location

const url = "https://api.tomatenkuchen.com/api/"
async function get(component, auth = true, method = "GET", body = null) {
	const res = await fetch(url + component + (auth && getCookie("token") ? (component.includes("?") ? "&" : "?") + "token=" + getCookie("token") : ""), {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		body: body ? JSON.stringify(body) : null
	})

	const json = await res.json()
	console.log("Response for \"" + url + component + "\": " + JSON.stringify(json))
	return json
}

function setCookie(name, value = "", days, global = false) {
	if ((!getCookie("cookie-dismiss") || getCookie("cookie-dismiss") == 1) && name != "token" && name != "user" && name != "cookie-dismiss") return

	let cookie = name + "=" + value + ";path=/;Secure;"
	if (days) cookie += "expires=" + new Date(Date.now() + 1000 * 60 * 60 * 24 * days).toUTCString() + ";"
	if (global && locationCopy.host != "localhost:4269") cookie += "domain=.tomatenkuchen.com;"

	documentCopy.cookie = cookie
}
function getCookie(name) {
	for (const rawCookie of documentCopy.cookie.split(";")) {
		const cookie = rawCookie.trim()
		if (cookie.split("=")[0] == name) return cookie.substring(name.length + 1, cookie.length)
	}
	return void 0
}
function deleteCookie(name) {
	documentCopy.cookie = name + "=;Max-Age=-99999999;path=/;"
	documentCopy.cookie = name + "=;Max-Age=-99999999;path=/;domain=.tomatenkuchen.com;"
}

let loadFunc = () => {}
const encode = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
const assertInt = int => {
	if (typeof int == "number") return int
	throw new Error("Not an integer: " + int)
}

const handleError = error => {
	if (typeof error != "string") console.error(error)
	return "<h1>An error occured while handling your request:</h1>" +
		"<h2>" + (typeof error == "string" ? error : error.toString()) + "</h2>" +
		(typeof error == "string" ? "" : "<h3>Check your browser console to find out more!</h3>")
}

class Footer extends HTMLElement {
	constructor() {
		super()
	}
	connectedCallback() {
		this.innerHTML =
			"<noscript><h1>This website doesn't work without JavaScript.</h1></noscript>" +
			"<footer>" +
			"<a href='/'>" +
			"<div id='mainlink'>" +
				"<img src='/assets/images/background_64.webp' fetchpriority='low' width='64' height='64' alt='TomatenKuchen Logo'>" +
				"<span>TomatenKuchen</span>" +
			"</div>" +
			"</a>" +
			"<div class='links'>" +
				//"<a href='/custom'><ion-icon name='diamond-outline'></ion-icon>Custom bots</a>" +
				"<a href='/invite'><ion-icon name='add-outline'></ion-icon>Invite bot</a>" +
				"<a href='https://docs.tomatenkuchen.com' target='_blank' rel='noopener'><ion-icon name='help-outline'></ion-icon>Docs</a>" +
				"<a href='/discord' target='_blank' rel='noopener'><ion-icon name='headset-outline'></ion-icon>Support server</a>" +
				"<a href='/credits'><ion-icon name='people-outline'></ion-icon>Credits</a>" +
				"<a href='/privacy'><ion-icon name='reader-outline'></ion-icon>Privacy & ToS</a>" +
				"<a href='/legal'><ion-icon name='receipt-outline'></ion-icon>Legal Notice</a>" +
			"</div>" +
			"</footer>"
	}
}
customElements.define("global-footer", Footer)

class Sidebar extends HTMLElement {
	static observedAttributes = ["page", "dashboard", "user", "guild"]

	constructor() {
		super()
	}
	attributeChangedCallback() {
		const guild = this.hasAttribute("guild") ? encode(this.getAttribute("guild")) : void 0
		const dashboard = this.getAttribute("dashboard")
		const user = this.getAttribute("user")

		this.innerHTML =
			"<div class='sidebar-container " + (screen.width > 600 ? "visible" : "") + "' id='sidebar-container'>" +
			"<nav class='sidebar' id='sidebar'>" +
				"<div class='hamburger' onclick='sidebar()'>" +
					"<div class='line' id='lineTop2'></div>" +
					"<div class='line' id='lineBottom2'></div>" +
				"</div>" +

				"<button type='button' onclick='location = \"/invite\"' translation='sidebar.invite'></button>" +

				"<div id='linksidebar' class='section'>" +
					"<a href='/' title='Home' class='tab" + (this.getAttribute("page") == "main" ? " active' data-no-instant" : "'") + ">" +
						"<ion-icon name='home-outline'></ion-icon>" +
						"<p translation='sidebar.home'></p>" +
					"</a>" +
					"<a href='/commands' title='Bot commands' class='tab" + (this.getAttribute("page") == "commands" ? " active' data-no-instant" : "'") + ">" +
						"<ion-icon name='terminal-outline'></ion-icon>" +
						"<p translation='sidebar.commands'></p>" +
					"</a>" +
					"<a href='/dashboard' class='tab" + (dashboard || this.getAttribute("page") == "dashboard" ? " active' data-no-instant" : "'") + ">" +
						"<ion-icon name='settings-outline'></ion-icon>" +
						"<p translation='sidebar.dashboard'></p>" +
					"</a>" +
					(user ?
						"<div class='section middle'><p class='title'>User profile</p>" +
						"<a class='tab otherlinks" + (user == "user" ? " active" : "") + "' href='/user'><ion-icon name='thumbs-up-outline'></ion-icon><p>Votes</p></a>" +
						//"<a class='tab otherlinks" + (user == "custom" ? " active" : "") + "' href='/dashboard/custom'><ion-icon name='diamond-outline'></ion-icon><p>Custom bots</p></a>" +
						"<a class='tab otherlinks" + (user == "dataexport" ? " active" : "") + "' href='/dashboard/dataexport'><ion-icon name='file-tray-stacked-outline'></ion-icon><p>User data</p></a>" +
						"</div>"
					: "") +
					(guild ?
						"<div class='section middle'><p class='title' translation='sidebar.dashboard'></p>" +
						"<a class='tab otherlinks" + (dashboard == "settings" ? " active" : "") + "' href='./settings?guild=" + guild + "'><ion-icon name='settings-outline'></ion-icon>" +
							"<p translation='dashboard.settings'>Settings</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "integrations" ? " active" : "") + "' href='./integrations?guild=" + guild + "'><ion-icon name='terminal-outline'></ion-icon>" +
							"<p translation='dashboard.integrations'>Integrations</p></a>" +
						"<details>" +
						"<summary>More pages</summary>" +
						"<a class='tab otherlinks" + (dashboard == "reactionroles" ? " active" : "") + "' href='./reactionroles?guild=" + guild + "'><ion-icon name='happy-outline'></ion-icon>" +
						"<p>Reactionroles</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "logs" ? " active" : "") + "' href='./logs?guild=" + guild + "'><ion-icon name='warning-outline'></ion-icon>" +
							"<p translation='dashboard.logs'>Logs</p></a>" +
						//"<a class='tab otherlinks" + (dashboard == "images" ? " active" : "") + "' href='./images?guild=" + guild + "'><ion-icon name='images-outline'></ion-icon><p>Images</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "modlogs" ? " active" : "") + "' href='./modlogs?guild=" + guild + "'><ion-icon name='shield-half-outline'></ion-icon>" +
							"<p translation='dashboard.modlogs'>Modlogs</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "tickets" ? " active" : "") + "' href='./tickets?guild=" + guild + "'><ion-icon name='ticket-outline'></ion-icon>" +
							"<p translation='dashboard.tickets'>Tickets</p></a>" +
						"<a class='tab otherlinks' href='../leaderboard?guild=" + guild + "'><ion-icon name='swap-vertical-outline'></ion-icon><p translation='dashboard.leaderboard'>Leaderboard</p></a>" +
						"<a class='tab otherlinks' href='../stats?guild=" + guild + "'><ion-icon name='bar-chart-outline'></ion-icon><p translation='dashboard.stats'>Statistics</p></a>" +
						"</details>" +
						"</div>"
					: "") +
				"</div>" +

				"<div class='section bottom'>" +
					"<div class='hoverdropdown lang'>" +
						"<div class='hoverdropdown-content langselect'>" +
							"<div onclick='reloadText(\"ja\")'>" +
								"<img src='/assets/images/wikimedia_flagja.svg' width='30' height='30' alt='JA flag'>" +
								"<span>日本語</span>" +
							"</div>" +
							"<div onclick='reloadText(\"hu\")'>" +
								"<img src='/assets/images/wikimedia_flaghu.svg' width='30' height='30' alt='HU flag'>" +
								"<span>Magyar</span>" +
							"</div>" +
							"<div onclick='reloadText(\"fr\")'>" +
								"<img src='/assets/images/wikimedia_flagfr.svg' width='30' height='30' alt='FR flag'>" +
								"<span>Français</span>" +
							"</div>" +
							"<div onclick='reloadText(\"de\")'>" +
								"<img src='/assets/images/wikimedia_flagde.svg' width='30' height='30' alt='DE flag'>" +
								"<span>Deutsch</span>" +
							"</div>" +
							"<div onclick='reloadText(\"en\")'>" +
								"<img src='/assets/images/wikimedia_flagen.svg' width='30' height='30' alt='EN flag'>" +
								"<span>English</span>" +
							"</div>" +
						"</div>" +
						"<div class='text'>" +
							"<ion-icon name='language-outline'></ion-icon>" +
							"<span translation='global.language'>Language</span>" +
						"</div>" +
					"</div>" +

					"<label class='switch' data-type='theme'>" +
						"<input type='checkbox' id='theme-toggle' aria-label='Toggle theme'>" +
						"<span class='slider'></span>" +
					"</label>" +
				"</div>" +
			"</nav>" +
			"</div>"
	}
}
customElements.define("global-sidebar", Sidebar)

let sideState = 0
function sidebar() {
	sideState++

	documentGetElementById("lineTop2").classList.add("rotated1")
	documentGetElementById("lineBottom2").classList.add("rotated2")

	documentGetElementById("lineTop1").classList.add("rotated1")
	documentGetElementById("lineBottom1").classList.add("rotated2")

	if (sideState % 2 == 0) {
		setTimeout(() => {
			documentGetElementById("content").classList.remove("no-padding")
			documentGetElementById("sidebar-container").classList.add("visible")
		}, 300)
	} else {
		documentGetElementById("content").classList.add("no-padding")

		documentGetElementById("lineTop2").classList.remove("rotated1")
		documentGetElementById("lineBottom2").classList.remove("rotated2")

		documentGetElementById("lineTop1").classList.remove("rotated1")
		documentGetElementById("lineBottom1").classList.remove("rotated2")

		setTimeout(() => {
			documentGetElementById("sidebar-container").classList.remove("visible")
		}, 100)
	}
}

function fadeOut(elem) {
	if (!elem) return
	if (!elem.style.opacity) elem.style.opacity = 1

	elem.style.opacity = parseFloat(elem.style.opacity) - 0.05
	if (elem.style.opacity >= 0) setTimeout(() => fadeOut(elem), 25)
	else elem.remove()
}
function fadeIn(elem) {
	if (!elem) return
	if (!elem.style.opacity) elem.style.opacity = 0

	elem.style.opacity = parseFloat(elem.style.opacity) + 0.05
	if (elem.style.opacity < 1) setTimeout(() => fadeIn(elem), 25)
}

function openDialog(dialog) {
	dialog.removeAttribute("hidden")
	dialog.getElementsByClassName("close")[0].onclick = () => dialog.setAttribute("hidden", "")
	window.onclick = event => {
		if (event.target == dialog) dialog.setAttribute("hidden", "")
	}
}

let headerTimeout
let prevScroll = 0

function pageLoad() {
	documentBody = documentCopy.body
	documentGetElementById = documentCopy.getElementById.bind(documentCopy)

	if (!getCookie("cookie-dismiss") && locationCopy.hash != "#no-cookie-popup") {
		documentBody.innerHTML +=
			"<div class='userinfo-container' id='cookie-container'>" +
			"<h2 translation='cookie.title'>Cookie information</h2>" +
			"<p>We only use the following cookies on this website - it's your choice.<br>Essential cookies:</p>" +
			"<ul><li><code>token</code> & <code>user</code>: Discord login</li><li><code>cookie-dismiss</code>: Remember cookie consent</li></ul>" +
			"<p>Optional cookies:</p>" +
			"<ul><li><code>theme</code> & <code>lang</code>: Remember preference</li><li><code>avatar</code>: Display Discord user avatar</li></ul>" +
			"<button type='button' onclick='setCookie(\"cookie-dismiss\", 2, 365, true);fadeOut(this.parentElement)' translation='cookie.all'>Accept all</button>" +
			"<button type='button' onclick='setCookie(\"cookie-dismiss\", 1, 365, true);fadeOut(this.parentElement)' translation='cookie.necessary'>Only essential</button>" +
			"</div>"
		setTimeout(() => fadeIn(documentGetElementById("cookie-container")), 1000)
	}

	if (screen.width <= 600) {
		documentGetElementById("content").classList.add("no-padding")
		sideState = 1
	}

	if (getCookie("theme") == "light") documentBody.classList.replace("dark-theme", "light-theme")
	else if (!getCookie("theme") && window.matchMedia("(prefers-color-scheme: light)").matches) {
		documentBody.classList.replace("dark-theme", "light-theme")
		setCookie("theme", "light", 365, true)
	} else if (getCookie("theme") == "dark") documentGetElementById("theme-toggle").checked = true

	if (getCookie("user")) {
		documentCopy.getElementsByClassName("account")[0].removeAttribute("onclick")

		documentCopy.querySelector(".hoverdropdown-content:not(.langselect)").innerHTML =
			"<a href='/logout' translation='global.logout'>Logout</a><a href='/user' translation='global.yourprofile'>Your profile</a>" +
			//"<a href='/dashboard/custom'>Custom bots</a>" +
			"<a href='/dashboard/dataexport' translation='global.viewdataexport'>View own data</a>"

		if (getCookie("avatar")) documentCopy.getElementsByClassName("account")[0].innerHTML +=
			"<img crossorigin='anonymous' src='https://cdn.discordapp.com/avatars/" + getCookie("avatar") + ".webp?size=32' srcset='https://cdn.discordapp.com/avatars/" + getCookie("avatar") +
			".webp?size=64 2x' width='32' height='32' alt='User Avatar' onerror='documentGetElementById(\"user-avatar\").classList.add(\"visible\");this.setAttribute(\"hidden\", \"\")'>"
		else documentGetElementById("user-avatar").classList.add("visible")
	} else documentGetElementById("user-avatar").classList.add("visible")

	setTimeout(() => {
		documentGetElementById("theme-toggle").addEventListener("change", () => {
			if (documentBody.classList.contains("light-theme")) {
				documentBody.classList.replace("light-theme", "dark-theme")
				setCookie("theme", "dark", 365, true)
			} else {
				documentBody.classList.replace("dark-theme", "light-theme")
				setCookie("theme", "light", 365, true)
			}
			documentCopy.querySelectorAll("emoji-picker").forEach(picker => {
				picker.classList.toggle("light")
			})
		})
	}, 300)

	if (!window.matchMedia("(prefers-reduced-motion: reduced)").matches && screen.height <= 600) documentBody.addEventListener("scroll", () => {
		if (!headerTimeout) headerTimeout = setTimeout(() => {
			if (documentBody.scrollTop > prevScroll) documentCopy.getElementsByTagName("header")[0].classList.add("scroll-down")
			else documentCopy.getElementsByTagName("header")[0].classList.remove("scroll-down")

			prevScroll = documentBody.scrollTop
			headerTimeout = void 0
		}, 200)
	}, false)

	loadFunc()
	reloadText()
	if ("serviceWorker" in navigator) navigator.serviceWorker.register("/serviceworker.js")

	let script = documentCopy.createElement("script")
	script.src = "/assets/js/instantpage-5.2.0.js"
	script.type = "module"
	documentBody.appendChild(script)
}
