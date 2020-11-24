<template>
  <section id="hajat" class="center-align">
    <span class="jawi">بِسْمِ اٌللَّهِ اٌلرَّحْمٰنِ اٌلرَحِيمِ</span>
    <span class="jawi">يا قاضى الحاجاة</span>
    <ul>
      <li>Dr. Haji Ibrahim Bin Haji Abdul Rahman
      </li>
      <li>Hajah Siti Fatimah Binti Haji Mohd. Salleh</li>
      <li>Maidin bin Lampoh</li>
      <li>Hamizah binti Abdullah @ corpin</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Hajat",
}
</script>

<style lang='scss'>
@import '@/main.scss';
#hajat{
  margin: 2rem auto;
  span{
    display: block;
  }
  .jawi {
    font-family: $qadhiFont;
    font-size: 1.5rem;
  }
}
</style>