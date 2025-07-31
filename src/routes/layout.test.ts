import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Layout from './+layout.svelte';
import { ROUTES } from '$lib/routes';

// Mock the $app/state module
vi.mock('$app/state', () => ({
	page: {
		url: {
			pathname: '/'
		}
	}
}));

describe('Layout Component', () => {
	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	it('should render navigation bar with all navigation items', () => {
		// Create a simple mock child function
		const mockChild = () => '<div>Test Content</div>';
		render(Layout, { props: { children: mockChild } });

		// Check that all navigation items are present
		expect(screen.getByText('My Networkers')).toBeDefined();
		expect(screen.getByText('New Networker')).toBeDefined();
		expect(screen.getByText('Profile')).toBeDefined();
	});

	it('should have correct href attributes for navigation items', () => {
		const mockChild = () => '<div>Test Content</div>';
		render(Layout, { props: { children: mockChild } });

		// Check that navigation items have correct href attributes
		const homeLink = screen.getByText('My Networkers').closest('a');
		const newLink = screen.getByText('New Networker').closest('a');
		const profileLink = screen.getByText('Profile').closest('a');

		expect(homeLink?.getAttribute('href')).toBe(ROUTES.HOME);
		expect(newLink?.getAttribute('href')).toBe(ROUTES.NEW_NETWORKER);
		expect(profileLink?.getAttribute('href')).toBe(ROUTES.PROFILE);
	});

	it('should have proper layout structure', () => {
		const mockChild = () => '<div>Test Content</div>';
		const { container } = render(Layout, { props: { children: mockChild } });

		// Check that the main container has the correct classes
		const mainContainer = container.firstChild as HTMLElement;
		expect(mainContainer?.classList.contains('min-h-screen')).toBe(true);
		expect(mainContainer?.classList.contains('grid')).toBe(true);
		expect(mainContainer?.classList.contains('grid-rows-[1fr_auto]')).toBe(true);
	});
});
