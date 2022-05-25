import {Img, Sequence} from 'remotion';
import styled from 'styled-components';
import Confetti from '../Confetti';
import '../global.css';
import HovLogo from '../icons/HovLogo';

interface BirthdayCardProps {
	image: string;
	celebrant: string;
	dateOfBirth: string;
}

const BirthdayCard = ({celebrant, image, dateOfBirth}: BirthdayCardProps) => {
	return (
		<Container>
			<Sequence from={0} layout="none">
				<HovLogo height={80} width={80} />
			</Sequence>

			<Sequence from={15} layout="none">
				<Greeting>Happy Birthday!</Greeting>
			</Sequence>

			<Sequence from={30} layout="none">
				<Selfie>
					<Img width={425} height={425} src={image} alt={celebrant} />
				</Selfie>
			</Sequence>

			<Sequence from={45} layout="none">
				<Celebrant>{celebrant}</Celebrant>
			</Sequence>

			<Sequence from={60} layout="none">
				<Caption>May you have a wonderful day today!</Caption>
			</Sequence>

			<Sequence from={75} layout="none">
				<DateOfBirth>{dateOfBirth}</DateOfBirth>
			</Sequence>

			<Sequence from={90}>
				<Confetti />
			</Sequence>
		</Container>
	);
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
