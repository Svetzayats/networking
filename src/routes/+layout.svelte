<script lang="ts">
	import { ROUTES, getNetworkerRoute } from '$lib/routes';
	import '../app.css';

	let { children } = $props();
</script>

<nav>
	<a href={ROUTES.HOME}>My Networkers</a>
	<a href={ROUTES.NEW_NETWORKER}>New Networker</a>
	<a href={getNetworkerRoute('1')}>Networker Details</a>
	<a href={ROUTES.PROFILE}>Profile</a>
</nav>

{@render children()}
