/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import 'whatwg-fetch';
import ProfileLayout from '../routes/u/__layout.reset.svelte';

describe('Creator Profile', () => {
	describe('Layout', () => {
		const endpoint = 'https://beta-api.jamclout.com/graphql';
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		};

		it('renders without crashing', async () => {
			const profileRes = await fetch(endpoint, options);
			render(ProfileLayout, {
				getProfileRes: await profileRes.json()
			});
		});

		it('renders username correctly', async () => {
			const profileRes = await fetch(endpoint, options);
			const { getByText } = render(ProfileLayout, {
				getProfileRes: await profileRes.json()
			});

			expect(getByText('@Arriele')).toBeInTheDocument();
		});

		it('renders support button correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			const { getByText } = render(ProfileLayout, {
				getProfileRes: await profileRes.json()
			});

			const supportBtn = getByText('Support');

			expect(supportBtn).toBeEnabled();
		});
	});
});
