/* eslint-disable react/no-danger */
import {
	AbsoluteFill,
	Img,
	interpolate,
	Sequence,
	staticFile,
	useCurrentFrame
} from 'remotion';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

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

const messages = [
	{
		from: 'estella',
		date: '8:53 AM',
		message:
			"<p>Happy Birthday Jelo! You've been a great addition to the team! Enjoy your day. And to many more birthday celebrations with us here at HOV! Tara coffee! <3</p> ~ yours truly, Ate E.",
	},
	{
		from: 'jynn',
		date: '8:53 AM',
		message:
			'Happy birthday! i wish you all the best and thanks for always being there 🙌 To more birthdays and blessings Sensei 😊',
	},
	{
		from: 'Arriele',
		date: '8:53 AM',
		message:
			'Happy Birthday Jelo! For an intern you have done such a great job, so keep it up! God bless always and more more birthdays to come <3',
	},
	{
		from: 'Lord Adrian Tisbe',
		date: '8:53 AM',
		message: 'Happiest Birthday Senpapi. Salamat po sa pa carry.',
	},
	{
		from: 'Lord Adrian Tisbe',
		date: '8:53 AM',
		message: 'Happiest Birthday Senpapi. Salamat po sa pa carry.',
	},
	{
		from: 'Jade',
		date: '8:53 AM',
		message:
			'Wishing you a fantastic birthday and a wonderful year ahead. Make every day count. Happy Birthday, Jelo!',
	},
];

const Messages = () => {
	const frame = useCurrentFrame();

	return (
		<>
			{[messages[0]].map(({from, message, date}) => {
				const left = interpolate(frame, [0, 30], [-100, 10], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});

				const right = interpolate(frame, [30, 60], [10, -100], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});

				return (
					<Card
						key={uuid()}
						style={{
							left: frame <= 40 ? left + '%' : undefined,
							right: right + '%',
						}}
					>
						<CardHeader>
							Greetings from <em>@{from}</em> • Today at {date}
						</CardHeader>

						<p
							dangerouslySetInnerHTML={{
								__html: message,
							}}
						/>
					</Card>
				);
			})}
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
