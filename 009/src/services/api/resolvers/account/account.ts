import { Node } from '../../types.ts';

export default {
	Account: {
		id(parent: Node) {
			return parent._id;
		},
	},
};
