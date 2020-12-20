<template>
  <section id="majlis" class="row center-align">
    <img class="background" src="@/assets/bg.svg" />
    <div class="inner"></div>
    <span class="title"
      >Majlis menghantar Berian, Akad Nikah Dan Doa Selamat</span
    >
    <hr style="width: 15rem; margin-bottom: 2rem" />
    <p>
      Dengan penuh hormat dan takzim sukacita menjunjung Pengiran /
      mempersilakan Pehin / Dato / Datin / Awang / Dayang hadir ke majlis
      tersebut di atas bagi / anakanda / adinda / kakanda / peramba / kaola /
      kami:
    </p>
    <div class="name">
      <span class="bold">Mohammad Omar bin Dr. Haji Ibrahim</span>
      <span class="bold">&</span>
      <span class="bold">Nurul Amirah binti Maidin</span>
    </div>
    <div class="waktu">
      <p>Pada Hari Ahad</p>
      <p>
        27 December 2020 <br />
        12 Jamadilawal 1442
      </p>
      <p v-if="side === 'omar'">
        Bertempat Di nombor 15, simpang 73, jalan 60, Perumahan Kampong Rimba,
        Gadong
      </p>
      <p v-if="side === 'amirah'">
        Bertempat Di unit A1, simpang 333, Kampong Serambangun, Tutong
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hajat",
  props: ["side"],
};
</script>

<style lang='scss'>
@import "@/main.scss";
#majlis {
  margin: 5rem auto;
  position: relative;

  .background {
    position: absolute;
    top: -5rem;
    left: -25rem;
    z-index: -1;
    width: 30rem;
    transform: rotate(180deg);
    opacity: 0.4;
  }

  span {
    display: block;
    &.title {
      font-weight: 700;
      font-size: 20px;
    }
  }

  .bold {
    font-weight: 700;
  }
}
</style>