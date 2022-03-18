import { GraphQLScalarType, Kind } from '../../../config/deps.ts';
import {
	parseDateTime,
	serializeDateTime,
	serializeDateTimeString,
	serializeUnixTimestamp,
} from '../../../library/date-formatter.ts';
import {
	validateDateTime,
	validateUnixTimestamp,
} from '../../../library/date-validator.ts';

export default {
	DateTime: new GraphQLScalarType({
		name: 'DateTime',
		description:
			'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
			'compliant with the `date-time` format outlined in section 5.6 of ' +
			'the RFC 3339 profile of the ISO 8601 standard for representation ' +
			'of dates and times using the Gregorian calendar.',
		serialize(value) {
			if (value instanceof Date) {
				if ((value)) {
					return serializeDateTime(value);
				}
				throw new TypeError(
					'DateTime cannot represent an invalid Date instance',
				);
			} else if (typeof value === 'string' || value instanceof String) {
				if (validateDateTime(value as string)) {
					return serializeDateTimeString(value as string);
				}
				throw new TypeError(
					`DateTime cannot represent an invalid date-time-string ${value}.`,
				);
			} else if (typeof value === 'number' || value instanceof Number) {
				if (validateUnixTimestamp(value as number)) {
					return serializeUnixTimestamp(value as number);
				}
				throw new TypeError(
					'DateTime cannot represent an invalid Unix timestamp ' +
						value,
				);
			} else {
				throw new TypeError(
					'DateTime cannot be serialized from a non string, ' +
						'non numeric or non Date type ' + JSON.stringify(value),
				);
			}
		},
		parseValue(value) {
			if (!(typeof value === 'string' || value instanceof String)) {
				throw new TypeError(
					`DateTime cannot represent non string type ${
						JSON.stringify(value)
					}`,
				);
			}

			if (validateDateTime(value as string)) {
				return parseDateTime(value as string);
			}
			throw new TypeError(
				`DateTime cannot represent an invalid date-time-string ${value}.`,
			);
		},
		parseLiteral(ast) {
			if (ast.kind !== Kind.STRING) {
				throw new TypeError(
					`DateTime cannot represent non string type ${
						String(ast.kind ?? null)
					}`,
				);
			}
			const { value } = ast;
			if (validateDateTime(value)) {
				return parseDateTime(value);
			}
			throw new TypeError(
				`DateTime cannot represent an invalid date-time-string ${
					String(value)
				}.`,
			);
		},
	}),
};
