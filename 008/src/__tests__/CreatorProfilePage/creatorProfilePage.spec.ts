/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import 'whatwg-fetch';
import ProfileLayout from '../../routes/u/__layout.reset.svelte';

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

		it('renders label for the number of followers correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			render(ProfileLayout, { getProfileRes: await profileRes.json() });
			const noOfFollowersLabel = screen.getByText('Followers');
			expect(noOfFollowersLabel).toBeInTheDocument();
		});

		it('renders label for the number following correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			render(ProfileLayout, { getProfileRes: await profileRes.json() });
			const noOfFollowingLabel = screen.getByText('Following');
			expect(noOfFollowingLabel).toBeInTheDocument();
		});

		it('renders support button correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			const { getByText } = render(ProfileLayout, {
				getProfileRes: await profileRes.json()
			});

			const supportBtn = getByText('Support');

			expect(supportBtn).toBeEnabled();
		});

		it('renders About section label correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			render(ProfileLayout, { getProfileRes: await profileRes.json() });
			const aboutLabel = screen.getByText('About');
			expect(aboutLabel).toBeInTheDocument();
		});

		it('renders Links section label correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			render(ProfileLayout, { getProfileRes: await profileRes.json() });
			const linksLabel = screen.getByText('Links');
			expect(linksLabel).toBeInTheDocument();
		});

		it('renders Fans section label correctly', async () => {
			const profileRes = await fetch(endpoint, options);

			render(ProfileLayout, { getProfileRes: await profileRes.json() });
			const fansLabel = screen.getByText('Fans');
			expect(fansLabel).toBeInTheDocument();
		});
	});
});
