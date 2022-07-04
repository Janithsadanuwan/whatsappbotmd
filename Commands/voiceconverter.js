/*

*/
Janith.voicy.start = async(core) => {
	try {
		if(!core.Reply.audio) {
			return await core.send(string().download.needa)
		}

		var data = await core.download()
		fs.writeFileSync(data.buffer, './Janith1.mp3')
		mediasv('./Janith1.mp3').inputFormat('ogg').audioCodec('pcm_s16le').format('wav')
			.save('./Janith.wav')
			.on('end', async() => {
				const text = await audiototext('./Janith.wav')
				await core.send(string().voice.voi_text + '```' + text + '```')
				removefile('./Janith1.mp3')
			})
	} catch(err) {
		return core.send(string().voice.voi_err)
	}
}

Janith.tovoice.start = async(core) => {
	if(!core.Reply.audio) {
		return await core.send(string().download.needa)
	}

	await core.reply(string().editor.cnvt)
	var data = await core.download()
	if(data.type != 'audio') {
		return await core.send('*need audio*')
	}

	await core.mediasend('voice', data.buffer)
}