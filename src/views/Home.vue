<template>
  <div class="home">
    <!-- <P5Background/> -->

    <GroomAndBride class="animate__animated animate__fadeIn animate__delay-2s"/>

    <Jemputan class='animate__animated animate__fadeInUp animate__delay-3s' :nama='nama' :kampong='kampong' :side='side'/>

    <section v-if="geng != ''" id="customMessage" class="row center-align">
      <p>
        {{ customMessage }}
      </p>
    </section>
    
    <Majlis class='animate__animated animate__fadeInUp animate__delay-4s' :side='side'/>

    <Tentative class='animate__animated animate__fadeInUp animate__delay-4s' :side="side"/>

    <Address class='animate__animated animate__fadeInUp animate__delay-4s' :side='side'/>
    
  </div>
</template>

<script>
import P5Background from '@/components/P5Background.vue'
import GroomAndBride from '@/components/GroomAndBride.vue'
import Jemputan from '@/components/Jemputan.vue'
import Majlis from '@/components/Hajat.vue'
import Tentative from '@/components/Tentative.vue'
import Address from '@/components/Address.vue'

export default {
  name: 'Home',
  components: {
    P5Background,
    GroomAndBride,
    Jemputan,
    Majlis,
    Tentative,
    Address,
  },
  data() {
    return {
      nama: '',
      kampong: '',
      geng: '',
      customMessage: '',
      side: '',
      gengs: {
        tahfiz: 'hello geng tapisssssss',
        dymk: 'hello geng dynamiiiiik'
      },
    }
  },
  created(){
    this.nama = this.$route.query.n || 'Awang Omar bin Haji Ibrahim';
    this.kampong = this.$route.query.k || 'Rimba';
    this.side = this.$route.query.s
    this.geng = this.$route.query.geng || '';
    this.customMessage = this.gengs[this.geng]
  }
}
</script>

<style lang="scss">
@import '@/main.scss';
body {
  font-family: $welcomeFont;
}
.home {
  overflow: hidden;
  margin: auto;
  padding: 2rem;
  max-width: 30rem;
}
.p5Canvas {
  width: 100% !important;
  position: fixed;
	top: 0%;
	left: 0%;
	z-index: -30;
}
</style>
