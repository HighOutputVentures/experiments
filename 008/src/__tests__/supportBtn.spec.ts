/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import 'whatwg-fetch';
import SupportButton from '../lib/components/SupportButton.svelte';

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
	});

	it('simulates click events', async () => {
		const profileRes = await fetch(endpoint, options);
		const resFormatted = await profileRes.json();
		const mockFn = jest.fn();
		const { getByText } = render(SupportButton, {
			creatorData: resFormatted.data.creatorAccount
		});

		const supportBtn = getByText('Support');
		expect(supportBtn).toBeInTheDocument();
		expect(supportBtn).toBeEnabled();

		await fireEvent.click(supportBtn);

		expect(mockFn).toHaveBeenCalled();
	});
});
