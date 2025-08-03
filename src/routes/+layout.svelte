<script lang="ts">
	import { ROUTES } from '$lib/routes';
	import '../app.css';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const currentRoute = $derived(page.url.pathname);

	const activeValue = $derived(
		currentRoute === ROUTES.HOME
			? 'home'
			: currentRoute === ROUTES.NEW_NETWORKER
				? 'new'
				: currentRoute === ROUTES.PROFILE
					? 'profile'
					: 'home'
	);
</script>

<div class="grid min-h-screen grid-rows-[1fr_auto]">
	<!-- Content -->
	<div class="flex items-center justify-center p-4">
		{@render children()}
	</div>

	<!-- Navigation -->
	<Navigation.Bar value={activeValue}>
		<Navigation.Tile
			id="home"
			label="My Networkers"
			href={ROUTES.HOME}
			background="bg-cyan-100"
			active="bg-cyan-300"
			hover="hover:bg-cyan-200">📋</Navigation.Tile
		>
		<Navigation.Tile
			id="new"
			label="New Networker"
			href={ROUTES.NEW_NETWORKER}
			background="bg-cyan-100"
			active="bg-cyan-300"
			hover="hover:bg-cyan-200">➕</Navigation.Tile
		>
		<Navigation.Tile
			id="profile"
			label="Profile"
			href={ROUTES.PROFILE}
			background="bg-cyan-100"
			active="bg-cyan-300"
			hover="hover:bg-cyan-200">⚙️</Navigation.Tile
		>
	</Navigation.Bar>
</div>
