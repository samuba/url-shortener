<script lang="ts">
	import { page } from '$app/stores';
	import CreateLink from './_createLink.svelte';

	export let url = $page.query.get('url') ?? '';
	export let customSlug = $page.query.get('customSlug') ?? '';
</script>

<CreateLink bind:url bind:customSlug />
