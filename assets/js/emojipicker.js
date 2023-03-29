const emojiPickerLang = {
	categoriesLabel: "Kategorien",
	emojiUnsupportedMessage: "Dein Browser unterstützt keine farbigen Emojis.",
	favoritesLabel: "Favoriten",
	loadingMessage: "Wird geladen…",
	networkErrorMessage: "Konnte Emoji nicht laden.",
	regionLabel: "Emoji auswählen",
	searchDescription: "Wenn Suchergebnisse verfügbar sind, wähle sie mit Pfeil rauf und runter, dann Eingabetaste, aus.",
	searchLabel: "Suchen",
	searchResultsLabel: "Suchergebnisse",
	skinToneDescription: "Wenn angezeigt, nutze Pfeiltasten rauf und runter zum Auswählen, Eingabe zum Akzeptieren.",
	skinToneLabel: "Wähle einen Hautton (aktuell {skinTone})",
	skinTonesLabel: "Hauttöne",
	skinTones: [
		"Standard",
		"Hell",
		"Mittel-hell",
		"Mittel",
		"Mittel-dunkel",
		"Dunkel"
	],
	categories: {
		custom: "Benutzerdefiniert",
		"smileys-emotion": "Smileys und Emoticons",
		"people-body": "Menschen und Körper",
		"animals-nature": "Tiere und Natur",
		"food-drink": "Essen und Trinken",
		"travel-places": "Reisen und Orte",
		activities: "Aktivitäten",
		objects: "Objekte",
		symbols: "Symbole",
		flags: "Flaggen"
	}
}

async function emojiPicker(parent = document.body, customEmoji = [], guildName = "Serveremojis") {
	const pickerExisting = parent.querySelector("emoji-picker");
	if (pickerExisting) return pickerExisting.remove();

	const picker = document.createElement("emoji-picker");
	if (getCookie("theme") == "light") picker.classList.add("light");
	else picker.classList.add("dark");

	const style = document.createElement("style");
	style.textContent = `
		.picker {
			border-radius: 10px;
		}
		.emoji, button.emoji {
			border-radius: 4px;
		}
		input.search {
			outline: none;
			background-color: var(--input-border-color);
		}
		#skintone-button {
			font-size: 24px;
		}
	`;
	picker.shadowRoot.appendChild(style);

	picker.addEventListener("emoji-click", e => {
		insertText(picker.parentElement.querySelector("textarea,input"), e.detail.unicode || "<" + (e.detail.emoji.url.includes(".gif") ? "a" : "") + ":" + e.detail.emoji.name + ":" + e.detail.emoji.url.match(/[0-9]{17,20}/)[0] + ">");
	});

	picker.i18n = emojiPickerLang;
	picker.customEmoji = customEmoji.map(emoji => {
		return {
			name: emoji.name,
			shortCodes: [emoji.name, emoji.id],
			url: "https://cdn.discordapp.com/emojis/" + emoji.id + "." + (emoji.a ? "gif" : "webp") + "?size=64",
			category: guildName
		};
	});
	parent.appendChild(picker);
}

const insertMention = (elem, id) => insertText(elem.parentElement.parentElement.querySelector("textarea,input"), "<@&" + id + ">");
async function mentionPicker(parent = document.body, roles = []) {
	const pickerExisting = parent.querySelector(".custom-picker");
	if (pickerExisting) return pickerExisting.remove();

	const picker = document.createElement("div");
	picker.classList.add("custom-picker");
	if (getCookie("theme") == "light") picker.classList.add("light");

	picker.innerHTML = roles.map(mention => (
		"<span class='element'" + (mention.color ? " style='color:#" + mention.color.toString(16) + ";'" : "") +
		" onclick='insertMention(this, \"" + mention.id + "\")'>@" + mention.name + "</span>"
	)).join("");
	parent.appendChild(picker);
}

