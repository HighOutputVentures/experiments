import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame,
} from 'remotion';
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
					<Messages />
				</Main>
			</AbsoluteFill>
		</Sequence>
	);
};

const Messages = () => {
	const frame = useCurrentFrame();

	const left = interpolate(frame, [0, 30], [-100, 10], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const right = interpolate(frame, [60, 90], [10, -100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<>
			<Card
				style={{
					left: frame <= 40 ? left + '%' : undefined,
					right: right + '%',
				}}
			>
				<CardHeader>
					Greetings from <em>@estella</em> • Today at 8:53 AM
				</CardHeader>

				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio sit
					pariatur vel quae eligendi ex.
				</p>
			</Card>
		</>
	);
};

const CardHeader = styled.div`
	font-size: 2rem;

	& em {
		color: #75aee5;
		font-style: normal;
	}
`;

const Card = styled.div`
	color: #fff;
	position: absolute;
	background-color: #1a1d21;
	font-size: 2.75rem;
	padding: 3rem;
	border-radius: 1rem;
	width: 80%;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	gap: 1rem;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Main = styled.main`
	padding: 1rem;
	flex-grow: 1;
	overflow: hidden;
`;

const Logo = styled.div`
	margin: 0 auto;
`;
