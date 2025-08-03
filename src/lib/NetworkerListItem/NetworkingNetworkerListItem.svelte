<script lang="ts">
	import type { Networker, NetworkerDataView } from '$lib/types/networker';

	type Props = {
		networker: NetworkerDataView;
		onClick?: (networker: NetworkerDataView) => void;
	};

	let { networker, onClick }: Props = $props();

	let jobTitle = $derived(networker.jobTitle[networker.jobTitle.length - 1] || '');

	function handleClick() {
		if (onClick) {
			onClick(networker);
		}
	}
</script>

<div
	class="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
	role="button"
	tabindex="0"
	aria-label="View details for {networker.name}"
>
	<div class="mb-3">
		<h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
			{networker.name}
		</h3>
		{#if jobTitle}
			<p class="text-sm font-medium text-gray-600 dark:text-gray-300">
				{jobTitle}
			</p>
		{/if}
	</div>

	<div class="mb-3 space-y-2">
		{#if networker.lastCompany}
			<div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
				<svg
					class="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
				<span>{networker.lastCompany.name}</span>
			</div>
		{/if}

		{#if networker.lastLocation}
			<div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
				<svg
					class="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span>{networker.lastLocation.name}</span>
			</div>
		{/if}
	</div>

	{#if networker.tags && networker.tags.length > 0}
		<div class="flex flex-wrap gap-1">
			{#each networker.tags.slice(0, 3) as tag}
				<span
					class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
					style="background-color: {tag.color}20; color: {tag.color}; border: 1px solid {tag.color}40;"
				>
					{tag.name}
				</span>
			{/each}
			{#if networker.tags.length > 3}
				<span
					class="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400"
				>
					+{networker.tags.length - 3} more
				</span>
			{/if}
		</div>
	{/if}
</div>
