/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Layout from '../routes/__layout.svelte';

describe('Landing Page', () => {
	describe('Layout', () => {
		it('shows the welcome text', () => {
			const { getByText } = render(Layout);
			expect(getByText('HOV Labs - Svelte with TDD')).toBeInTheDocument();
			// render(Layout);
			// const welcomeText = screen.getByRole('heading', { name: 'HOV Labs - Svelte with TDD' });
			// expect(welcomeText).toBeTruthy();
			// expect(welcomeText).toBeInTheDocument();
		});
	});
});
