const trackUrl = "https://soundcloud.com/beatman-and-ludmilla/free-download-beatman-and-ludmilla-monthly-dj-mix-for-petofi-mr2-radio-april-2016"
const clientId = "111c7b71d7cb0701c3cc21e02d37f5e8"

const urlEnc = (params) => Object.keys(params)
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

const W = C.width = innerWidth
const H = C.height = innerHeight
const sound = new AudioContext()
const source = sound.createMediaElementSource(A)
const spectrum = sound.createAnalyser()
spectrum.fftSize = 1024
const buffer = new Uint8Array(spectrum.frequencyBinCount)
source.connect(sound.destination)
source.connect(spectrum)
const c = C.getContext("2d")

const loop = (t) => {
	c.fillStyle = "rgba(0,0,0,.2)"
	c.fillRect(0, 0, W, H)
	spectrum.getByteTimeDomainData(buffer)
	const dx = W / buffer.length
	c.beginPath()
	c.lineWidth = 8
	c.globalCompositeOperation = "lighter"
	c.strokeStyle = `hsl(${((t/1e2)|0)%360},100%,50%)`
	c.moveTo(0, buffer[0]/128.0*H/2)
	for (let i = 1; i < buffer.length; i++) {
		c.lineTo(i*dx, buffer[i]/128.0*H/2)
	}	
	c.stroke()
	c.globalCompositeOperation = "source-over"
	requestAnimationFrame(loop)
}


http("http://api.soundcloud.com/resolve", {url: trackUrl, client_id: clientId}).then(
	(response) => {
		const data = JSON.parse(response)
		console.log("result", data)
		A.src = data.stream_url + "?" + urlEnc({client_id: clientId})
		A.crossOrigin = "anonymous"
		A.play()
		
		loop(0)
	})

onkeydown = (e) => {
	if (e.keyCode == 32) {
		if (A.paused) {
			A.play()
		} else {
			A.pause()
		}
	}
}
