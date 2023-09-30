const WebSocketServer = require("ws").WebSocketServer
const WebSocket = require("ws")
const createServer = require("http").createServer
const PORT = 8080

const server = createServer()
const wss = new WebSocketServer({ server })

wss.on("connection", function connection(ws) {
    ws.on("error", console.error)
    ws.on("message", function message(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data.toString())
            }
        })
    })
})

server.listen(PORT, () => console.log(`Server running on port:${PORT}`))
