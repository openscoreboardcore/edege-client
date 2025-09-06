// List of websocket topics.
import pubsub from "@/lib/pubsub";

import { TopicRouter } from "@/lib/ws/TopicRouter";

const topicRouter = new TopicRouter();

// Register
topicRouter.register(
	"match-{id}",
	(params, payload) => {
		console.log("match message", params, payload);
		if (payload && typeof payload === "object") {
			pubsub.publish("match-update", payload);
		}
	}
	// MatchController.handleMessage(params, payload)

	// { "type": "subscribe", "topic": "match-N2213" }
	// { "type": "publish", "topic": "match-N2213", "message": "test" }
	// { "type": "publish", "topic": "match-N2213", "message": {"homeTeam": "team1", "awayTeam": "team2", "status": "in_progress", "time": 120, "score": {"home": 1, "away": 2}}, "part": "Kwart 1" }
);

topicRouter.register("screen-{id}", (params, payload) => {
	console.log("scoreBoard message", params, payload);
	if (payload && typeof payload === "object") {
		pubsub.publish("screen-update", payload);
	}
});

export default topicRouter;
