import {
	AbsoluteFill,
	Audio,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import styled from 'styled-components';
import {v4 as uuid} from 'uuid';
import ringtone from '../assets/ringtone.mp3';
import '../global.css';
import {DonutUnstyled} from '../icons/donut-unstyled';
import {Scribble1} from '../icons/scribble1';
import {Scribble2} from '../icons/scribble2';
import {Scribble3} from '../icons/scribble3';
import {Scribble4} from '../icons/scribble4';
import {Scribble5} from '../icons/scribble5';
import {Scribble6} from '../icons/scribble6';

interface BirthdayCardProps {
	image: string;
	celebrant: string;
	dateOfBirth: string;
}

const BirthdayCard = (props: BirthdayCardProps) => {
	return (
		<>
			<Ringtone />
			<Container>
				<Slide1 {...props} />
				<Slide2 />
			</Container>
		</>
	);
};

const Ringtone = () => {
	return <Audio src={ringtone} startFrom={0} />;
};

const greeting = 'May you have a wonderful day today!';

const Slide1 = ({celebrant, image, dateOfBirth}: BirthdayCardProps) => {
	const frame = useCurrentFrame();

	const multiplier = 14;
	const charsShown =
		frame > 4 * multiplier ? Math.floor((frame - multiplier * 4) / 2) : 0;
	const textToShow = greeting.slice(0, charsShown);

	return (
		<Sequence from={0} layout="none" durationInFrames={443}>
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

			<Scribbles />
			<Sequence from={74}>
				<Donuts />
			</Sequence>
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
	return (
		<>
			{donuts.map(({color, position}) => {
				return (
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
				);
			})}
		</>
	);
};

const Scribbles = () => {
	const frame = useCurrentFrame();
	const duration = 5;

	return (
		<AbsoluteFill>
			<Sequence from={152}>
				<Scribble1
					height={175}
					style={{
						position: 'absolute',
						top: 45,
						left:
							interpolate(frame, [152, 152 + duration], [100, 50], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
				<Scribble4
					height={175}
					style={{
						position: 'absolute',
						right: -155,
						top:
							interpolate(frame, [152, 152 + duration], [50, 5], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
			</Sequence>

			<Sequence from={220}>
				<Scribble2
					height={175}
					style={{
						position: 'absolute',
						top: '50%',
						left:
							interpolate(frame, [220, 220 + duration], [200, 100], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
				<Scribble5
					height={175}
					style={{
						position: 'absolute',
						top: '50%',
						right:
							interpolate(frame, [220, 220 + duration], [200, 90], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
			</Sequence>

			<Sequence from={250}>
				<Scribble3
					height={175}
					style={{
						position: 'absolute',
						top: '80%',
						left:
							interpolate(frame, [250, 250 + duration], [100, 50], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
				<Scribble6
					height={175}
					style={{
						position: 'absolute',
						top: '80%',
						right:
							interpolate(frame, [250, 250 + duration], [180, 90], {
								extrapolateRight: 'clamp',
								extrapolateLeft: 'clamp',
							}) * -1,
					}}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};

const Slide2 = () => {
	return null;
};

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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #0f0f0f;
	padding: 4rem;
	width: 100%;
`;

export default BirthdayCard;
