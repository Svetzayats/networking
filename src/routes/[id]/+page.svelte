<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const { id } = page.params;

	const mode = $derived(page.url.searchParams.get('mode'));
</script>

{#if mode === 'edit'}
	<h2>Edit Networker</h2>
{:else}
	<h2>View Networker</h2>
{/if}
<p>View and manage networker details {id}</p>
