/** @format */

const RPC = require('discord-rpc')
const rpc = new RPC.Client({ transport: 'ipc' })

const clientId = 'YOUR_CLIENT_ID'

rpc.on('ready', () => {
  rpc.setActivity({
    details: 'Browsing the web',
    state: 'In a state of deep thought',
    startTimestamp: new Date(),
    largeImageKey: 'large-image',
    largeImageText: 'Large Image Text',
    smallImageKey: 'small-image',
    smallImageText: 'Small Image Text',
    instance: false,
  })
  console.log('Rich Presence is now active.')
})

rpc.login({ clientId }).catch(console.error)
