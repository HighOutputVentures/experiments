export const resolvers = {
	Query: {
		ping() {
			return 'pong';
		},
	},
	Mutation: {
		pong() {
			return true;
		},
	},
};
