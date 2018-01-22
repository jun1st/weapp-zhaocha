import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()

const ws = new WebSocket('ws://zhaocha.leshibaike.com/cable')
ws.onmessage = function (message) {
    console.log(message)
}

ws.onopen = function() {
    let channelData = JSON.stringify({ channel: "PlayChannel" })
    let data = JSON.stringify({ command: "subscribe", identifier: channelData })
    ws.send(data)

    let msg = JSON.stringify({command: 'message', identifier: channelData, data: 'hello how are you'})
    ws.send(msg)
}
