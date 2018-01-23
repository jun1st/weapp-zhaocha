import 'weapp-adapter'

export default class ActionCable {
    constructor() {
        this.websocket = null
    }

    onOpen() {
        let channelData = JSON.stringify({ channel: "PlayChannel" })
        let data = JSON.stringify({ command: "subscribe", identifier: channelData })
        this.websocket.send(data)
    
        let msg = JSON.stringify({command: 'message', identifier: channelData, data: 'hello how are you'})
        this.websocket.send(msg) 
    }

    onMessage(res) {
        let result = JSON.parse(res.data)
        if (result != null) {
            if (result.type === "confirm_subscription") {
                console.log(result)
                let channelData = JSON.stringify({ channel: "PlayChannel" })
                let messageData = JSON.stringify({message: 'how are you'})
                let msg = JSON.stringify({command: 'message', identifier: channelData, data: messageData})
                this.websocket.send(msg)
            }

            if (result.type !== 'ping') {
                console.log(result.message && result.message.message)
            }
        }
    }

    onClose(args) {
        console.log(args)
    }

    connect(url) {
        this.websocket = new WebSocket(url)

        this.websocket.onmessage = this.onMessage.bind(this)
        this.websocket.onopen = this.onOpen.bind(this)
        this.websocket.onclose = this.onClose.bind(this)
    }
}