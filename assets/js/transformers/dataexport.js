const tkbadges = {
	developer: "<img src='https://cdn.discordapp.com/emojis/712736235873108148.webp?size=24' width='24' height='24' alt='' loading='lazy' crossorigin='anonymous'> Developer",
	team: "<img src='https://cdn.discordapp.com/emojis/713984949639708712.webp?size=24' width='24' height='24' alt='' loading='lazy' crossorigin='anonymous'> Staff",
	contributor: "<img src='https://cdn.discordapp.com/emojis/914137176499949598.webp?size=24' width='24' height='24' alt='' loading='lazy' crossorigin='anonymous'> Denkääär",
	translator: "🏴‍☠️ Translator",
	kek: "<img src='https://cdn.discordapp.com/emojis/858221941017280522.webp?size=24' width='24' height='24' alt='' loading='lazy' crossorigin='anonymous'> Kek",
	oldeconomy: "<img src='https://cdn.discordapp.com/emojis/960027591115407370.gif?size=24' width='24' height='24' alt='' loading='lazy' crossorigin='anonymous'> Old economy system"
}

const getDataexportHTML = async () => {
	const json = await get("users/dataexport")
	if (json.status == "success") {
		let badges = ""
		if (json.data.userProfiles?.badges?.length > 0) badges = json.data.userProfiles.badges.map(badge => "<div class='badge'>" + tkbadges[badge] + "</div>").join(", ")

		let economyitems = ""
		if (json.data.economy?.shop?.length > 0)
			economyitems = json.data.economy.shop.map(item => "<p class='badge' title='Erhalten am " + new Date(item.date).toLocaleString() +
				(item.used > 0 ? ", " + item.used + " mal genutzt" : "") + "'>" + item.name + "</p>").join(", ")

		let cooldowns = ""
		if (json.data.economy?.cooldowns?.length > 0)
			cooldowns = json.data.economy.cooldowns.map(cooldown => "<p class='badge' title='Runs out: " + new Date(cooldown.time).toLocaleString() + "'>" + cooldown.cmd + "</p>").join(", ")

		let mentions = ""
		if (json.data.userProfiles?.afk?.mentions?.length > 0)
			mentions = json.data.userProfiles.afk.mentions.map(mention => "<a href='" + mention.url + "'><p class='badge'>" + mention.user + "</p></a><br>").join(", ")
		const afkSince = json.data.userProfiles?.afk?.date ? new Date(json.data.userProfiles?.afk?.date).toLocaleString() : ""

		let reminders = ""
		if (json.data.remind?.length > 0)
			reminders = json.data.remind.map(reminder => "<p class='badge' title='" + new Date(reminder.time).toLocaleString() + "'>" + encode(reminder.text) + "</p>").join(", ")

		let tickets = ""
		if (json.data.ticket?.length > 0)
			tickets = json.data.ticket.map(ticket => "<a href='/ticket?id=" + encode(ticket.id) + "' target='_blank' rel='noopener'>" + encode(ticket.id) + "</a>").join(", ")

		let suggests = ""
		if (json.data.suggest?.length > 0)
			suggests = json.data.suggest.map(suggest => "<p class='badge' title='" + encode(suggest.text) + "'>#" + assertInt(suggest.id) + "</p>").join(", ")

		return "<div class='center'>" +
			"<h1 class='greeting'><span translation='user.title'></span> <span class='accent'>" + encode(getCookie("user") || "You") + "</span></h1>" +
			"<div class='userdatagrid'>" +

			"<div class='userData'>" +
			"<h1 translation='user.general'></h1>" +
			"<p><b>ID:</b> " + json.data.userProfiles?.id + "</p>" +
			(json.data.birthday ?
				"<p><b translation='user.birthday'></b> " + assertInt(json.data.birthday.day) + "." + assertInt(json.data.birthday.month) + "." +
				(json.data.birthday.year ? assertInt(json.data.birthday.year) : "") + "</p>"
			: "") +
			(badges ? "<p><b translation='user.badges'></b> " + badges + "</p>" : "") +
			(json.data.userProfiles?.votes ? "<p><b>Votes:</b> " + json.data.userProfiles.votes.toLocaleString() + "</p>" : "") +
			(json.data.userProfiles?.credits ? "<p><b>Credits:</b> " + json.data.userProfiles.credits.toLocaleString() + "</p>" : "") +
			(json.data.userProfiles?.commands ?
				"<p><br>Unique executed commands: <b>" + Object.keys(json.data.userProfiles.commands).length.toLocaleString() + "</b><br>" +
				"Total executed commands: <b>" + Object.values(json.data.userProfiles.commands).reduce((a, b) => a + b, 0).toLocaleString() + "</b><br>" +
				"Top commands:<br>" +
				Object.entries(json.data.userProfiles.commands).sort((a, b) => b[1] - a[1]).slice(0, 10)
					.map(command => "<p class='badge' title='" + command[1].toLocaleString() + "'>" + command[0] + "</p>").join(", ") +
				"</p>"
			: "") +
			"</div>" +

			"<div class='userData'>" +
			"<h1 translation='dashboard.settings'></h1>" +
			(json.data.userProfiles && json.data.userProfiles.settings && json.data.userProfiles.settings.levelBackground ?
				"<p><b translation='user.levelbg'></b><br><a class='accent' target='_blank' ref='noopener' href='" + encode(json.data.userProfiles.settings.levelBackground) +
				"'><img crossorigin='anonymous' src='https://api.tomatenkuchen.com/image-proxy?url=" + encode(json.data.userProfiles.settings.levelBackground) +
				"' loading='lazy' width='350' height='140' alt='Your level background'></a></p>"
			: "") +
			"<p><b translation='user.saveticketatt'></b> " + (json.data.userProfiles?.settings?.saveTicketAttachments ? "✅" : "❌") + "</p>" +
			"</div>" +

			(json.data.economy ?
				"<div class='userData'>" +
				"<h1>Economy</h1>" +
				"<p><b>Wallet:</b> " + json.data.economy.wallet.toLocaleString() + "🍅</p>" +
				"<p><b>Bank:</b> " + json.data.economy.bank.toLocaleString() + "🍅</p>" +
				"<p><b>Skill:</b> " + json.data.economy.skill.toFixed(1) + "</p>" +
				"<p><b>School:</b> " + encode(json.data.economy.school) + "</p>" +
				(economyitems ? "<p><b>Items:</b> " + economyitems + "</p>" : "") +
				(cooldowns ? "<p><b>Cooldowns:</b> " + cooldowns + "</p>" : "") +
				"</div>"
			: "") +

			(json.data.userProfiles?.afk && json.data.userProfiles.afk.text ?
				"<div class='userData'>" +
				"<h1>AFK</h1>" +
				"<p><b translation='user.reason'></b> " + encode(json.data.userProfiles.afk.text) + "</p>" +
				"<p><b translation='user.since'></b> " + afkSince + "</p>" +
				(mentions ? "<p><b>Mentions:</b> " + mentions + "</p>" : "") +
				"</div>"
			: "") +

			(json.data.userProfiles?.todo ?
				"<div class='userData'>" +
				"<h1>" + json.data.userProfiles.todo.length + " Todo entries</h1>" +
				json.data.userProfiles.todo.map(todo =>
					"<p class='badge' title='" + new Date(todo.added).toLocaleString() + "'>" + encode(todo.name) + "</p>"
				).join(", ") +
				"</div>"
			: "") +

			(reminders ?
				"<div class='userData'>" +
				"<h1 translation='user.reminders'></h1>" +
				reminders +
				"</div>"
			: "") +

			(tickets ?
				"<div class='userData'>" +
				"<h1>Tickets</h1>" +
				tickets +
				"</div>"
			: "") +

			(suggests ?
				"<div class='userData'>" +
				"<h1 translation='user.suggestions'></h1>" +
				suggests +
				"</div>"
			: "") +

			(json.data.integrations ?
				"<div class='userData'>" +
				"<h1>" + json.data.integrations.length + " integrations</h1>" +
				json.data.integrations.map(int =>
					"<p class='badge' title='" + new Date(int.created).toLocaleString() + "'>" + encode(int.name) + "</p>"
				).join(", ") +
				"</div>"
			: "") +

			(json.data.customBots ?
				"<div class='userData'>" +
				"<h1>" + json.data.customBots.length + " custom bots</h1>" +
				json.data.customBots.map(bot =>
					"<p class='badge' title='Price per day: " + bot.cost.toLocaleString() + "; created: " + new Date(bot.created).toLocaleString() + "'>" + encode(bot.username) + "</p>"
				).join(", ") +
				"</div>"
			: "") +

			(json.data.backup && json.data.backup.backups ?
				"<div class='userData'>" +
				"<h1>" + json.data.backup.backups.length + " backups</h1>" +
				json.data.backup.backups.map(backup =>
					"<code title='Size: " + encode(backup.size) + "; created: " + new Date(backup.date).toLocaleString() + "'>" + encode(backup.code) + "</code>"
				).join(", ") +
				"</div>"
			: "") +

			"</div>" +

			"<div class='userData'>" +
			"<label for='datajson'><h1 translation='user.json'></h1></label><br>" +
			"<textarea id='datajson' rows='13' cols='" + (Math.round(screen.width / 11) > 120 ? 120 : Math.round(screen.width / 11)) + "' readonly>" +
				JSON.stringify(json.data, null, "\t") + "</textarea>" +
			"</div>" +

			"</div>"
	} else return handleError(json.message)
}

document.addEventListener("DOMContentLoaded", async () => {
	if (getCookie("token")) {
		const html = await getDataexportHTML()
		document.getElementById("content").innerHTML = html
		reloadText()
	} else {
		document.getElementById("root-container").innerHTML = "<h1>Redirecting to login...</h1>"
		location.href = "/login?next=" + encodeURIComponent(location.pathname + location.search + location.hash)
	}
})
