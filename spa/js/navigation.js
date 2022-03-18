const restAPI = "http://localhost:8080/rest/"

document.addEventListener('DOMContentLoaded', function(){
	
	const anchors = document.querySelectorAll('a')
	
	for(const anchor of anchors){
		
		anchor.addEventListener('click', function(event){
			event.preventDefault()
			
			const url = anchor.getAttribute('href')

			history.pushState(null, "", url)
			
			hideCurrentPage()
			showPage(url)
			
		})
		
	}
	
	showPage(location.pathname)
	
})

window.addEventListener('popstate', function(){
	
	hideCurrentPage()
	showPage(location.pathname)
	
})


/// FUNCTIONS

function hideCurrentPage(){
	document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url){
	
	let nextPageId
	
	switch(url){
		
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
            // const username = document.getElementById("username").value
            // const password = document.getElementById("password").value
            // console.log(username, password)
            // login(username, password)
			break

        case '/sign-up':
			nextPageId = 'signUp-page'
			break
		
		default:
			if(url.startsWith("/accounts/")){
				const [empty, humans, id] = url.split("/")
				nextPageId = 'account-page'
				loadAccountPage(id)
			}else{
				nextPageId = 'not-found-page'
			}
		
	}
	
	document.getElementById(nextPageId).classList.add('current-page')
	
}

async function loadAccountsPage(){
	
	const response = await fetch(restAPI)
	
	// TODO: Check status code and act accordingly!
	
	const humans = await response.json()
	
	const allHumansUl = document.getElementById('all-accounts')
	allHumansUl.innerText = ""
	
	for(const human of humans){
		
		const li = document.createElement('li')
		
		const anchor = document.createElement('a')
		anchor.innerText = human.username
        
		anchor.setAttribute('href', "/accounts/"+human.account_id)
		anchor.addEventListener('click', function (event){
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

async function loadAccountPage(id){
	
	const response = await fetch(restAPI+id)

	// TODO: Check status code and act accordingly!
	
	const account = await response.json()

    console.log(account)
	
	document.getElementById('account-id').innerText = account.account_id
	document.getElementById('account-username').innerText = account.username
	//document.getElementById('account-password').innerText = account.password
	
}


// --- login ---

let ACCESS_TOKEN = ""
let ACCOUNT_USERNAME = ""

async function login(username, password) {

    const model = {
        username: username,
        password: password
    }

    const response = await fetch(restAPI + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(model)
    })

    switch(response.status){
        case 200:
            const responseBody = await response.json()

            ACCESS_TOKEN = responseBody.token
            ACCOUNT_USERNAME = username

            hideCurrentPage()
            showPage('/')

            break
        
        case 403:
            // handle error
            break
    }

}