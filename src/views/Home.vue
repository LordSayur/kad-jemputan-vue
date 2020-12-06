<template>
  <div>
    <div class="home">
      <!-- <P5Background/> -->
    
      <GroomAndBride class="animate__animated animate__fadeIn animate__delay-2s"/>
    
      <Jemputan class='animate__animated animate__fadeInUp animate__delay-3s' :nama='nama' :kampong='kampong' :side='side' :geng='geng'/>
      
      <Majlis class='animate__animated animate__fadeInUp animate__delay-4s' :side='side'/>
    
      <Tentative class='animate__animated animate__fadeInUp animate__delay-4s' :side="side"/>
    
      <!-- Makluman -->
      <div class='animate__animated animate__fadeInUp animate__delay-4s'>
        <h5>{{ title }}</h5>
        <div v-html='content' style="margin-bottom: 3rem;"></div>
      </div>
    
      <Address class='animate__animated animate__fadeInUp animate__delay-4s' :side='side'/>
    </div>

    <div class='animate__animated animate__fadeInUp animate__delay-4s'>
      <h6 style="text-align: center;text-decoration: underline;margin-bottom: 1rem;"><a href="https://wsb.netlify.app/">Waktu Sembahyang Brunei</a></h6>
      <iframe src="https://wsb.netlify.app/" style="height: 35rem; width: 100%" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
// import P5Background from '@/components/P5Background.vue'
import GroomAndBride from '@/components/GroomAndBride.vue'
import Jemputan from '@/components/Jemputan.vue'
import Majlis from '@/components/Hajat.vue'
import Tentative from '@/components/Tentative.vue'
import Address from '@/components/Address.vue'

const fb = require('@/firebaseConfig.js')

export default {
  name: 'Home',
  components: {
    // P5Background,
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
      side: '',
      title: '',
      content: '<p></p>'
    }
  },
  created(){
    this.nama = this.$route.query.n || '';
    this.kampong = this.$route.query.k || '';
    this.side = this.$route.query.s || 'omar'
    this.geng = this.$route.query.g || '';
    this.getDataFromFB()
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').onSnapshot((document) => {
        let item = document.data().makluman;
        let makluman = item[this.side === 'omar' ? 'omar' : 'amirah']
        this.title = makluman.title;
        this.content = makluman.content;
      });
    },
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
