import { bytes } from '../config/deps.ts';
import { Context } from '../services/api/types.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = {
	contentType: encoder.encode('Content-Type'),
	filename: encoder.encode('filename'),
	name: encoder.encode(`name="`),
	dashdash: encoder.encode('--'),
	boundaryEqual: encoder.encode('boundary='),
	returnNewline2: encoder.encode('\r\n\r\n'),
	carriageReturn: encoder.encode('\r'),
};

interface FormFile {
	name: string;
	filename: string;
	contentType: string;
	size: number;
	content: Uint8Array;
}

interface Form {
	fields: Record<string, string>;
	files: Record<string, FormFile | FormFile[]>;
}

function splitPiece(piece: Uint8Array) {
	const contentIndex = bytes.indexOf(piece, encode.returnNewline2);
	const headerByte = piece.slice(0, contentIndex);
	const contentByte = piece.slice(contentIndex + 4);

	return { headerByte, contentByte };
}

function getHeaders(headerByte: Uint8Array) {
	const contentTypeIndex = bytes.indexOf(headerByte, encode.contentType);

	// no contentType, it may be a string field, return name only
	if (contentTypeIndex < 0) {
		return getNameOnly(headerByte);
	} // file field, return with name, filename and contentType
	else {
		return getHeaderNContentType(headerByte, contentTypeIndex);
	}
}

function getHeaderNContentType(
	headerByte: Uint8Array,
	contentTypeIndex: number,
) {
	let headers: Record<string, string> = {};

	const contentDispositionByte = headerByte.slice(0, contentTypeIndex - 2);
	headers = getHeaderOnly(contentDispositionByte);

	// jump over Content-Type: - e.g.: Content-Type: application/octet-stream'
	const contentTypeByte = headerByte.slice(
		contentTypeIndex + encode.contentType.byteLength + 2,
	);

	headers.contentType = decoder.decode(contentTypeByte);
	return headers;
}

function getHeaderOnly(headerLineByte: Uint8Array) {
	let headers: Record<string, string> = {};

	const filenameIndex = bytes.indexOf(headerLineByte, encode.filename);
	if (filenameIndex < 0) {
		headers.name = getNameOnly(headerLineByte);
	} else {
		headers = getNameNFilename(headerLineByte, filenameIndex);
	}
	return headers;
}

function getNameNFilename(headerLineByte: Uint8Array, filenameIndex: number) {
	// fetch filename first
	const nameByte = headerLineByte.slice(0, filenameIndex - 2);
	const filenameByte = headerLineByte.slice(
		filenameIndex + encode.filename.byteLength + 2,
		headerLineByte.byteLength - 1,
	);

	const name = getNameOnly(nameByte);
	const filename = decoder.decode(filenameByte);
	return { name, filename };
}

function getNameOnly(headerLineByte: Uint8Array) {
	const nameIndex = bytes.indexOf(headerLineByte, encode.name);
	// jump <name="> and get string inside double quote => "string"
	const nameByte = headerLineByte.slice(
		nameIndex + encode.name.byteLength,
		headerLineByte.byteLength - 1,
	);
	return decoder.decode(nameByte);
}

export default async function uploadFile(
	ctx: Omit<Context, 'services' | 'loaders'>,
	// deno-lint-ignore no-explicit-any
	next: () => Promise<any>,
) {
	const path = ctx.request.url.pathname;

	if (path !== '/upload') return next();

	const contentType = ctx.request.headers.get('content-type');
	if (!contentType?.startsWith('multipart/form-data')) {
		ctx.response.body = 'OK';
		return null;
	}
	let boundary = undefined;

	const contentTypeByte = encoder.encode(contentType);
	const boundaryIndex = bytes.indexOf(
		contentTypeByte,
		encode.boundaryEqual,
	);
	if (boundaryIndex >= 0) {
		// jump over 'boundary=' to get the real boundary
		boundary = contentTypeByte.slice(
			boundaryIndex + encode.boundaryEqual.byteLength,
		);
	}

	if (!boundary) {
		return undefined;
	}
	const body = ctx.request.body({ type: 'stream' });
	let buf: Uint8Array = new Uint8Array();
	let stream: ReadableStreamReadResult<Uint8Array>;
	const reader = body.value.getReader();
	while (!(stream = await reader.read()).done) {
		buf = Uint8Array.from([
			...buf,
			...(stream.value as Uint8Array),
		]);
	}

	const startBoundaryByte = bytes.concat(
		encode.dashdash,
		boundary,
	);
	const endBoundaryByte = bytes.concat(
		startBoundaryByte,
		encode.dashdash,
	);

	const pieces = [];

	while (!bytes.startsWith(buf, endBoundaryByte)) {
		// jump over boundary + '\r\n'
		buf = buf.slice(startBoundaryByte.byteLength + 2);
		const boundaryIndex = bytes.indexOf(buf, startBoundaryByte);
		// get field content piece
		pieces.push(buf.slice(0, boundaryIndex - 2)); // -2 means remove /r/n
		buf = buf.slice(boundaryIndex);
	}

	const form: Form = { fields: {}, files: {} };
	for (const piece of pieces) {
		const { headerByte, contentByte } = splitPiece(piece);
		const headers = getHeaders(headerByte);
		if (typeof headers === 'string') {
			// empty content, discard it
			if (contentByte.byteLength === 1 && contentByte[0] === 13) {
				continue;
			} else {
				// headers = "field1"
				form.fields[headers] = decoder.decode(contentByte);
			}
		} else {
			const file: FormFile = {
				name: headers.name,
				filename: headers.filename,
				contentType: headers.contentType,
				size: contentByte.byteLength,
				content: contentByte,
			};

			// array of files
			if (form.files[headers.name] instanceof Array) {
				(<FormFile[]> form.files[headers.name]).push(file);
			} // if file exists, convert it to array
			else if (form.files[headers.name]) {
				form.files[headers.name] = [
					<FormFile> form.files[headers.name],
					file,
				];
			} // one file only
			else {
				form.files[headers.name] = file;
			}
		}
	}

	await Promise.all(
		(Object.values(form.files) as FormFile[]).map((file) =>
			Deno.writeFile(`bucket/${file.filename}`, file.content)
		),
	);
	ctx.response.body = 'OK';
}
