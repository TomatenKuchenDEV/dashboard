/** @type {HTMLButtonElement} */
const button = document.getElementById("request-button")

const triggerContact = async () => {
  const email = document.getElementById("email-input").value
  const name = document.getElementById("name-input").value
  const request = document.getElementById("request-input").value

  const infoElement = document.getElementById("input-info")
  if (!email || !name || !request) {
    infoElement.textContent = "All form fields need to be filled!"
    return
  }

  infoElement.textContent = "Submitting contact form..."
  button.disabled = true

  await fetch("https://api.tomatenkuchen.com/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, request })
  })

  infoElement.textContent = "The contact form has been submitted!"
  button.disabled = false
}
