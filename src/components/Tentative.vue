<template>
  <section id="tentative" class="row center-align hide-behind">
      <img class="background" src="@/assets/bg.svg">
      <div class="inner">
        <span class="title">Atucara Majlis</span><span :class="`live ${showCountDown ? '': 'glowing'}`">Live Update</span>
        <hr style="width: 15rem;margin-bottom: 2rem;">
        <div v-show="showCountDown">
          <p>Live Update akan bermula dalam</p>
          <p class="count-down">{{ countDown }}</p>
        </div>
        <Agenda v-for="(agenda, index) in Agendas" :key="index" :agenda='agenda' />
      </div>
    </section>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import Agenda from './Agenda'
export default {
  name: 'Tentative',
  components: { Agenda},
  props: {
    side: {
      default: 'omar'
    }
  },
  data() {
    return{
      agendas: {
        omar: [],
        amirah: [],
      },
      countDown: '',
      showCountDown: true,
    }
  },
  async created(){
    this.getDataFromFB()
    this.startCountDown()
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.omaramirah.doc('agendas').onSnapshot((document) => {
        let item = document.data().agendas;
        this.agendas = item
      });
    },
    startCountDown() {
      const countDownDate = new Date("Dec 27, 2020 11:00:00").getTime();
      let countDown = setInterval(() => {
        const now = new Date().getTime();

        const distance = countDownDate - now;

        if (distance < 0) {
          this.showCountDown = false
          clearInterval(countDown)
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countDown = `${days > 0 ? days + 'd':''} ${hours > 0 ? hours + 'h':''} ${minutes > 0 ? minutes + 'm':''} ${seconds > 0 ? seconds + 's':''}`
      }, 1000);
    }
  },
  computed:{
    Agendas() {
      return this.agendas[this.side === 'omar' ? 'omar' : 'amirah']
    },
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
#tentative{
  margin: 5rem auto;
  position: relative;

  .background{
		position: absolute;
		top: -5rem;
		left: 19rem;
		z-index: -1;
		width: 30rem;
		transform: rotate(180deg);
    opacity: .4;
	}

  span{
    display: block;
    &.title {
      display: inline-block;
      font-weight: 700;
      font-size: 20px;
    }
    &.live {
      display: inline-block;
      background-color:#ffc9b7;
      color: white;
      margin-left: 1rem;
      padding: .3rem;
      border-radius: .5rem;
      font-size: 10px;
    }
    &.glowing {
      -webkit-animation: glow 0.5s ease-in-out infinite alternate;
      -moz-animation: glow 0.5s ease-in-out infinite alternate;
      animation: glow 0.5s ease-in-out infinite alternate;
    }
  }

  .berharap {
    border: 1px solid #d3d3d3;
    padding: 1.5rem;
    margin-top: 3rem;
  }

  li{
    margin: .5rem;
  }
}
@-webkit-keyframes glow {
  from {
      background-color:#f1f1f1;
    // text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
      background-color:#ffc9b7;
    // text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
.count-down{
  margin: auto;
  margin-top: 2rem;
  width: 10rem;
  padding: .5rem;
  border: 1px solid lightgray;
  border-radius: 1rem;
}
</style>