/*

*/
const {
	webdl
} = require('../store/janith/')

var ffmpeg = require('fluent-ffmpeg')

Janith.mp3a.start = async(core) => {
	try {
		var data = await core.download()
		if(data.type !== 'video') {
			return await core.send(string().converter.mp4audio_need)
		}

		var up = await core.send(string().converter.mp4audio)
		var datas = await core.bufferType(data)
		datas.ext = datas.ext.replace('.', '')
		var ext = datas.ext === 'bin' ? 'mp4' : datas.ext
		fs.writeFileSync('./Janith.' + ext, data.buffer)

		ffmpeg('./Janith.' + ext)
			.format('mp3')
			.save('./Janith.mp3')
			.on('error', err => {
				return
			})
			.on('end', async() => {
				await core.mediasend('audio', './Janith.mp3')
				await core.delete(up)
				removefile('./Janith.' + ext)
				removefile('./Janith.mp3')
			})
	} catch(e) {
		console.log(e)
	}
}

Janith.photo.start = async(core) => {
	var data = await core.download()
	if(data.type !== 'sticker' || core.Reply.isAnimated) {
		return await core.send(string().converter.sticker_need_n)
	}

	var up = await core.send(string().converter.sticker)
	fs.writeFileSync('./Janith.webp', data.buffer)
	mediasv('./Janith.webp')
		.fromFormat('webp_pipe')
		.save('./Janith.jpg')
		.on('error', err => {
			return
		})
		.on('end', async() => {
			await core.mediasend('image', './Janith.jpg', dataDb.caption.setup(core))
			await core.delete(up)
			removefile('./Janith.webp')
			removefile('./Janith.jpg')
		})
}

Janith.vsticker.start = async(core) => {
	var data = await core.download()
	if(data.type !== 'sticker' || !core.Reply.isAnimated) {
		return await core.send(string().converter.sticker_need)
	}

	var up = await core.send(string().converter.anim)
	fs.writeFileSync('./Janith2.webp', data.buffer)
	var { result } = await webp2mp4File('./Janith2.webp')
	await core.mediasend('video', result, dataDb.caption.setup(core))
	await core.delete(up)
	removefile('./Janith2.webp')
}