import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import styled from 'styled-components';
import {v4 as uuid} from 'uuid';
import {DonutUnstyled} from '../icons/donut-unstyled';
import {Scribble1} from '../icons/scribble1';
import {Scribble2} from '../icons/scribble2';
import {Scribble3} from '../icons/scribble3';
import {Scribble4} from '../icons/scribble4';
import {Scribble5} from '../icons/scribble5';
import {Scribble6} from '../icons/scribble6';

export const Slide1 = ({
	celebrant,
	image,
	dateOfBirth,
}: {
	image: string;
	celebrant: string;
	dateOfBirth: string;
}) => {
	const frame = useCurrentFrame();

	const multiplier = 14;
	const charsShown =
		frame > 4 * multiplier ? Math.floor((frame - multiplier * 4) / 1.15) : 0;
	const textToShow = GREETING.slice(0, charsShown);

	return (
		<Sequence from={0} layout="none" durationInFrames={300}>
			<Sequence from={1} layout="none">
				<Img src={staticFile('hov-logo.png')} height={80} width={80} />
			</Sequence>

			<Sequence from={multiplier} layout="none">
				<Greeting>Happy Birthday!</Greeting>
			</Sequence>

			<Sequence from={2 * multiplier} layout="none">
				<Selfie>
					<Img
						width={425}
						height={425}
						src={staticFile(image)}
						alt={celebrant}
					/>
				</Selfie>
			</Sequence>

			<Sequence from={3 * multiplier} layout="none">
				<Celebrant>{celebrant}</Celebrant>
			</Sequence>

			<Sequence from={4 * multiplier} layout="none">
				<Caption>{textToShow}</Caption>
			</Sequence>

			<Sequence from={5 * multiplier} layout="none">
				<DateOfBirth>{dateOfBirth}</DateOfBirth>
			</Sequence>

			<Sequence from={74}>
				<Donuts />
			</Sequence>

			<Scribbles />
			<Shine />
		</Sequence>
	);
};

const Shine = () => {
	return (
		<Sequence from={125} durationInFrames={15}>
			<AbsoluteFill className="shine" />
		</Sequence>
	);
};

type StringOrNumber = string | number;

type DonutItem = {
	color: string;
	position: {
		top: number;
		left?: StringOrNumber;
		right?: StringOrNumber;
	};
};

const donuts: DonutItem[] = [
	{color: '#75AEE5', position: {top: 8, left: '30%'}},
	{color: '#F3B344', position: {top: 10, right: '30%'}},
	{color: '#E44C85', position: {top: 32, left: '5%'}},
	{color: '#33C9B0', position: {top: 35, right: '10%'}},
	{color: '#7070DD', position: {top: 42, left: '25%'}},
	{color: '#33C9B0', position: {top: 64, left: '10%'}},
	{color: '#75AEE5', position: {top: 71, right: '15%'}},
	{color: '#E44C85', position: {top: 78, right: '2%'}},
	{color: '#7070DD', position: {top: 88, right: '12%'}},
	{color: '#F3B344', position: {top: 94, left: '23%'}},
];

const Donuts = () => {
	const start = 0;

	return (
		<>
			{donuts.map(({color, position}, index) => {
				return (
					<Sequence from={start + index}>
						<DonutUnstyled
							key={uuid()}
							style={{
								fill: color,
								width: 32,
								height: 32,
								position: 'absolute',
								...position,
								top: position.top + '%',
							}}
						/>
					</Sequence>
				);
			})}
		</>
	);
};

const Scribbles = () => {
	const frame = useCurrentFrame();
	const duration = 5;
	const startFrame = 86;
	const step = 15;

	const negate = (n: number) => n * -1;

	return (
		<AbsoluteFill>
			<Sequence from={startFrame}>
				<Scribble1
					height={175}
					style={{
						position: 'absolute',
						top: 45,
						left: negate(
							interpolate(
								frame,
								[startFrame, startFrame + duration], // [0, 50]
								[100, 50], // [0, 1]
								{
									extrapolateRight: 'clamp',
									extrapolateLeft: 'clamp',
								}
							)
						),
					}}
				/>
				<Scribble4
					height={175}
					style={{
						position: 'absolute',
						right: -155,
						top: negate(
							interpolate(frame, [startFrame, startFrame + duration], [50, 5], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							})
						),
					}}
				/>
			</Sequence>

			<Sequence from={startFrame + step}>
				<Scribble2
					height={175}
					style={{
						position: 'absolute',
						top: '50%',
						left: negate(
							interpolate(
								frame,
								[startFrame + step, startFrame + step + duration],
								[200, 100],
								{
									extrapolateRight: 'clamp',
									extrapolateLeft: 'clamp',
								}
							)
						),
					}}
				/>
				<Scribble5
					height={175}
					style={{
						position: 'absolute',
						top: '50%',
						right: negate(
							interpolate(
								frame,
								[startFrame + step, startFrame + step + duration],
								[200, 90],
								{
									extrapolateRight: 'clamp',
									extrapolateLeft: 'clamp',
								}
							)
						),
					}}
				/>
			</Sequence>

			<Sequence from={startFrame + step * 2}>
				<Scribble3
					height={175}
					style={{
						position: 'absolute',
						top: '80%',
						left: negate(
							interpolate(
								frame,
								[startFrame + step * 2, startFrame + step * 2 + duration],
								[100, 50],
								{
									extrapolateRight: 'clamp',
									extrapolateLeft: 'clamp',
								}
							)
						),
					}}
				/>
				<Scribble6
					height={175}
					style={{
						position: 'absolute',
						top: '80%',
						right: negate(
							interpolate(
								frame,
								[startFrame + step * 2, startFrame + step * 2 + duration],
								[180, 90],
								{
									extrapolateRight: 'clamp',
									extrapolateLeft: 'clamp',
								}
							)
						),
					}}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};

const GREETING = 'May you have a wonderful day today!';

const Selfie = styled.div`
	margin-top: 4rem;
`;

const DateOfBirth = styled.p`
	font-size: 2rem;
	margin-top: 6rem;
`;

const Caption = styled.p`
	font-size: 2rem;
	margin-top: 1rem;
`;

const Celebrant = styled.h2`
	font-size: 4rem;
	margin-top: 4rem;
`;

const Greeting = styled.h2`
	margin-top: 6rem;
	font-size: 6rem;
	font-family: 'Cardo', serif;
`;
