import { Bson } from '../config/deps.ts';
import { BsonId } from '../types.ts';

export enum ObjectType {
	ACCOUNT = 0,
	PROJECT = 1,
	RANKED_NODE = 2,
}

export default class ObjectId {
	private value: Uint8Array;
	public oid: BsonId;

	constructor(value: Uint8Array) {
		this.value = value;
		this.oid = new Bson.ObjectId(
			ObjectId.bufferToHex(this.value),
		);
	}

	static parse(value: BsonId) {
		return new this(
			Uint8Array.from(
				value.toHexString().split(/(?=(?:..)*$)/).map((byte) =>
					parseInt(byte, 16)
				),
			),
		);
	}

	static bufferToHex(value: Uint8Array): string {
		return [...value].map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');
	}

	toString(): string {
		return ObjectId.bufferToHex(this.value);
	}

	static generate(type: ObjectType): ObjectId {
		const randomBytes = crypto.getRandomValues(new Uint8ClampedArray(11));
		return new ObjectId(
			Uint8Array.from([type, ...randomBytes]),
		);
	}

	get type(): ObjectType {
		return this.value[0];
	}
}
