/*

*/
const {
	WithAllModule,
	XoGame
} = Jnaith
const {
	xoturn
} = XoGame
const {
	sendReaction,
	autovoice,
	autosticker,
	AiChatBot,
	botRemove,
	groupLinkRemove,
	antiSpamRemove,
	antidelete
} = WithAllModule

Janith.z_note.start = async(core) => {
	if(core.fromMe || owner.have(core.sender.cut('@')[0])) {
		await Try(sendReaction, core)
	}

	if(!core.fromMe) {
		await Try(botRemove, core)
		await Try(groupLinkRemove, core)
		await Try(antiSpamRemove, core)
		await Try(antidelete, core)
		if(!core.message) {
			return
		}

		await Try(xoturn, core)
		await Try(autovoice, core)
		await Try(autosticker, core)
		await Try(AiChatBot, core)
	}
}