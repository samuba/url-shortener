<script>
	import CocktailIcon from '$lib/IconCocktail.svelte';

	const title = 'Samu.Bar';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<center>
	<header>
		<h1>
			<CocktailIcon style="height: 1.8rem;" color="#3291ff" />
			{title}
		</h1>
		<p>Short URLs served chilled</p>
	</header>

	<slot />
</center>
