<template>
<section id="jemputan" class="center-align">
  <!-- <hr> -->
  <div class="inner">
    <span class="title">Undangan Majlis Perkahwinan</span>
    <span>Yang Mulia,</span>
    <span>{{namaJemputan}}</span>
    <span>{{kampong}}</span>
  </div>
  <!-- <hr> -->
</section>
</template>

<script>
export default {
  name: "Jemputan",
  data() {
    return {
      namaJemputan: '',
      kampong: 'Rimba'
    }
  },
  created(){
    this.namaJemputan = this.$route.query.nama || 'Awang Omar bin Haji Ibrahim';
    this.kampong = this.$route.query.kampong || 'Rimba';
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
#jemputan{
  margin: 2rem auto;
  span{
    display: block;
    &.title {
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
}
</style>