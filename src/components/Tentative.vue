<template>
  <section id="tentative" class="row center-align hide-behind">
      <img class="background" src="@/assets/bg.svg">
      <div class="inner">
        <span class="title">Atucara Majlis</span>
        <hr style="width: 15rem;margin-bottom: 2rem;">
        <Agenda v-for="(agenda, index) in Agendas" :key="index" :agenda='agenda' />
        <!-- <ul class="left-align">
          <li>11.00 - 11:30 am: Menerima Jemputan</li>
          <li>11.30 - 12:15 am: Doa Selamat & Jamuan</li>
          <li> 1:15 -  2:00 pm: Pengantin Lelaki Bertolak</li>
          <li> 2:00 -  2:45 pm: Tunang & Nikah</li>
          <li> 2:45 -  5:00 pm: Basuh Kaki & Sanding</li>
        </ul> -->
      </div>
      <div class="berharap">
        <span>Wakil yang Berharap</span>
        <p>Terdiri Daripada Keluarga Pengantin</p>
      </div>
    </section>
</template>

<script>
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
            agenda: 'Menerima Jemputan'
          },
          {
            time: '11.30',
            period: 'am',
            agenda: 'Doa Selamat & Jamuan'
          },
          {
            time: '1:15',
            period: 'pm',
            agenda: 'Pengantin Lelaki Bertolak'
          },
          {
            time: '2:00',
            period: 'pm',
            agenda: 'Tunang & Nikah'
          },
          {
            time: '2:45',
            period: 'pm',
            agenda: 'Basuh Kaki & Sanding'
          },
        ],
        amirah: [
          {
            time: '11.00',
            period: 'am',
            agenda: 'Menerima Jemputan Amirah'
          },
          {
            time: '11.30',
            period: 'am',
            agenda: 'Doa Selamat & Jamuan'
          },
          {
            time: '1:15',
            period: 'pm',
            agenda: 'Pengantin Lelaki Bertolak'
          },
          {
            time: '2:00',
            period: 'pm',
            agenda: 'Tunang & Nikah'
          },
          {
            time: '2:45',
            period: 'pm',
            agenda: 'Basuh Kaki & Sanding'
          },
        ],
      }
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
      font-weight: 700;
      font-size: 20px;
    }
  }

  .berharap {
    border: 1px solid black;
    padding: 1.5rem;
    margin-top: 3rem;
  }

  li{
    margin: .5rem;
  }
}
</style>