<template>
  <div class="home">
    <P5Background/>

    <GroomAndBride class="animate__animated animate__fadeIn animate__delay-2s"/>

    <Jemputan class='animate__animated animate__fadeInUp animate__delay-3s'/>

    <section v-if="geng != ''" id="customMessage" class="row center-align">
      <p>
        {{ customMessage }}
      </p>
    </section>
    
    <Hajat class='animate__animated animate__fadeInUp animate__delay-4s'/>

    <section class="row center-align">
      <hr>
      <span>Majlis  menghantar Berian, Akad Nikah Dan Doa Selamat</span>
      <hr>
    </section>

    <!-- Omar & Amirah -->
    <section id="omar-amirah-2" class="row center-align hide-behind">
      <p>Dengan penuh hormat dan takzim sukacita menjunjung Pengiran / mempersilakan Pehin / Dato / Datin / Awang / Dayang hadir ke majlis tersebut di atas bagi cucu / anak / adik / abang abis peramba / kaola / kami:</p>
      <div>
        <span>Mohammad Omar bin Dr. Haji Ibrahim</span>
        <span>dengan</span>
        <span>Nurul Amirah binti Maidin</span>
      </div>
    </section>

    <!-- Waktu & Tempat -->
    <section id="waktu-tempat" class="row center-align hide-behind">
      <div class="col s6 waktu right-align">
        <p>Pada Hari Ahad</p>
        <p>27 December 2020M</p>
        <p>13 Syawal 1438H</p>
      </div>
      <div class="col s6 tempat left-align">
        <p>Bertempat Di nombor 15, simpang 73, jalan 60, Perumahan Kampong Rimba, Gadong</p>
      </div>
      <p class="col s12">Di atas keberangkatan Pengiran dan kehadiran Pehin / Dato / Datin / Awang / Dayang ke majlis kami, terlebih dahulu abis peramba / kaola / kami sekeluarga mengucapkan ribuan terima kasih</p>
    </section>

    <!-- Tentative -->
    <section id="tentative" class="row center-align hide-behind">
      <span>Atucara Majlis</span>
      <ul class="left-align">
        <li>8.30 pagi: Menerima Jemputan</li>
        <li>9.00 pagi: Majlis Menghantar Berian & Akad Nikah</li>
        <li>10.00 pagi: Membaca Doa Selamat & Menikmati Jamuan</li>
      </ul>
      <span>Wakil yang Berharap</span>
      <p>Terdiri Daripada Keluarga Pengantin</p>
    </section>

    <!-- Doa -->
    <section id="doa" class="row center-align hide-behind">
      <span>Doa Pengantin</span>
      <p>
        Ya Allah Ya Tuhan kami <br>
        Satukanlah hati kedua mempelai ini
      </p>
      <div>
        <span>Mohammad Omar bin Dr. Haji Ibrahim</span>
        <span>dengan</span>
        <span>Nurul Amirah binti Maidin</span>
      </div>
      <p>
        seperti Engkau satukan Nabi Adam dan Hawa seperti Engkau satukan Nabi Yusof dan Zulaika dan seperti Engkau satukan Nabi Muhammad S.A.W. dan Siti Khadijah
      </p>
      <p>Ya Allah</p>
      <p>Berkatilah majlis yang diadakan, jadikanlah pasangan ini yang berbahagia dan berkekalan hingga ke ahir hayat dan kurniakanlah kepada mereka zuriat yang sempurna, beriman dan beramal soleh, sesungguhnya Engkau maha berkuasa atas segala sesuatu.</p>
      <p>Amin Ya Rabbal Alamin</p>
    </section>

    <section id="ads" class="map hide-behind">
      <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.3138004136108!2d114.92120382922539!3d4.96791133584139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTgnMDQuNSJOIDExNMKwNTUnMTguMyJF!5e1!3m2!1sen!2sbn!4v1600590138358!5m2!1sen!2sbn" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </section>

    <section id="ads" class="map hide-behind">
      <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.648948723478!2d114.6539578292254!3d4.784234336215068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDcnMDMuMiJOIDExNMKwMzknMTYuMiJF!5e1!3m2!1sen!2sbn!4v1604926884038!5m2!1sen!2sbn" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    </section>
  </div>
</template>

<script>
import P5Background from '@/components/P5Background.vue'
import GroomAndBride from '@/components/GroomAndBride.vue'
import Jemputan from '@/components/Jemputan.vue'
import Hajat from '@/components/Hajat.vue'

export default {
  name: 'Home',
  components: {
    P5Background,
    GroomAndBride,
    Jemputan,
    Hajat
  },
  data() {
    return {
      geng: '',
      customMessage: '',
      gengs: {
        tahfiz: 'hello geng tapisssssss',
        dymk: 'hello geng dynamiiiiik'
      }
    }
  },
  created(){
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
  margin: auto;
  padding: 2rem;
  max-width: 40rem;
}
.row {
  margin: 5rem auto;
}
.map{
  margin: auto;
  padding: 1rem;
  width: 20rem;
  height: 20rem;
}
.google-map {
  border-radius: 1rem;
  padding: 0;
  margin: 0;
	width: 100%;
  height: 100%;
}
</style>
