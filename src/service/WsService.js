import {setControlPanel, setIsConnected} from "../store/useGlobalStore.js";

export class WsService {
    static instance;

    ws = null;
    state = 'disconnected';
    reconnectInterval = null;
    onMessageCallback = null;

    constructor() {
        if (WsService.instance) return WsService.instance;
        WsService.instance = this;

        this.connect();
    }

    connect() {
        this.ws = new WebSocket("ws://localhost:8080");

        this.ws.onopen = () => {
            this.state = 'connected';
            setIsConnected(true);
            console.log('[WS] Подключено');
            if (this.reconnectInterval) {
                clearInterval(this.reconnectInterval);
                this.reconnectInterval = null;
            }
        };

        this.ws.onmessage = (event) => {

            const data = event.data;
            const message = JSON.parse(data);
            const {action, payload, requestId} = message;
            console.log("onmessage", message);
            switch (action) {
                case "CLIENT_CONNECTED":
                    setControlPanel(payload.controlPanel);
                    break;
            }
            //
            if (this.onMessageCallback) {
                this.onMessageCallback(event.data);
            }
        };

        this.ws.onclose = () => {
            this.state = 'reconnecting';
            setIsConnected(false);
            console.warn('[WS] Отключено. Повторное подключение...');
            if (!this.reconnectInterval) {
                this.reconnectInterval = setInterval(() => {
                    this.connect();
                }, 3000);
            }
        };

        this.ws.onerror = (err) => {
            console.error("[WS] Ошибка:", err);
            this.ws.close(); // Вызовет onclose
        };
    }

    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.warn("Соединение не установлено");
        }
    }

    setOnMessage(callback) {
        this.onMessageCallback = callback;
    }

    getState() {
        return this.state;
    }
}
