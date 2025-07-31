import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	afterEach(() => {
		cleanup();
	});

	it('should render h1 with correct text', () => {
		render(Page);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeDefined();
		expect(heading.textContent).toBe('My Networkers');
	});

	it('should render description paragraph', () => {
		render(Page);

		const descriptions = screen.getAllByText('Manage your professional network contacts');
		expect(descriptions).toHaveLength(1);
		expect(descriptions[0].tagName).toBe('P');
	});
});
