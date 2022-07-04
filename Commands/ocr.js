/*

Coded By Ravindu Janith
*/
const {
	Readimage
} = require('../store/janith/')


Janith.ocr.start = async(core) => {
	var load = await core.download()
	if(load.type !== 'image') {
		return await core.send(string().download.needi)
	}

	await core.reply(string().ocr.geting)
	var language = core.input && searchlanguage(core.input).data2 ? searchlanguage(core.input).data2 : 'eng'
	try {
		var {
			data: {
				text
			}
		} = await Readimage.recognize(load.buffer, language)
		if(!text || text === '  ') {
			return await core.reply(string().ocr.err.bind(' Empty text'))
		}

		return await core.reply(string().ocr.data.bind(language, text))
	} catch(e) {
		return await core.reply(string().ocr.err.bind(e))
	}
}