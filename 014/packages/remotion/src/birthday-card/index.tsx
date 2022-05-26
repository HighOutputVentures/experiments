import {
	AbsoluteFill,
	Audio,
	Img,
	Sequence,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import styled from 'styled-components';
import ringtone from '../assets/ringtone.mp3';
import Confetti from '../Confetti';
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
	return (
		<div>
			<Audio src={ringtone} startFrom={0} />
		</div>
	);
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
				<Confetti />
			</Sequence>
		</Sequence>
	);
};

type StringOrNumber = string | number;

type DonutItem = {
	color: string;
	showsAtFrame: number;
	position: Partial<{
		top: StringOrNumber;
		left: StringOrNumber;
		right: StringOrNumber;
		bottom: StringOrNumber;
	}>;
};

const donuts: DonutItem[] = [
	{color: '#75AEE5', position: {top: '8%', left: '30%'}, showsAtFrame: 0},
	{color: '#F3B344', position: {top: '10%', right: '30%'}, showsAtFrame: 0},
	{color: '#E44C85', position: {top: '32%', left: '5%'}, showsAtFrame: 0},
	{color: '#33C9B0', position: {top: '35%', right: '10%'}, showsAtFrame: 0},
	{color: '#7070DD', position: {top: '42%', left: '25%'}, showsAtFrame: 0},
	{color: '#33C9B0', position: {top: '64%', left: '10%'}, showsAtFrame: 0},
	{color: '#75AEE5', position: {top: '71%', right: '15%'}, showsAtFrame: 0},
	{color: '#E44C85', position: {top: '78%', right: '2%'}, showsAtFrame: 0},
	{color: '#7070DD', position: {top: '88%', right: '12%'}, showsAtFrame: 0},
	{color: '#F3B344', position: {top: '94%', left: '23%'}, showsAtFrame: 0},
];

const Donuts = () => {
	return (
		<>
			{donuts.map(({color, position, showsAtFrame}) => (
				<Sequence from={showsAtFrame}>
					<DonutUnstyled
						style={{
							fill: color,
							width: 32,
							height: 32,
							position: 'absolute',
							...position,
						}}
					/>
				</Sequence>
			))}
		</>
	);
};

const Scribbles = () => {
	return (
		<AbsoluteFill>
			<Sequence from={152}>
				<Scribble1
					height={175}
					style={{position: 'absolute', left: -50, top: 45}}
				/>
				<Scribble4
					height={175}
					style={{position: 'absolute', right: -155, top: -5}}
				/>
			</Sequence>

			<Sequence from={220}>
				<Scribble2
					height={175}
					style={{position: 'absolute', left: -100, top: '50%'}}
				/>
				<Scribble5
					height={175}
					style={{position: 'absolute', right: -90, top: '50%'}}
				/>
			</Sequence>

			<Sequence from={250}>
				<Scribble3
					height={175}
					style={{position: 'absolute', left: -50, top: '80%'}}
				/>
				<Scribble6
					height={175}
					style={{position: 'absolute', right: -90, top: '80%'}}
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
