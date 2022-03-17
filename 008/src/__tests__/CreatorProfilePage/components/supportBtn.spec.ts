/**
 * @jest-environment jsdom
 */

import SupportButton from '$lib/components/SupportButton.svelte';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';

describe('Support Button', () => {
	const endpoint = 'https://beta-api.jamclout.com/graphql';
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		}
	};

	it('renders without crashing', async () => {
		const profileRes = await fetch(endpoint, options);
		const resFormatted = await profileRes.json();
		render(SupportButton, {
			creatorData: resFormatted.data.creatorAccount
		});
		const supportBtn = screen.getByRole('button', { name: 'Support' });
		expect(supportBtn).toBeInTheDocument();
	});

	it('simulates click event', async () => {
		const profileRes = await fetch(endpoint, options);
		const resFormatted = await profileRes.json();
		render(SupportButton, {
			creatorData: resFormatted.data.creatorAccount
		});
		const supportBtn = screen.getByRole('button', { name: 'Support' });
		expect(supportBtn).toBeEnabled();

		// userEvent.click(supportBtn);
		await fireEvent.click(supportBtn);
		expect(screen.getByText('Support @Arriele')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Send a tip' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Buy Coin' })).toBeInTheDocument();
	});
});
