const trackUrl = "https://soundcloud.com/beatman-and-ludmilla/free-download-beatman-and-ludmilla-breakout-breeze-spring-edition-2016-part-i?in=beatman-and-ludmilla/sets/free-download-beatman-and"
const clientId = "111c7b71d7cb0701c3cc21e02d37f5e8"

const urlEnc = (params) => 
	Object.keys(params)
		.map(p => `${p}=${encodeURIComponent(params[p])}`)
		.join("&")

const http = (url, params) => {
	const xhr = new XMLHttpRequest()
	with (xhr) open("GET", url + "?" + urlEnc(params), true), send()
	return new Promise((yep, nope) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return
			if (xhr.status == 200) return yep(xhr.responseText)
			nope(xhr.responseText, xhr.status)
		}
	})
}

http("http://api.soundcloud.com/resolve", {url: trackUrl, client_id: clientId}).then(
	(response) => {
		const data = JSON.parse(response)
		console.log("result", data)
		A.src = data.stream_url + "?" + urlEnc({client_id: clientId})
		A.crossOrigin = "anonymous"
		A.play()
	})


