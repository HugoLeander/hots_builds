const restAPI = "http://localhost:8080/rest/"

let ACCESS_TOKEN = ""
let ACCOUNT_ID = ""
let IS_ADMIN = false
let IS_LOGGED_IN = false

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

	updateNav(IS_LOGGED_IN)
	showPage(location.pathname)

})

window.addEventListener('popstate', function () {

	hideCurrentPage()
	console.log("pop")
	updateNav(IS_LOGGED_IN)
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
				login(username, password)
			})
			break

		case '/logout':
			nextPageId = 'start-page'
			logout()
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

		case '/createReview':
			nextPageId = 'create-review-page'

			const reviewForm = document.getElementById("createReviewForm")

			reviewForm.addEventListener("submit", function (event) {
				event.preventDefault()

				const createReview_hero_name = document.getElementById("review_hero_name").value
				const createReview_name = document.getElementById("review_name").value
				const createReview_rating = document.getElementById("review_rating").value
				const createReview_description = document.getElementById("review_description").value

				const newReview = {
					hero_name: createReview_hero_name,
					name: createReview_name,
					rating: createReview_rating,
					description: createReview_description,
				}

				createReview(newReview)
			})
			break

		default:
			if (url.startsWith("/accounts/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'account-page'
				loadAccountPage(id)

			} else if (url.startsWith("/updateAccount/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'update-account-page'

				const updateForm = document.getElementById("updateAccountForm")

				updateForm.addEventListener("submit", function (event) {
					event.preventDefault()

					const update_username = document.getElementById("update_username").value
					const update_password = document.getElementById("update_password").value
					const update_confirm_password = document.getElementById("confirm_update_password").value
					const updatedAccount = {
						id: id,
						username: update_username,
						password: update_password,
						confirm_password: update_confirm_password
					}
					console.log(updatedAccount)

					updateAccount(updatedAccount)

				})
			} else if (url.startsWith("/deleteAccount/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'delete-account-page'

				const deleteForm = document.getElementById("deleteAccountForm")
				const yesButton = document.getElementById("yes_button")
				const noButton = document.getElementById("no_button")

				deleteForm.addEventListener("submit", function (event) {
					event.preventDefault()
					if(event.submitter.defaultValue == "No") {
						hideCurrentPage()
						showPage("/accounts/" + id)
					}else{
						deleteAccount(id)
					}
				})
				break
			}
			else if (url.startsWith("/reviews/")) {
				const [empty, review, authorId] = url.split("/")
				nextPageId = 'your-reviews-page'
				loadReviewsPage(authorId)
			}
			else if (url.startsWith("/review/")) {
				const [empty, review, id] = url.split("/")
				nextPageId = 'review-page'
				loadReviewPage(id)

			} else if (url.startsWith("/updateReview/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'update-review-page'

				const updateForm = document.getElementById("updateReviewForm")

				updateForm.addEventListener("submit", function (event) {
					event.preventDefault()

					const updateReview_name = document.getElementById("review_update_name").value
					const updateReview_rating = document.getElementById("review_update_rating").value
					const updateReview_description = document.getElementById("review_update_description").value

					const updatedReview = {
						name: updateReview_name,
						rating: updateReview_rating,
						description: updateReview_description,
					}

					console.log(updatedReview)

					updateReview(updatedReview)

				})
			} else if (url.startsWith("/deleteReview/")) {
				const [empty, humans, id] = url.split("/")
				nextPageId = 'delete-review-page'

				const deleteForm = document.getElementById("deleteReviewForm")
				const yesButton = document.getElementById("delete_review_yes_button")
				const noButton = document.getElementById("delete_review_no_button")

				deleteForm.addEventListener("submit", function (event) {
					event.preventDefault()

					if(event.submitter.defaultValue == "No") {
						hideCurrentPage()
						showPage("/review/" + id)
					}else{
						console.log("deleted")
						deleteReview(id)
					}
				})
			}
			else {
				nextPageId = 'not-found-page'
			}

	}

	document.getElementById(nextPageId).classList.add('current-page')

}

async function loadAccountsPage() {

	const response = await fetch(restAPI + "accounts", {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	})

	const humans = await response.json()

	const allHumansUl = document.getElementById('all-accounts')
	allHumansUl.innerText = ""

	for (const human of humans) {

		const li = document.createElement('li')

		const anchor = document.createElement('a')
		anchor.innerText = human.username

		anchor.setAttribute('href', "/accounts/" + human.id)
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

	const response = await fetch(restAPI + id, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	})
	const account = await response.json()
	console.log(account)

	const UlArr = document.getElementById('update-link')
	UlArr.innerText = ""

	const reviewsLi = document.createElement('Li')
	const updateLi = document.createElement('li')
	const deleteLi = document.createElement('li')

	const anchorReviews = document.createElement('button')
	anchorReviews.innerText = "View all reviews"
	anchorReviews.setAttribute('href', "/reviews/" + id)
	anchorReviews.addEventListener('click', function (event) {
		event.preventDefault()

		const reviewsUrl = anchorReviews.getAttribute('href')

		history.pushState(null, "", reviewsUrl)

		hideCurrentPage()
		showPage(reviewsUrl)
	})

	const anchorUpdate = document.createElement('button')
	anchorUpdate.innerText = "Update account information"
	anchorUpdate.setAttribute('href', "/updateAccount/" + id)
	anchorUpdate.addEventListener('click', function (event) {
		event.preventDefault()

		const updateUrl = anchorUpdate.getAttribute('href')

		history.pushState(null, "", updateUrl)

		hideCurrentPage()
		showPage(updateUrl)
	})

	const anchorDelete = document.createElement('button')
	anchorDelete.innerText = "Delete this account"
	anchorDelete.setAttribute('href', "/deleteAccount/" + id)
	anchorDelete.addEventListener('click', function (event) {
		event.preventDefault()

		const deleteURL = anchorDelete.getAttribute('href')

		history.pushState(null, "", deleteURL)

		hideCurrentPage()
		showPage(deleteURL)
	})

	reviewsLi.appendChild(anchorReviews)
	updateLi.appendChild(anchorUpdate)
	deleteLi.appendChild(anchorDelete)

	if(IS_ADMIN) {
		UlArr.appendChild(reviewsLi)
	}
	UlArr.appendChild(updateLi)
	UlArr.appendChild(deleteLi)

	document.getElementById('account-id').innerText = account.id
	document.getElementById('account-username').innerText = account.username
	document.getElementById('account-password').innerText = account.password

}

async function loadReviewsPage(authorId) {

	const response = await fetch(restAPI + '/reviews/' + authorId, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
		}
	})

	const reviews = await response.json()

	const yourReviewsUl = document.getElementById('your-reviews')
	yourReviewsUl.innerText = ""

	for (const review of reviews) {

		const li = document.createElement('li')

		const anchor = document.createElement('a')
		anchor.innerText = review.hero_name + ": " + review.description

		anchor.setAttribute('href', "/review/" + review.review_id)
		anchor.addEventListener('click', function (event) {
			event.preventDefault()

			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)

			hideCurrentPage()
			showPage(url)
		})
		li.appendChild(anchor)

		yourReviewsUl.appendChild(li)

	}

}

