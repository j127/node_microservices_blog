# Node Microservices Exercise

Express services:

- `client`
- `posts`
- `comments`
- `event_bus`
- `query`

The event bus receives events to `/events` and broadcasts them to all the other services at their own `/events` routes. It's an example app before switching to NATS.

**Example:** When a new blog post is created (React `POST`s to the posts service), that service sends an event object to the event bus of type `PostCreated` with the post data. The posts service then sends a `201` header back to the browser. The posts service listens for events, but doesn't do anything with them. Same with the comments service. A separate query service saves copies of created posts and comments. The React app _queries_ for data from the query service, but when creating new posts and comments, it `POST`s directly to the posts and comments services to create them. If either of the posts or comments service goes down, the React app will still work (read-only), because it's fetching data from the query service, not the posts or comments services.
