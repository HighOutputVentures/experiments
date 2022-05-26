import React, {useMemo} from 'react';
import {AbsoluteFill, random} from 'remotion';
import Confetto from '../components/Confetto';

const dropCount = 50;

const Confetti: React.FC = () => {
	const drops = useMemo(() => {
		return new Array(dropCount).fill(true).map((_, i) => {
			const x = random('x' + i) * 100 + '%';
			const delay = random('delay' + i) * 60;
			const size = random('size' + i) + 0.2;
			return {x, delay, size};
		});
	}, []);

	return (
		<AbsoluteFill>
			{drops.map((d, k) => {
				return (
					<Confetto
						x={d.x}
						delay={d.delay}
						size={d.size}
						type={['donut', 'scribble'][Math.floor(k % 2)]}
					/>
				);
			})}
		</AbsoluteFill>
	);
};

export default Confetti;
