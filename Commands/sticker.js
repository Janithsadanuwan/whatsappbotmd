/*

*/
const { CanvasImage } = Jnaith
const { superCanvasImageEditor, getColorList } = CanvasImage
Janith.sticker.start = async(core) => {
	var op = {}
	if(core.input) {
		op = core.input.includes('/') ? {
			packname: core.input.split('/')[0],
			author: core.input.split('/')[1]
		} : {
			packname: core.input
		}
	}

	var data = await core.download()
	if(data.buffer && (data.type === 'image' || data.type === 'video')) {
		var dt = await core.reply(string().sticker.download)
		await core.mediasend('sticker', data.buffer, {
			type: data.type,
			...op
		})
		return await core.delete(dt)
	}

	return await core.reply(string().sticker.need)
}


Janith.stickget.start = async(core) => {
	var op = {}
	if(core.input) {
		op = core.input.includes('/') ? {
			packname: core.input.split('/')[0],
			author: core.input.split('/')[1]
		} : {
			packname: core.input
		}
	}

	var data = await core.download()
	if(data.buffer && data.type === 'sticker') {
		var dt = await core.reply(string().sticker.change)
		await core.mediasend(data.type, data.buffer, {
			type: 'sticker',
			...op
		})
		return await core.delete(dt)
	}

	await core.reply(string().sticker.get_need)
}

Janith.wasted.start = Janith.triggered.start = Janith.jail.start = Janith.passed.start = async(core) => {
	var op = {}
	if(core.input) {
		op = core.input.includes('/') ? {
			packname: core.input.split('/')[0],
			author: core.input.split('/')[1]
		} : {
			packname: core.input
		}
	}

	var data = await core.download()
	if(data.buffer && data.type === 'image') {
		var dt = await core.reply(string().sticker.download)
		fs.writeFileSync('./temp/stick.jpg', data.buffer)
		var type = core.command.toLowerCase() === 'triggered' ? 'video' : 'image'
		var buff = await superCanvasImageEditor(core.command.toLowerCase(), await TelegraPh('./temp/stick.jpg'))
		var data_buff = await core.bufferType(buff)
		await core.mediasend('sticker', data_buff.buffer, {
			type: type,
			...op
		})
		removefile('./temp/stick.jpg')
		return await core.delete(dt)
	}

	return await core.reply(string().download.needi)
}