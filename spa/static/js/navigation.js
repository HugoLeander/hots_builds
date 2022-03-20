const restAPI = "http://localhost:8080/rest/"

document.addEventListener('DOMContentLoaded', function () {

	const anchors = document.querySelectorAll('a')

	for (const anchor of anchors) {

		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)

		})

	}

	showPage(location.pathname)

})

window.addEventListener('popstate', function () {

	hideCurrentPage()
	showPage(location.pathname)

})


/// FUNCTIONS

function hideCurrentPage() {
	document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url) {

	let nextPageId

	switch (url) {

		case '/':
			nextPageId = 'start-page'
			break

		case '/about':
			nextPageId = 'about-page'
			break

		case '/accounts':
			nextPageId = 'accounts-page'
			loadAccountsPage()
			break

		case '/login':
			nextPageId = 'login-page'

			const loginForm = document.getElementById("loginForm")

			loginForm.addEventListener('submit', function (event) {
				event.preventDefault()

				const username = document.getElementById("username").value
				const password = document.getElementById("password").value
				console.log(username, password)
				login(username, password)
			})
			break

		case '/signUp':
			nextPageId = 'signUp-page'

			const signUpForm = document.getElementById("signUpForm")

			signUpForm.addEventListener("submit", function (event) {
				event.preventDefault()

				const signUp_username = document.getElementById("signUp_username").value
				const signUp_password = document.getElementById("signUp_password").value
				const signUp_confirm_password = document.getElementById("signUp_confirm_password").value
				const newAccount = {
					username: signUp_username,
					password: signUp_password,
					confirm_password: signUp_confirm_password
				}
				console.log(newAccount)
				createAccount(newAccount)
			})
			break

		default:
			if (url.startsWith("/accounts/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'account-page'
				loadAccountPage(id)

			} else if (url.startsWith("/update/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'update-page'

				const updateForm = document.getElementById("updateForm")

				updateForm.addEventListener("submit", function (event) {
					event.preventDefault()

					const update_username = document.getElementById("update_username").value
					const update_password = document.getElementById("update_password").value
					const update_confirm_password = document.getElementById("confirm_update_password").value
					const updatedAccount = {
						account_id: id,
						username: update_username,
						password: update_password,
						confirm_password: update_confirm_password
					}
					console.log(updatedAccount)

					updateAccount(updatedAccount)

				})
			} else if (url.startsWith("/delete/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'delete-page'

				const deleteForm = document.getElementById("deleteForm")
				const yesButton = document.getElementById("yes_button")
				const noButton = document.getElementById("no_button")

				deleteForm.addEventListener("submit", function (event) {
					event.preventDefault()

					deleteAccount(id)
				})
				break
			}
			else {
				nextPageId = 'not-found-page'
			}

	}

	document.getElementById(nextPageId).classList.add('current-page')

}

async function loadAccountsPage() {

	const response = await fetch(restAPI)

	// TODO: Check status code and act accordingly!

	const humans = await response.json()

	const allHumansUl = document.getElementById('all-accounts')
	allHumansUl.innerText = ""

	for (const human of humans) {

		const li = document.createElement('li')

		const anchor = document.createElement('a')
		anchor.innerText = human.username

		anchor.setAttribute('href', "/accounts/" + human.account_id)
		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)
		})
		li.appendChild(anchor)

		allHumansUl.appendChild(li)

	}

}

async function loadAccountPage(id) {

	const response = await fetch(restAPI + id)
	const account = await response.json()
	console.log(account)

	const UlArr = document.getElementById('update-link')
	UlArr.innerText = ""

	const updateLi = document.createElement('li')
	const deleteLi = document.createElement('li')

	const anchorUpdate = document.createElement('button')
	anchorUpdate.innerText = "Update account information"
	anchorUpdate.setAttribute('href', "/update/" + id)
	anchorUpdate.addEventListener('click', function (event) {
		event.preventDefault()

		const updateUrl = anchorUpdate.getAttribute('href')

		history.pushState(null, "", updateUrl)

		hideCurrentPage()
		showPage(updateUrl)
	})

	const anchorDelete = document.createElement('button')
	anchorDelete.innerText = "Delete this account"
	anchorDelete.setAttribute('href', "/delete/" + id)
	anchorDelete.addEventListener('click', function (event) {
		event.preventDefault()

		const deleteURL = anchorDelete.getAttribute('href')

		history.pushState(null, "", deleteURL)

		hideCurrentPage()
		showPage(deleteURL)
	})

	updateLi.appendChild(anchorUpdate)
	deleteLi.appendChild(anchorDelete)

	UlArr.appendChild(updateLi)
	UlArr.appendChild(deleteLi)

	document.getElementById('account-id').innerText = account.account_id
	document.getElementById('account-username').innerText = account.username
	//document.getElementById('account-password').innerText = account.password

}


// CRUD FUNCTIONS

let ACCESS_TOKEN = ""
let ACCOUNT_USERNAME = ""

async function login(username, password) {

	const model = {
		username: username,
		password: password,
		grant_type: "password"
	}

	const response = await fetch(restAPI + "login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(model)
	})

	switch (response.status) {
		case 200:
			const responseBody = await response.json()

			ACCESS_TOKEN = responseBody.token
			ACCOUNT_USERNAME = username

			hideCurrentPage()
			showPage('/')

			break

		case 401:
			// handle error
			break


		case 400:
			//handle error
			break

	}

}

async function createAccount(account) {
	const response = await fetch(restAPI + "signUp", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(account)
	})

	switch (response.status) {
		case 201:
			const createdAccount = await response.json()

			hideCurrentPage()
			showPage('/')
			break

		case 401:
			//handle error
			break

		case 400:
			//handle error
			break

		case 500:
			//handle error
			break

		default:
			//handle error
			break
	}
}

async function updateAccount(account) {
	const response = await fetch(restAPI + account.account_id, {
		method: "PUT",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(account)
	})

	switch (response.status) {
		case 204:
			console.log("Carried out the request")
			break

		case 404:
			// handle errors
			//const account = await response.json()
			console.log(account)
			hideCurrentPage()
			showPage('/accounts/' + account.account_id)
			break

		case 401:
			// handle errors
			break
	}
}

async function deleteAccount(id) {
	const response = await fetch(restAPI + id, {
		method: "DELETE",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json"
		}
	})

	switch (response.status) {
		case 204: // om det togs bort
			hideCurrentPage()
			showPage('/accounts')
			break

		case 400:
			//handle errors
			break
	}
}