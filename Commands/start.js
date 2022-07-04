/*

*/
const { BootBot } = Jnaith

Janith.shutdown.start = async(core) => {
	BootBot('shutdown')
	await core.send(string().start.shutdown.done)
}

Janith.start.start = async(core) => {
	await core.send(string().start.start.boot)
	BootBot('start')
	await core.send(string().start.start.done)
}