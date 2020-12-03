<template>
  <section id="majlis" class="row center-align">
      <img class="background" src="@/assets/bg.svg">
      <div class="inner"></div>
      <span class="title">Majlis  menghantar Berian, Akad Nikah Dan Doa Selamat</span>
      <hr style="width: 15rem;margin-bottom: 2rem;">
      <div class="name">
        <span>Mohammad Omar bin Dr. Haji Ibrahim</span>
        <span>&</span>
        <span>Nurul Amirah binti Maidin</span>
      </div>
      <div class="waktu">
        <p>Pada Hari Ahad</p>
        <p>27 December 2020M / 13 Syawal 1438H</p>
        <p>Bertempat Di nombor 15, simpang 73, jalan 60, Perumahan Kampong Rimba, Gadong</p>
      </div>
    </section>
</template>

<script>
export default {
  name: "Hajat",
}
</script>

<style lang='scss'>
@import '@/main.scss';
#majlis{
  margin: 5rem auto;
  position: relative;

  .background{
		position: absolute;
		top: -5rem;
		left: -25rem;
		z-index: -1;
		width: 30rem;
		transform: rotate(180deg);
    opacity: .4;
	}

  span{
    display: block;
    &.title {
      font-weight: 700;
      font-size: 20px;
    }
  }

}
</style>