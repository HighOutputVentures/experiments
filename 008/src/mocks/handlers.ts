// src/mocks/handlers.js
import { rest } from 'msw';
import { mockProfile } from './resolvers/mockProfile';

const endpoint = 'https://beta-api.jamclout.com/graphql';

export const handlers = [
	// Handles a GET /user request
	rest.post(endpoint, mockProfile)
];
