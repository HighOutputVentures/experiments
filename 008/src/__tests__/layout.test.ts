/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import 'whatwg-fetch';
import ProfileLayout from '../routes/u/__layout.reset.svelte';

describe('Creator Profile', () => {
	describe('Layout', () => {
		it('sends the username to graphql request upon loading', async () => {
			const endpoint = 'https://beta-api.jamclout.com/graphql';
			const options = {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				}
			};

			const profileRes = await fetch(endpoint, options);

			const { getByText } = render(ProfileLayout, {
				getProfileRes: await profileRes.json()
			});

			expect(getByText('@Arriele')).toBeInTheDocument();

			const button = getByText('Support');
			await fireEvent.click(button);

			expect(getByText('Support @Arriele')).toBeInTheDocument();
		});
	});
});
