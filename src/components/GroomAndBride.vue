<template>
  <section id="omar-amirah" class="row center-align">
		<div id="omar" class="name">
			<span class="name-text">Omar</span>
			<span class="name-highlight"></span>
		</div>
		<img src="@/assets/diamond-ring.svg" alt="diamond=ring" >
		<div id="amirah" class="name">
			<span class="name-text">Amirah</span>
			<span class="name-highlight"></span>
		</div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
@import '@/main.scss';

#omar-amirah {
	margin-top: 2rem;
	margin-bottom: 10rem;
	font-family: $welcomeFont;
	color: $mainFontColor;
	font-weight: 700;
	padding: 0;

	&::before{
		content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.2;
    background-image: url('~@/assets/bg.png');
    background-repeat: no-repeat;
    background-position: 50% -12rem;
    background-size: 80rem 45rem;
	}
	.name{
		position: relative;
	}

	.name-text{
		display: block;
		margin: auto;
		padding: 2rem;
		font-size: 4rem;
		line-height: 0rem;
	}

	.name-highlight{
		display: block;
		margin: auto;
		background-color: $secondaryColor;
		height: .5rem;
	}

	#omar{
		.name-text{
			width: 17rem;
		}
		.name-highlight{
			width: 10rem;
		}
	}

	#amirah{
		.name-text{
			width: 17rem;
		}
		.name-highlight{
			width: 13rem;
		}
	}
	img{
		width: 4rem;
		margin: 2rem;
		padding-top: 1rem;
	}
}

</style>