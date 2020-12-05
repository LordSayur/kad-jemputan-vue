<template>
  <section id="tentative" class="row center-align hide-behind">
      <img class="background" src="@/assets/bg.svg">
      <div class="inner">
        <span class="title">Atucara Majlis</span><span class="live">Live Update</span>
        <hr style="width: 15rem;margin-bottom: 2rem;">
        <Agenda v-for="(agenda, index) in Agendas" :key="index" :agenda='agenda' />
      </div>
      <div class="berharap">
        <span>Wakil yang Berharap</span>
        <p>Terdiri Daripada Keluarga Pengantin</p>
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
        omar: [
          {
            time: '11.00',
            period: 'am',
            agenda: 'Menerima Jemputan',
            status: 'todo'
          },
          {
            time: '11.30',
            period: 'am',
            agenda: 'Doa Selamat & Jamuan',
            status: 'todo'
          },
          {
            time: '1:15',
            period: 'pm',
            agenda: 'Pengantin Lelaki Bertolak',
            status: 'todo'
          },
          {
            time: '2:00',
            period: 'pm',
            agenda: 'Tunang & Nikah',
            status: 'todo'
          },
          {
            time: '2:45',
            period: 'pm',
            agenda: 'Basuh Kaki & Sanding',
            status: 'todo'
          },
        ],
        amirah: [
          {
            time: '11.00',
            period: 'am',
            agenda: 'Menerima Jemputan Amirah',
            status: 'done'
          },
          {
            time: '11.30',
            period: 'am',
            agenda: 'Doa Selamat & Jamuan',
            status: 'done'
          },
          {
            time: '1:15',
            period: 'pm',
            agenda: 'Pengantin Lelaki Bertolak',
            status: 'currently'
          },
          {
            time: '2:00',
            period: 'pm',
            agenda: 'Tunang & Nikah',
            status: 'todo'
          },
          {
            time: '2:45',
            period: 'pm',
            agenda: 'Basuh Kaki & Sanding',
            status: 'todo'
          },
        ],
      }
    }
  },
  async created(){
    this.getDataFromFB()
  },
  methods: {
    async getDataFromFB() {
      console.log(fb)
      let documents = await fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').onSnapshot((document) => {
        let item = document.data().agendas;
        this.agendas = item
      });
    }
  },
  computed:{
    Agendas() {
      return this.agendas[this.side === 'omar' ? 'omar' : 'amirah']
    }
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
      background-color:yellowgreen;
      color: white;
      margin-left: 1rem;
      padding: .3rem;
      border-radius: .5rem;
      font-size: 10px;
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
      background-color:yellowgreen;
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }
  to {
      background-color:greenyellow;
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
</style>