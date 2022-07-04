/*

*/
const {
	load,
	FormData,
	stream,
	promisify
} = require('../store/janith/')
const pipeline = promisify(stream.pipeline)


Janith.removebg.start = async(core) => {
	if(!string().rbgapi) {
		return await core.send(string().removebg.needapi)
	}

	var data = await core.download()
	if(data.type !== 'image') {
		return await core.send(string().download.needi)
	}

	fs.writeFileSync('./Janith123.png', data.buffer)
	await core.reply(string().removebg.edit)
	var form = new FormData()
	form.append('image_file', fs.createReadStream('./Janith123.jpg'))
	form.append('size', 'auto')
	var rbg = await load.stream.post('https://api.remove.bg/v1.0/removebg', {
		body: form,
		headers: {
			'X-Api-Key': string().rbgapi
		}
	})
	await pipeline(rbg, fs.createWriteStream('Janith.png'))

	await core.mediasend('document', 'Janith.png', 'image/png', {}, 'background-removed-Janith-md.png')
	removefile('Janith.png')
	removefile('./Janith123.jpg')
}