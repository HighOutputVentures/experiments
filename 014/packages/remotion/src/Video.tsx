import {Composition} from 'remotion';
import BirthdayCard from './birthday-card';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import MyComp from './MyComp/MyComp';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="BirthdayCard"
				durationInFrames={30 * 25}
				fps={30}
				width={1280}
				height={1280}
				component={BirthdayCard}
				defaultProps={{
					image: 'arjaysitoy.png',
					celebrant: 'Arjay Sitoy',
					dateOfBirth: 'April 2, 2022',
				}}
			/>

			<Composition
				id="MyComp"
				component={MyComp}
				durationInFrames={150}
				height={720}
				width={1280}
				fps={30}
			/>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
