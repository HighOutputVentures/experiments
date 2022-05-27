import {AbsoluteFill, Img, Sequence, staticFile} from 'remotion';
import styled from 'styled-components';

export const Slide2 = () => {
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
				<Logo>
					<Img
						src={staticFile('hov-logo-dark.png')}
						height={80}
						width={80}
						alt=""
					/>
				</Logo>

				<Main>
					<Card>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio sit
						pariatur vel quae eligendi ex.
					</Card>
				</Main>
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

const Main = styled.main`
	padding: 1rem;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Logo = styled.div`
	margin: 0 auto;
`;
