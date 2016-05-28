const clientId = "111c7b71d7cb0701c3cc21e02d37f5e8"
const trackUrl = "https://soundcloud.com/chris_huelsbeck/techno-dungeon"

const urlEnc = (params) => Object.keys(params)
	.map(p => `${p}=${encodeURIComponent(params[p])}`)
	.join("&")

const http = (url, params) => {
	const xhr = new XMLHttpRequest()
	with (xhr) open("GET", url + "?" + urlEnc(params), true), send()
	return new Promise((yep, nope) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState != 4) return
			(xhr.status == 200 ? yep : nope)(xhr.responseText)
		}
	})
}

let W = C.width = innerWidth
let H = C.height = innerHeight
const sound = new AudioContext()
const source = sound.createMediaElementSource(A)
const spectrum = sound.createAnalyser()
spectrum.fftSize = 1024
const buffer = new Uint8Array(spectrum.frequencyBinCount)
source.connect(sound.destination)
source.connect(spectrum)
const c = C.getContext("2d")

const loop = (t) => {
	c.fillStyle = "rgba(0,0,0,.1)"
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

const load = (url) => http("http://api.soundcloud.com/resolve", {url: url, client_id: clientId}).then(
	(response) => {
		const data = JSON.parse(response)
		console.log("result", data)
		if (data.stream_url) {
			A.crossOrigin = "anonymous"
			A.src = data.stream_url + "?" + urlEnc({client_id: clientId})
			A.play()
		}
	})

addEventListener('keydown', (e) => {
	if (e.keyCode == 32) {
		if (A.paused) {
			A.play()
		} else {
			A.pause()
		}
	}
})

addEventListener('resize', () => {
	W = C.width = innerWidth
	H = C.height = innerHeight
})

loop(0)
load(trackUrl)
