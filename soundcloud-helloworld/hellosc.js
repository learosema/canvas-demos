const trackUrl = "https://soundcloud.com/beatman-and-ludmilla/sets/free-download-beatman-and"
const clientId = "111c7b71d7cb0701c3cc21e02d37f5e8"

const urlEnc = (params) => 
	Object.Keys(params)
		.map(p => `${p}=${encodeURIComponent(params[p])}`)
		.join("&")

const http = (url, params) => {
	const xhr = new XmlHttpRequest()
	with (xhr) open("GET", url + "?" + urlEnc(params), true), send()
	return new Promise((yep, nope) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return
			if (xhr.statusCode == 200) return yep(xhr.responseText)
			nope(xhr)
		}
	})
}

http("http://api.soundcloud.com/resolve", {url: trackUrl, client_id: clientId})
	.then((response) => console.log(JSON.parse(response))