async function loadReviewPage(id) {

	const response = await fetch(restAPI + 'review/' + id, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
		}
	})
	const review = await response.json()

	const crudUl = document.getElementById('crud-links')
	crudUl.innerText = ""

	const updateLi = document.createElement('li')
	const deleteLi = document.createElement('li')

	const anchorUpdate = document.createElement('button')
	anchorUpdate.innerText = "Update review information"
	anchorUpdate.setAttribute('href', "/updateReview/" + id)
	anchorUpdate.addEventListener('click', function (event) {
		event.preventDefault()

		const updateUrl = anchorUpdate.getAttribute('href')

		history.pushState(null, "", updateUrl)

		hideCurrentPage()
		showPage(updateUrl)
	})

	const anchorDelete = document.createElement('button')
	anchorDelete.innerText = "Delete this review"
	anchorDelete.setAttribute('href', "/deleteReview/" + id)
	anchorDelete.addEventListener('click', function (event) {
		event.preventDefault()

		const deleteURL = anchorDelete.getAttribute('href')

		history.pushState(null, "", deleteURL)

		hideCurrentPage()
		showPage(deleteURL)
	})

	updateLi.appendChild(anchorUpdate)
	deleteLi.appendChild(anchorDelete)

	crudUl.appendChild(updateLi)
	crudUl.appendChild(deleteLi)
	
	document.getElementById('review-hero-name').innerText = review.hero_name
	document.getElementById('review-name').innerText = review.name
	document.getElementById('review-rating').innerText = review.rating
	document.getElementById('review-description').innerText = review.description
}

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

			ACCESS_TOKEN = responseBody.access_token
			ACCOUNT_ID = responseBody.id
			IS_ADMIN = responseBody.is_admin 
			IS_LOGGED_IN = true

			hideCurrentPage()
			updateNav(IS_LOGGED_IN)
			showPage('/')

			break

		case 401:
			break


		case 400:
			break
	}
}

