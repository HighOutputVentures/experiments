// src/mocks/resolvers/mockUser.js
import CREATOR_ACCOUNT_DATA from './mockData.json';

export const mockProfile = (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			data: CREATOR_ACCOUNT_DATA
		})
	);
};
