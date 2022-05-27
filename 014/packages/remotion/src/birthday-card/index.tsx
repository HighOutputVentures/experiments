import {Audio} from 'remotion';
import styled from 'styled-components';
import ringtone from '../assets/ringtone.mp3';
import '../global.css';
import {Slide1} from './slide-1';
import {Slide2} from './slide-2';

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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #0f0f0f;
	padding: 4rem;
	width: 100%;
`;

export default BirthdayCard;
