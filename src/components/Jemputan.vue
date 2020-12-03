<template>
<section id="jemputan" class="center-align">
  <img class="background" src="@/assets/bg.svg">
  <div class="inner">
    <span class="title">Undangan Majlis Perkahwinan</span>
    <hr style="width: 15rem;margin-bottom: 2rem;">
    <span>Yang Mulia,</span>
    <span>{{namaJemputan}}</span>
    <span>{{kampong}}</span>
  </div>
  <div class="hajat">
    <div class="jawi">
      <span>بِسْمِ اٌللَّهِ اٌلرَّحْمٰنِ اٌلرَحِيمِ</span>
      <span>يا قاضى الحاجاة</span>
    </div>
    <ul>
      <li>Dr. Haji Ibrahim Bin Haji Abdul Rahman
      </li>
      <li>Hajah Siti Fatimah Binti Haji Mohd. Salleh</li>
      <li>Maidin bin Lampoh</li>
      <li>Hamizah binti Abdullah @ corpin</li>
    </ul>
  </div>
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
  .jawi {
    font-family: $qadhiFont;
    font-size: 18px;
    margin: 3rem auto;
  }
  li{
    margin: 1rem auto;
  }
  
}
</style>