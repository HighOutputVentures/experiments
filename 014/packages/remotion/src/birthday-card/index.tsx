import {AbsoluteFill, Audio, Img, Sequence, staticFile} from 'remotion';
import styled from 'styled-components';
import ringtone from '../assets/ringtone.mp3';
import '../global.css';
import {Slide1} from './slide-1';

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

const shouldShowRingtone = true;
const Ringtone = () => {
	return shouldShowRingtone ? <Audio src={ringtone} startFrom={0} /> : null;
};

const Slide2 = () => {
	return (
		<Sequence from={300}>
			<AbsoluteFill
				style={{
					backgroundColor: '#fff',
					color: '#000',
					padding: 64,
					alignItems: 'center',
				}}
			>
				<Slide2Logo>
					<Img
						src={staticFile('hov-logo-dark.png')}
						height={80}
						width={80}
						alt=""
					/>
				</Slide2Logo>

				<Slide2Main>
					<Card>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio sit
						pariatur vel quae eligendi ex.
					</Card>
				</Slide2Main>
			</AbsoluteFill>
		</Sequence>
	);
};

const Card = styled.div`
	color: #fff;
	background-color: #1a1d21;
	font-size: 2.8rem;
	padding: 2rem;
	border-radius: 1rem;
`;

const Slide2Main = styled.main`
	padding: 1rem;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Slide2Logo = styled.div`
	margin: 0 auto;
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
