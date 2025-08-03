import { render, screen, cleanup } from '@testing-library/svelte';
import { describe, it, expect, afterEach } from 'vitest';
import NetworkingNetworkerListItem from './NetworkingNetworkerListItem.svelte';
import type { Company } from '$lib/types/company';
import type { Location } from '$lib/types/location';
import type { Tag } from '$lib/types/tag';

describe('NetworkingNetworkerListItem', () => {
	afterEach(() => {
		cleanup();
	});

	const sampleCompany: Company = {
		id: 'company-1',
		name: 'TechCorp Inc.',
		comments: 'Leading technology company'
	};

	const sampleLocation: Location = {
		id: 'location-1',
		name: 'San Francisco, CA'
	};

	const sampleTags: Tag[] = [
		{ id: 'tag-1', name: 'Developer', color: '#3B82F6' },
		{ id: 'tag-2', name: 'React', color: '#10B981' }
	];

	const sampleNetworker = {
		id: 'networker-1',
		name: 'John Doe',
		jobTitle: ['Senior Software Engineer'],
		lastCompany: sampleCompany,
		lastLocation: sampleLocation,
		tags: sampleTags
	};

	it('renders networker information correctly', () => {
		const { container } = render(NetworkingNetworkerListItem, {
			props: { networker: sampleNetworker }
		});

		expect(container.textContent).toContain('John Doe');
		expect(container.textContent).toContain('Senior Software Engineer');
		expect(container.textContent).toContain('TechCorp Inc.');
		expect(container.textContent).toContain('San Francisco, CA');
		expect(container.textContent).toContain('Developer');
		expect(container.textContent).toContain('React');
	});

	it('handles missing job title gracefully', () => {
		const networkerWithoutJobTitle = {
			...sampleNetworker,
			jobTitle: []
		};

		const { container } = render(NetworkingNetworkerListItem, {
			props: { networker: networkerWithoutJobTitle }
		});

		expect(container.textContent).toContain('John Doe');
		expect(container.textContent).not.toContain('Senior Software Engineer');
	});

	it('handles missing company gracefully', () => {
		const networkerWithoutCompany = {
			...sampleNetworker,
			lastCompany: null
		};

		const { container } = render(NetworkingNetworkerListItem, {
			props: { networker: networkerWithoutCompany }
		});

		expect(container.textContent).toContain('John Doe');
		expect(container.textContent).not.toContain('TechCorp Inc.');
	});

	it('handles missing location gracefully', () => {
		const networkerWithoutLocation = {
			...sampleNetworker,
			lastLocation: null
		};

		const { container } = render(NetworkingNetworkerListItem, {
			props: { networker: networkerWithoutLocation }
		});

		expect(container.textContent).toContain('John Doe');
		expect(container.textContent).not.toContain('San Francisco, CA');
	});

	it('handles missing tags gracefully', () => {
		const networkerWithoutTags = {
			...sampleNetworker,
			tags: []
		};

		const { container } = render(NetworkingNetworkerListItem, {
			props: { networker: networkerWithoutTags }
		});

		expect(container.textContent).toContain('John Doe');
		expect(container.textContent).not.toContain('Developer');
		expect(container.textContent).not.toContain('React');
	});
});
