/*

*/
Janith.ffmpeg.start = async(core) => {
	var data = await core.download()
	if(!data.buffer || data.type == 'sticker' || data.type == 'document') {
		return await core.send(string().ffmpeg.need)
	}

	if(data.type == 'audio') {
		fs.writeFileSync(data.buffer, './Janith1234.mp3')
		mediasv('./Janith1234.mp3')
			.audioFilters(core.input)
			.save('Janith.mp3')
			.on('error', err => {
				return
			})
			.on('end', async() => {
				await core.mediasend(data.type, './Janith.mp3')
				removefile('./Janith1234.mp3')
			})
	}

	if(data.type == 'video') {
		fs.writeFileSync(data.buffer, './Janith1234.mp4')
		mediasv('./Janith1234.mp4')
			.videoFilters(core.input)
			.format('mp4')
			.save('Janith.mp4')
			.on('error', err => {
				return
			})
			.on('end', async() => {
				await core.mediasend(data.type, './Janith.mp4', dataDb.caption.setup(core))
				removefile('./Janith1234.mp4')
			})
	}

	if(data.type == 'image') {
		fs.writeFileSync(data.buffer, './Janith1234.jpg')
		mediasv('./Janith1234.jpg')
			.videoFilters(core.input)
			.save('Janith.jpg')
			.on('error', err => {
				return
			})
			.on('end', async() => {
				await core.mediasend(data.type, './Janith.jpg', dataDb.caption.setup(core))
				removefile('./Janith1234.jpg')
			})
	}
}