require("dotenv").config()
const WebSocketServer = require("ws").WebSocketServer
const WebSocket = require("ws")
const createServer = require("http").createServer
const PORT = process.env.PORT || 9847
const server = createServer()
const wss = new WebSocketServer({ server })

wss.on("connection", ws => {
    ws.on("error", err => console.error(err))
    ws.on("message", data => {
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data.toString())
            }
        })
    })
})
server.listen(PORT, () => console.log(`Server running on port:${PORT}`))