function logout() {
	ACCESS_TOKEN = ""
	ACCOUNT_ID = ""
	IS_ADMIN = false
	IS_LOGGED_IN = false
	updateNav(IS_LOGGED_IN)
	showPage('/')
}

function updateNav(isLoggedIn) {
	const navUl = document.getElementById('nav-ul')
	navUl.innerText = ""

	if(isLoggedIn) {
		const navLinks = [
			{link: "/", desc: "Start"},
			{link: "/accounts/"+ACCOUNT_ID, desc: "Your account"},
			{link: "/reviews/"+ACCOUNT_ID, desc: "Your reviews"},
			{link: "/createReview", desc: "Create a new review"},
			{link: "/logout", desc: "Logout"}
		]
		if(IS_ADMIN) {
			navLinks.push({link: "/accounts", desc: "Show all accounts"})
		}
		for (const link of navLinks) {
			const li = document.createElement('li')
			const anchor = document.createElement('a')
			anchor.innerText = link.desc

			anchor.setAttribute('href', link.link)
			anchor.addEventListener('click', function (event) {
				event.preventDefault()

				const url = anchor.getAttribute('href')
				history.pushState(null, "", url)

				hideCurrentPage()
				showPage(url)
			})
		li.appendChild(anchor)
		navUl.appendChild(li)
		}
	}else {
		const navLinks = [
			{link: "/", desc: "Start"},
			{link: "/login"+ACCOUNT_ID, desc: "Login"},
			{link: "/signUp"+ACCOUNT_ID, desc: "Sign up"}
		]
		for (const link of navLinks) {
			const li = document.createElement('li')
			const anchor = document.createElement('a')
			anchor.innerText = link.desc

			anchor.setAttribute('href', link.link)
			anchor.addEventListener('click', function (event) {
				event.preventDefault()

				const url = anchor.getAttribute('href')

				history.pushState(null, "", url)

				hideCurrentPage()
				showPage(url)
			})
		li.appendChild(anchor)
		navUl.appendChild(li)
		}
	}
}

// CRUD FUNCTIONS

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
			showPage('/login')
			break

		case 401:
			break

		case 400:
			break

		case 500:
			break

		default:
			break
	}
}

async function updateAccount(account) {
	const response = await fetch(restAPI + account.id, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		},
		body: JSON.stringify(account)
	})

	switch (response.status) {
		case 204:
			console.log("Carried out the request")
			break

		case 404:
			console.log(account)
			hideCurrentPage()
			showPage('/accounts/' + account.id)
			break

		case 401:
			break
	}
}

async function deleteAccount(id) {
	const response = await fetch(restAPI + id, {
		method: "DELETE",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	})

	switch (response.status) {
		case 204: 
			hideCurrentPage()
			showPage('/accounts')
			break

		case 400:
			break
	}
}

async function createReview(review) {
	const response = await fetch(restAPI + "review", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		},
		body: JSON.stringify(review)
	})

	switch (response.status) {
		case 201:
			const createdReview = await response.json()
			const reviewId = createdReview.review_id

			hideCurrentPage()
			showPage('/review/'+reviewId)
			break

		case 401:
			break

		case 400:
			break

		case 500:
			break

		default:
			break
	}
}

async function updateReview(review) {
	const response = await fetch(restAPI + 'review/' + review.review_id, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		},
		body: JSON.stringify(review)
	})

	switch (response.status) {
		case 204:
			console.log("Carried out the request")
			break

		case 404:

		case 401:
			break
	}
}

async function deleteReview(id) {
	console.log(restAPI + 'review/' + id)
	const response = await fetch(restAPI + 'review/' + id, {
		method: "DELETE",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": "Bearer " + ACCESS_TOKEN
		}
	})

	switch (response.status) {
		case 204:
			hideCurrentPage()
			showPage('/')
			break

		case 400:
			break
	}
}