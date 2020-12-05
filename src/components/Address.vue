<template>
  <section id="address" class="hide-behind">
    <div style="margin-bottom: 2rem;">
      <a @click="isOmar=true" :class="`button ${isOmar ? 'highlight' : ''}`">Omar's Place</a> 
      <a @click="isOmar=false" :class="`button ${!isOmar ? 'highlight' : ''}`">Amirah's Place</a>
    </div>
    <div class="map-description" v-show="isOmar">
      <a href="https://goo.gl/maps/k8U6aHAxnzesuesv5">No.15, Spg. 73, Jln. 60, Perumahan Kg. Rimba, Gadong, BE3319</a>
      <div class="map">
        <iframe  class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.3138004136108!2d114.92120382922539!3d4.96791133584139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTgnMDQuNSJOIDExNMKwNTUnMTguMyJF!5e1!3m2!1sen!2sbn!4v1600590138358!5m2!1sen!2sbn" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
      </div>
    </div>
    <div class="map-description" v-show="!isOmar">
      <a href="https://goo.gl/maps/BH8oyVYLvjyphQYv7">Unit A1, Spg. 333, Kg. Serambangun, Tutong, TA3319</a>
      <div class="map">
        <iframe v-show="!isOmar" class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1225.648948723478!2d114.6539578292254!3d4.784234336215068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDcnMDMuMiJOIDExNMKwMzknMTYuMiJF!5e1!3m2!1sen!2sbn!4v1604926884038!5m2!1sen!2sbn" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Address",
  props: ['side'],
  data(){
    return {
      isOmar: true
    }
  },
  created(){
    this.isOmar = this.side === 'omar'
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
#address {
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
  .button {
    border: 2px solid lightgray;
    border-radius: .5rem;
    padding: .5rem;
    margin-right: .5rem;
    color: lightgray;
  }
  .highlight {
    color: burlywood;
  }
  .map-description{
    a{
        color: lightskyblue;
        text-decoration: underline;
      }
  }
}
</style>