const togglePicker = elem => elem.parentElement.querySelector(".picker").classList.toggle("open");
const updateSelected = (elem, value, editMulti = false) => {
	console.log(editMulti, value, elem.parentElement.parentElement.getAttribute("data-selected"))
	let found = [];
	elem.parentElement.querySelectorAll(".element").forEach(e => {
		if (!Array.isArray(value) || (editMulti && e.getAttribute("data-id").replace("_", "") == value.replace("_", ""))) e.classList.remove("selected");
		else if (e.classList.contains("selected")) found.push(e.getAttribute("data-id").replace("_", ""));
	});
	console.warn(Array.isArray(value) || editMulti, found.join(","), typeof value == "string" ? value.replace("_", "") : 0)
	console.warn(found)
	elem.parentElement.parentElement.setAttribute("data-selected", Array.isArray(value) || editMulti ? found.join(",") : value.replace("_", ""));
	elem.parentElement.parentElement.querySelector(".list").innerHTML = "<div><span>Kein" + (elem.getAttribute("type") == "role" ? "e Rolle" : " Kanal") + "</span></div>";
	found = []
	elem.parentElement.querySelectorAll(".element").forEach(e => {
		if (((Array.isArray(value) || editMulti) && value.includes(e.getAttribute("data-id").replace("_", ""))) || (!Array.isArray(value) && !editMulti && e.getAttribute("data-id").replace("_", "") == value.replace("_", ""))) {
			if (found.length == 0) elem.parentElement.parentElement.querySelector(".list").innerHTML = "";
			found.push(e.getAttribute("data-id").replace("_", ""));
			e.classList.add("selected");
			elem.parentElement.parentElement.querySelector(".list").innerHTML += "<div>" + e.innerHTML +
				(Array.isArray(value) || editMulti ? "<ion-icon name='trash-outline' class='removeItem' onclick='updateSelected(this, this.getAttribute(\"data-id\"), true)'></ion-icon>" : "") + "</div>";
		}
	});
}

class SinglePicker extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		this.innerHTML =
			"<div class='list' onclick='togglePicker(this)'></div>" +
			"<div class='picker'>" +
			Object.keys(pickerData[this.getAttribute("type")]).map(channel => {
				const current = pickerData[this.getAttribute("type")][channel]
				return "<div data-id='" + channel + "' onkeyup='if(event.key==\"Enter\")updateSelected(this, \"" + channel + "\", this.parentElement.parentElement.getAttribute(\"data-multi\") == 1)' " +
					"onclick='updateSelected(this, \"" + channel + "\", this.parentElement.parentElement.getAttribute(\"data-multi\") == 1)' class='element" +
					(current.parent ? " child" : "") + "' tabindex='0'>" +
					(current.type == "text" ? "<img src='https://cdn.discordapp.com/emojis/1013330953038475355.webp?size=32' width='25' height='25' alt=''>" : "") +
					(current.type == "voice" ? "<img src='https://cdn.discordapp.com/emojis/1013333740187033671.webp?size=32' width='25' height='25' alt=''>" : "") +
					(current.type == "category" ? "<img src='https://cdn.discordapp.com/emojis/1013339254593687592.webp?size=32' width='25' height='25' alt=''>" : "") +
					(current.type == "role" ? "<img style='padding-right: 2px;' src='https://cdn.discordapp.com/emojis/1013338522830250014.webp?size=32' width='25' height='25' alt=''>" : "") +
					"<span>" +
					(channel ? encode(current.name || current) : "Kein" + (this.getAttribute("type") == "role" ? "e Rolle" : " Kanal")) +
					"</span></div>";
			}).join("") +
			"</div>";
	}
}
customElements.define("channel-picker", SinglePicker);

// Modified and minified from https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js
/* eslint-disable */
let browserTextNode;function canTextNode(e){if("TEXTAREA"!==e.nodeName)return!1;if(void 0===browserTextNode){const e=document.createElement("textarea");e.value=1,browserTextNode=!!e.firstChild}return browserTextNode}function insertText(e,t){if(e.focus(),document.selection){const e=document.selection.createRange();return e.text=t,e.collapse(!1),void e.select()}if(!document.execCommand("insertText",!1,t)){const n=e.selectionStart,o=e.selectionEnd;if("function"==typeof e.setRangeText)e.setRangeText(t);else{const c=document.createRange(),l=document.createTextNode(t);if(canTextNode(e)){let t=e.firstChild;if(t){let e=0,l=null,s=null;for(;t&&(null===l||null===s);){const i=t.nodeValue.length;n>=e&&n<=e+i&&c.setStart(l=t,n-e),o>=e&&o<=e+i&&c.setEnd(s=t,o-e),e+=i,t=t.nextSibling}n!==o&&c.deleteContents()}else e.appendChild(l)}if(canTextNode(e)&&"#text"===c.commonAncestorContainer.nodeName)c.insertNode(l);else{const c=e.value;e.value=c.slice(0,n)+t+c.slice(o)}}e.setSelectionRange(n+t.length,n+t.length);const c=document.createEvent("UIEvent");c.initEvent("input",!0,!1),e.dispatchEvent(c)}}
