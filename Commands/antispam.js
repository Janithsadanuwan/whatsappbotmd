/*

*/
const {
	Antispam
} = Janith

Janith.antispam.start = async(core) => {
	var protection = new Antispam(core),
		block_sender = false
	if(!await protection.needActive()) {
		return
	}

	await protection.lockGroup()
	await core.reply(string().antispam.reply)
	await core.send(string().antispam.text)
	await protection.active()
	await core.send(string().antispam.text)
	await protection.blockSenderInInbox(block_sender)
}