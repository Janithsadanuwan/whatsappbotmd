/*

*/

Janith.antivo.start = async(core) => {
	var data = await core.download()
	if(data.buffer && (data.type == 'image' || data.type == 'video') && core.janith.isviweOnce) {
		await core.reply(string().viweOnce.doing)
		return await core.mediasend(data.type, data.buffer, '*Caption :* ' + data.cap)
	}

	return await core.reply(string().viweOnce.need)
}