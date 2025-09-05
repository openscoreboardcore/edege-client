/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/pubsub.ts
type Callback<T = any> = (data: T) => void;

class PubSub {
	private listeners: Record<string, Callback[]> = {};

	subscribe(topic: string, callback: Callback) {
		if (!this.listeners[topic]) this.listeners[topic] = [];
		this.listeners[topic].push(callback);

		return () => {
			this.listeners[topic] = this.listeners[topic].filter(
				(cb) => cb !== callback
			);
		};
	}

	publish(topic: string, data?: any) {
		this.listeners[topic]?.forEach((cb) => cb(data));
	}
}

export default new PubSub();
