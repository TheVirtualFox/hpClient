import {
    setControlPanel,
    setCurrentPreset,
    setIsConnected, setPresetsList,
    setRelaysState,
    setServerTimestamp
} from "../store/useGlobalStore.js";
import { v4 as uuidv4 } from 'uuid';

export class WsService {
    static instance;

    ws = null;
    state = 'disconnected';
    reconnectInterval = null;
    onMessageCallback = null;
    pendingRequests = new Map();

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
                    setServerTimestamp(payload.timestamp);
                    setRelaysState(payload.relaysState);
                    setCurrentPreset(payload.currentPreset);
                    setPresetsList(payload.presetsList);
                    break;
                case "MINUTE_UPDATE":
                    setServerTimestamp(payload.timestamp);
                    break;
                case "RELAYS_STATE_UPDATED":
                    setRelaysState(payload);
                    break;
                case "CONTROL_PANEL_CHANGED":
                    setControlPanel(payload);
                    break;
                case "PRESETS_LIST_CHANGED":
                    setPresetsList(payload);
                    break;
                case "TIMESTAMP_CHANGED":
                    setServerTimestamp(payload.timestamp);
                    break;
                case "CURRENT_PRESET_UPDATED":
                    setCurrentPreset(payload);
                    break;
            }
            if (requestId && this.pendingRequests.has(requestId)) {
                const { res, timeout } = this.pendingRequests.get(requestId);
                clearTimeout(timeout);
                res(message);
                this.pendingRequests.delete(requestId);
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

    sendPromiseMessage(message, timeoutMs = 5000) {
        const requestId = message.requestId || uuidv4(); // 👉 генерируем, если не передан
        message.requestId = requestId;

        return new Promise((res, rej) => {
            const timeout = setTimeout(() => {
                this.pendingRequests.delete(requestId);
                rej(new Error("Ответ не получен по requestId: " + requestId));
            }, timeoutMs);

            this.pendingRequests.set(requestId, { res, rej, timeout });

            this.sendMessage(JSON.stringify(message));
        });
    }

    setOnMessage(callback) {
        this.onMessageCallback = callback;
    }

    getState() {
        return this.state;
    }
}
