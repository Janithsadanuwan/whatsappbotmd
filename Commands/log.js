/*

*/
Janith.log.start = async(core) => {
	if(!core.isgroup) {
		return
	}

	if(!core.Reply) {
		return await core.reply(string().log.need)
	}

	if(core.Reply.text) {
		await core.send(string().log.msg.bind(core.jid, core.Reply.jid.split('@')[0], core.Reply.text), core.me)
		return await core.send(string().log.done)
	}

	var data = await core.download()
	if(data.buffer) {
		if(data.type !== 'document' || data.type !== 'sticker') {
			await core.mediasend(data.type, data.buffer, string().log.msg.bind(core.jid, core.Reply.jid.split('@')[0], data.cap), {}, core.me)
		}

		if(data.type == 'document') {
			await core.mediasend(data.type, data.buffer, data.mime, {}, core.me, 'Janith-md-' + data.mime.replace('/', '.'))
			await core.send(string().log.msg.bind(core.jid, core.Reply.jid.split('@')[0], 'Document'), core.me)
		}

		;
		if(data.type == 'sticker') {
			await core.mediasend('sticker', data.buffer, { type: 'sticker' }, {}, core.me)
			await core.send(string().log.msg.bind(core.jid, core.Reply.jid.split('@')[0], 'STICKER'), core.me)
		}

		return await core.send(string().log.done)
	} else {
		return await core.send(string().log.err)
	}
}