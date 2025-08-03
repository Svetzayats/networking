<script lang="ts">
	import NetworkingNetworkerListItem from '$lib/NetworkerListItem/NetworkingNetworkerListItem.svelte';
	import type { Company } from '$lib/types/company';
	import type { Location } from '$lib/types/location';
	import type { Tag } from '$lib/types/tag';

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
</script>

<h1>My Networkers</h1>
<p>Manage your professional network contacts</p>
<NetworkingNetworkerListItem networker={sampleNetworker} />
