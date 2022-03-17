import {
	Bson,
	GraphQLError,
	GraphQLScalarType,
	Kind,
} from '../../../config/deps.ts';
import { BsonId } from '../../../types.ts';

export default {
	OID: new GraphQLScalarType({
		name: 'OID',
		description: 'ObjectID custom scalar type',
		serialize(value: BsonId) {
			return value.toHexString(); // Convert outgoing Date to integer for JSON
		},
		parseValue(value: string) {
			if (value.length !== 24) {
				throw new GraphQLError('Invalid object id length');
			}
			return new Bson.ObjectId(value); // Convert incoming integer to Date
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.STRING) {
				if (ast.value.length !== 24) {
					throw new GraphQLError('Invalid object id length');
				}
				return new Bson.ObjectId(ast.value); // Convert hard-coded AST string to integer and then to Date
			}
			return null; // Invalid hard-coded value (not an integer)
		},
	}),
};
