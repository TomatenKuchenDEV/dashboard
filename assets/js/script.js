const getCookie = (name = "") => {
	for (const rawCookie of document.cookie.split(";")) {
		const cookie = rawCookie.trim()
		if (cookie.split("=")[0] == name) return cookie.substring(name.length + 1, cookie.length)
	}
	return void 0
}
const setCookie = (name = "", value = "", days = 0, global = false) => {
	if ((!getCookie("cookie-dismiss") || getCookie("cookie-dismiss") == 1) && name != "token" && name != "cookie-dismiss") return

	let cookie = name + "=" + value + ";path=/;Secure;SameSite=Strict;"
	if (days > 0) cookie += "expires=" + new Date(Date.now() + 1000 * 60 * 60 * 24 * days).toUTCString() + ";"
	if (global && location.host != "localhost:4269") cookie += "domain=.tomatenkuchen.com;"

	document.cookie = cookie
}
// eslint-disable-next-line no-unused-vars
const deleteCookie = (name = "") => {
	document.cookie = name + "=;Max-Age=-99999999;path=/;"
	document.cookie = name + "=;Max-Age=-99999999;path=/;domain=.tomatenkuchen.com;"
}

const url = "https://api.tomatenkuchen.com/api/"
// eslint-disable-next-line no-unused-vars
const get = async (component = "", auth = true, method = "GET", body = null) => {
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

const encode = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
// eslint-disable-next-line no-unused-vars
const assertInt = int => {
	if (typeof int == "number" || typeof int == "bigint") return int
	throw new Error("Not an integer: " + int)
}

// eslint-disable-next-line no-unused-vars
const handleError = error => {
	if (typeof error != "string") console.error(error)
	return "<h1>An error occured while handling your request:</h1>" +
		"<h2>" + (typeof error == "string" ? error : error.toString()) + "</h2>" +
		(typeof error == "string" ? "" : "<h3>Check your browser console to find out more!</h3>")
}

const triggerKeys = new Set(["Enter", "Return", "Space"])
const handleClickAndEnter = (elem = "", func = () => {}, ...args) => {
	document.getElementById(elem).addEventListener("click", () => {
		func(...args)
	})
	document.getElementById(elem).addEventListener("keydown", event => {
		if (triggerKeys.has(event.key)) func(...args)
	})
}

class Header extends HTMLElement {
	connectedCallback() {
		this.innerHTML =
			"<header>" +
			"<div class='hamburger' id='header-hamburger'>" +
				"<div class='line' id='lineTop1'></div>" +
				"<div class='line' id='lineBottom1'></div>" +
			"</div>" +

			"<div class='hoverdropdown' tabindex='0'>" +
				"<div class='account' onclick='location=\"/login\"'>" +
					"<p translation='global.account'>Account</p>" +
					"<ion-icon id='user-avatar' name='person-circle-outline'></ion-icon>" +
				"</div>" +
				"<div class='hoverdropdown-content' role='menu'>" +
					"<a href='/login' translation='global.login' role='menuitem'></a>" +
				"</div>" +
			"</div>" +
			"</header>"
	}
}
customElements.define("global-header", Header)

class Footer extends HTMLElement {
	connectedCallback() {
		this.innerHTML =
			"<noscript><h1>This website doesn't work without JavaScript.</h1></noscript>" +
			"<footer>" +
			"<a href='/' title='Homepage' aria-label='Go to homepage'>" +
			"<div id='mainlink'>" +
				"<img src='/assets/images/background_64.webp' width='64' height='64' alt='TomatenKuchen Logo - Home' loading='lazy' fetchpriority='low'>" +
				"<span>TomatenKuchen</span>" +
			"</div>" +
			"</a>" +
			"<div class='links'>" +
				//"<a href='/custom' title='Information about custom bots'><ion-icon name='diamond-outline'></ion-icon>Custom bots</a>" +
				"<a href='/invite' title='Invite TomatenKuchen'><ion-icon name='add-outline'></ion-icon>Invite bot</a>" +
				"<a href='https://docs.tomatenkuchen.com' target='_blank' rel='noopener' title='Bot documentation'><ion-icon name='help-outline'></ion-icon>Docs</a>" +
				"<a href='/discord' data-no-instant target='_blank' rel='noopener' title='Join our Discord server'><ion-icon name='headset-outline'></ion-icon>Support server</a>" +
				"<a href='/credits' title='View contributors'><ion-icon name='people-outline'></ion-icon>Credits</a>" +
				"<a href='/privacy' title='Check the privacy policy and ToS'><ion-icon name='reader-outline'></ion-icon>Privacy & ToS</a>" +
				"<a href='/legal' title='View the site imprint'><ion-icon name='receipt-outline'></ion-icon>Legal Notice</a>" +
			"</div>" +
			"</footer>"
	}
}
customElements.define("global-footer", Footer)

class Sidebar extends HTMLElement {
	static observedAttributes = ["page", "dashboard", "user", "guild"]

	attributeChangedCallback() {
		const guild = this.hasAttribute("guild") ? encode(this.getAttribute("guild")) : void 0
		const dashboard = this.getAttribute("dashboard")
		const user = this.getAttribute("user")

		this.innerHTML =
			"<div class='sidebar-container " + (screen.width > 600 ? "visible" : "") + "' id='sidebar-container'>" +
			"<nav class='sidebar' id='sidebar'>" +
				"<div class='hamburger' id='sidebar-hamburger' tabindex='0'>" +
					"<div class='line' id='lineTop2'></div>" +
					"<div class='line' id='lineBottom2'></div>" +
				"</div>" +

				"<button type='button' id='tk-invite' translation='sidebar.invite'></button>" +

				"<div id='linksidebar' class='section' role='menu'>" +
					"<a href='/' title='Home' class='tab" + (this.getAttribute("page") == "main" ? " active' data-no-instant" : "'") + " role='menuitem'>" +
						"<ion-icon name='home-outline'></ion-icon>" +
						"<p translation='sidebar.home'></p>" +
					"</a>" +
					"<a href='/commands' title='Bot commands' class='tab" + (this.getAttribute("page") == "commands" ? " active' data-no-instant" : "'") + " role='menuitem'>" +
						"<ion-icon name='terminal-outline'></ion-icon>" +
						"<p translation='sidebar.commands'></p>" +
					"</a>" +
					"<a href='/dashboard' class='tab" + (dashboard || this.getAttribute("page") == "dashboard" ? " active' data-no-instant" : "'") + " role='menuitem'>" +
						"<ion-icon name='settings-outline'></ion-icon>" +
						"<p translation='sidebar.dashboard'></p>" +
					"</a>" +
					(user ?
						"<div class='section middle'><p class='title'>User profile</p>" +
						"<a class='tab otherlinks" + (user == "user" ? " active" : "") +
							"' href='/user' role='menuitem'><ion-icon name='thumbs-up-outline'></ion-icon><p>Votes</p></a>" +
						//"<a class='tab otherlinks" + (user == "custom" ? " active" : "") +
							//"' href='/dashboard/custom' role='menuitem'><ion-icon name='diamond-outline'></ion-icon><p>Custom bots</p></a>" +
						"<a class='tab otherlinks" + (user == "dataexport" ? " active" : "") +
							"' href='/dashboard/dataexport' role='menuitem'><ion-icon name='file-tray-stacked-outline'></ion-icon><p>User data</p></a>" +
						"</div>"
					: "") +
					(guild ?
						"<div class='section middle'><p class='title' translation='sidebar.dashboard'></p>" +
						"<a class='tab otherlinks" + (dashboard == "settings" ? " active" : "") + "' href='./settings?guild=" + guild + "' role='menuitem'>" +
							"<ion-icon name='settings-outline'></ion-icon>" +
							"<p translation='dashboard.settings'>Settings</p>" +
						"</a>" +
						"<a class='tab otherlinks" + (dashboard == "integrations" ? " active" : "") + "' title='A simplified version of the integrations page' " +
							"href='./integrations?cc=1&guild=" + guild + "' role='menuitem'><ion-icon name='chatbox-ellipses-outline'></ion-icon>" +
							"<p>Customcommands</p></a>" +
						(dashboard == "settings" ?
							"<details>" +
							"<summary>More pages</summary>"
						: "") +
						"<a class='tab otherlinks" + (dashboard == "integrations" ? " active" : "") + "' href='./integrations?guild=" + guild + "' role='menuitem'>" +
							"<ion-icon name='terminal-outline'></ion-icon>" +
							"<p translation='dashboard.integrations'>Integrations</p>" +
						"</a>" +
						"<a class='tab otherlinks" + (dashboard == "reactionroles" ? " active" : "") + "' href='./reactionroles?guild=" + guild + "' role='menuitem'>" +
							"<ion-icon name='happy-outline'></ion-icon>" +
							"<p>Reactionroles</p>" +
						"</a>" +
						"<a class='tab otherlinks" + (dashboard == "logs" ? " active" : "") + "' href='./logs?guild=" + guild + "' role='menuitem'><ion-icon name='warning-outline'></ion-icon>" +
							"<p translation='dashboard.logs'>Logs</p></a>" +
						//"<a class='tab otherlinks" + (dashboard == "images" ? " active" : "") + "' href='./images?guild=" + guild +
						//"' role='menuitem'><ion-icon name='images-outline'></ion-icon><p>Images</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "modlogs" ? " active" : "") + "' href='./modlogs?guild=" + guild +
						"' role='menuitem'><ion-icon name='shield-half-outline'></ion-icon>" +
							"<p translation='dashboard.modlogs'>Modlogs</p></a>" +
						"<a class='tab otherlinks" + (dashboard == "tickets" ? " active" : "") + "' href='./tickets?guild=" + guild +
						"' role='menuitem'><ion-icon name='ticket-outline'></ion-icon>" +
							"<p translation='dashboard.tickets'>Tickets</p></a>" +
						"<a class='tab otherlinks' href='../leaderboard?guild=" + guild + "' role='menuitem'>" +
							"<ion-icon name='swap-vertical-outline'></ion-icon><p translation='dashboard.leaderboard'>Leaderboard</p>" +
						"</a>" +
						"<a class='tab otherlinks' href='../stats?guild=" + guild + "' role='menuitem'>" +
							"<ion-icon name='bar-chart-outline'></ion-icon><p translation='dashboard.stats'>Statistics</p>" +
						"</a>" +
						(dashboard == "settings" ?
							"</details>"
						: "") +
						"</div>"
					: "") +
				"</div>" +

				"<div class='section bottom'>" +
					"<div class='hoverdropdown lang' tabindex='0'>" +
						"<div class='hoverdropdown-content langselect' role='menu'>" +
							"<div id='langpicker-ja' role='menuitem'>" +
								"<img src='/assets/images/wikimedia_flagja.svg' width='30' height='30' alt=''>" +
								"<span>日本語</span>" +
							"</div>" +
							"<div id='langpicker-hu' role='menuitem'>" +
								"<img src='/assets/images/wikimedia_flaghu.svg' width='30' height='30' alt=''>" +
								"<span>Magyar</span>" +
							"</div>" +
							"<div id='langpicker-fr' role='menuitem'>" +
								"<img src='/assets/images/wikimedia_flagfr.svg' width='30' height='30' alt=''>" +
								"<span>Français</span>" +
							"</div>" +
							"<div id='langpicker-de' role='menuitem'>" +
								"<img src='/assets/images/wikimedia_flagde.svg' width='30' height='30' alt=''>" +
								"<span>Deutsch</span>" +
							"</div>" +
							"<div id='langpicker-en' role='menuitem'>" +
								"<img src='/assets/images/wikimedia_flagen.svg' width='30' height='30' alt=''>" +
								"<span>English</span>" +
							"</div>" +
						"</div>" +
						"<div class='text'>" +
							"<ion-icon name='language-outline'></ion-icon>" +
							"<span translation='global.language'>Language</span>" +
						"</div>" +
					"</div>" +

					"<label class='switch' data-type='theme' aria-label='Toggle theme'>" +
						"<input type='checkbox' id='theme-toggle' tabindex='0'>" +
						"<span class='slider'></span>" +
					"</label>" +
				"</div>" +
			"</nav>" +
			"</div>"
	}
}
customElements.define("global-sidebar", Sidebar)

let sideState = 0
const sidebar = () => {
	sideState++

	document.getElementById("lineTop2").classList.add("rotated1")
	document.getElementById("lineBottom2").classList.add("rotated2")

	document.getElementById("lineTop1").classList.add("rotated1")
	document.getElementById("lineBottom1").classList.add("rotated2")

	if (sideState % 2 == 0) {
		setTimeout(() => {
			document.getElementById("content").classList.remove("no-padding")
			document.getElementById("sidebar-container").classList.add("visible")

			document.getElementById("header-hamburger").tabIndex = -1
			document.getElementById("sidebar-hamburger").tabIndex = 0
			document.getElementById("sidebar-hamburger").focus()
		}, 300)
	} else {
		document.getElementById("content").classList.add("no-padding")

		document.getElementById("lineTop2").classList.remove("rotated1")
		document.getElementById("lineBottom2").classList.remove("rotated2")

		document.getElementById("lineTop1").classList.remove("rotated1")
		document.getElementById("lineBottom1").classList.remove("rotated2")

		setTimeout(() => {
			document.getElementById("sidebar-container").classList.remove("visible")
		}, 100)

		document.getElementById("sidebar-hamburger").tabIndex = -1
		document.getElementById("header-hamburger").tabIndex = 0
		document.getElementById("header-hamburger").focus()
	}
}

const fadeOut = elem => {
	if (!elem) return
	if (!elem.style.opacity) elem.style.opacity = 1

	elem.style.opacity = Number.parseFloat(elem.style.opacity) - 0.05
	if (elem.style.opacity >= 0) setTimeout(() => fadeOut(elem), 25)
	else elem.remove()
}
const fadeIn = elem => {
	if (!elem) return
	if (!elem.style.opacity) elem.style.opacity = 0

	elem.style.opacity = Number.parseFloat(elem.style.opacity) + 0.05
	if (elem.style.opacity < 1) setTimeout(() => fadeIn(elem), 25)
}

// eslint-disable-next-line no-unused-vars
const openDialog = dialog => {
	dialog.removeAttribute("hidden")
	window.addEventListener("click", event => {
		if (event.target == dialog) dialog.setAttribute("hidden", "")
	})
}

let headerTimeout
let prevScroll = 0

document.addEventListener("DOMContentLoaded", () => {
	if (!getCookie("cookie-dismiss") && location.hash != "#no-cookie-popup") {
		document.body.innerHTML +=
			"<div class='userinfo-container' id='cookie-container'>" +
			"<h2 translation='cookie.title'>Cookie information</h2>" +
			"<p>We use the following cookies on this website:<br>Essential:</p>" +
			"<ul><li><code>token</code>: Discord website login</li><li><code>cookie-dismiss</code>: Remember your consent</li></ul>" +
			"<p>Optional:</p>" +
			"<ul><li><code>theme</code> & <code>lang</code>: Remember preference</li><li><code>user</code> & <code>avatar</code>: Display Discord user data</li></ul>" +
			"<button type='button' id='cookie-all' translation='cookie.all'>Accept all</button>" +
			"<button type='button' id='cookie-essential' translation='cookie.necessary'>Only essential</button>" +
			"</div>"
		setTimeout(() => fadeIn(document.getElementById("cookie-container")), 1000)

		handleClickAndEnter("cookie-all", () => {
			setCookie("cookie-dismiss", 2, 365, true)
			fadeOut(document.getElementById("cookie-container"))
		})
		handleClickAndEnter("cookie-essential", () => {
			setCookie("cookie-dismiss", 1, 365, true)
			fadeOut(document.getElementById("cookie-container"))
		})
	}

	if (screen.width <= 600) {
		document.getElementById("content").classList.add("no-padding")
		sideState = 1
	}

	if (getCookie("token") && document.getElementsByClassName("account").length > 0) {
		document.getElementsByClassName("account")[0].removeAttribute("onclick")

		document.querySelector(".hoverdropdown-content:not(.langselect)").innerHTML =
			"<a href='/logout' translation='global.logout'>Logout</a>" +
			"<a href='/user' translation='global.yourprofile'>Your profile</a>" +
			//"<a href='/dashboard/custom'>Custom bots</a>" +
			"<a href='/dashboard/dataexport' translation='global.viewdataexport'>View own data</a>"

		if (getCookie("avatar")) document.getElementsByClassName("account")[0].innerHTML +=
			"<img crossorigin='anonymous' src='https://cdn.discordapp.com/avatars/" + getCookie("avatar") + ".webp?size=32' srcset='https://cdn.discordapp.com/avatars/" + getCookie("avatar") +
			".webp?size=64 2x' width='32' height='32' alt='' onerror='document.getElementById(\"user-avatar\").classList.add(\"visible\");this.setAttribute(\"hidden\", \"\")'>"
		else document.getElementById("user-avatar").classList.add("visible")
	} else if (document.getElementById("user-avatar")) document.getElementById("user-avatar").classList.add("visible")

	if (document.getElementById("theme-toggle")) {
		if (getCookie("theme") == "light") document.body.classList.replace("dark-theme", "light-theme")
		else if (!getCookie("theme") && window.matchMedia("(prefers-color-scheme: light)").matches) {
			document.body.classList.replace("dark-theme", "light-theme")
			setCookie("theme", "light", 365, true)
		} else if (getCookie("theme") == "dark") document.getElementById("theme-toggle").checked = true

		setTimeout(() => {
			document.getElementById("theme-toggle").addEventListener("change", () => {
				if (document.body.classList.contains("light-theme")) {
					document.body.classList.replace("light-theme", "dark-theme")
					setCookie("theme", "dark", 365, true)
				} else {
					document.body.classList.replace("dark-theme", "light-theme")
					setCookie("theme", "light", 365, true)
				}
				document.querySelectorAll("emoji-picker").forEach(picker => {
					picker.classList.toggle("light")
				})
			})
		}, 300)
	}

	if (!window.matchMedia("(prefers-reduced-motion: reduced)").matches && screen.height <= 600) document.body.addEventListener("scroll", () => {
		if (!headerTimeout) headerTimeout = setTimeout(() => {
			if (document.body.scrollTop > prevScroll) document.getElementsByTagName("header")[0].classList.add("scroll-down")
			else document.getElementsByTagName("header")[0].classList.remove("scroll-down")

			prevScroll = document.body.scrollTop
			headerTimeout = void 0
		}, 200)
	}, false)

	for (const dialogClose of document.getElementsByClassName("close")) {
		dialogClose.onclick = () => dialogClose.parentElement.parentElement.setAttribute("hidden", "")
	}

	for (const dropdown of document.getElementsByClassName("hoverdropdown")) {
		const children = dropdown.querySelector(".hoverdropdown-content").children
		let index = 0

		// eslint-disable-next-line unicorn/consistent-function-scoping
		const listener = event => {
			if (event.key == "ArrowUp" || event.key == "ArrowLeft") {
				if (index == 0) index = children.length - 1
				else index -= 1

				for (const child of children) child.classList.remove("active")
				children[index].classList.add("active")
			} else if (event.key == "ArrowDown" || event.key == "ArrowRight") {
				if (index == children.length - 1) index = 0
				else index += 1

				for (const child of children) child.classList.remove("active")
				children[index].classList.add("active")
			} else if (event.key == "Enter") children[index].click()
		}

		dropdown.addEventListener("focus", () => {
			dropdown.addEventListener("keydown", listener)
		})
		dropdown.addEventListener("blur", () => {
			dropdown.removeEventListener("keydown", listener)
			for (const child of children) child.classList.remove("active")
		})
	}

	if (location.pathname != "/stats") {
		setTimeout(() => { // On /dashboard/ pages somehow nothing happens when the below code is executed instantly
			handleClickAndEnter("header-hamburger", sidebar)
			handleClickAndEnter("sidebar-hamburger", sidebar)
			handleClickAndEnter("langpicker-ja", reloadText, "ja")
			handleClickAndEnter("langpicker-hu", reloadText, "hu")
			handleClickAndEnter("langpicker-fr", reloadText, "fr")
			handleClickAndEnter("langpicker-de", reloadText, "de")
			handleClickAndEnter("langpicker-en", reloadText, "en")
			handleClickAndEnter("tk-invite", () => location.href = "/invite")
		}, location.pathname.startsWith("/dashboard/") ? 500 : 10)

		reloadText()
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/serviceworker.js")

		const script = document.createElement("script")
		script.src = "/assets/js/instantpage-5.2.0.js"
		script.type = "module"
		document.body.appendChild(script)
	}
})
