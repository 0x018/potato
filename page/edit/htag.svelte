<script>
	export let html;
	export let link;
	export let style;
</script>
<!-- link load -->
{#if link}
{#await load(link,{type:'css'})}
<p>...load...</p>
{:then value}
{@html `<style>${value}</style>`}
{:catch error}
<p>load css error: {error.message}</p>
{/await}
{/if}
<!-- style -->
{#if style}
{@html `<style>${style}</style>`}
{/if}

{@html (html||"")}
