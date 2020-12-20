<template>
  <section id="omar-amirah" class="row center-align">
    <img class="background" src="@/assets/bg.svg" />
    <div class="border">
      <div class="name">Omar</div>
      <img class="diamond" src="@/assets/diamond-ring.svg" alt="diamond=ring" />
      <div class="name">Amirah</div>
    </div>
    <div class="date">
      <span>dec</span>
      <span class="center">
        <span>sun</span>
        <span class="bold">27</span>
      </span>
      <span>2020</span>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang='scss'>
@import "@/main.scss";

#omar-amirah {
  margin: 3rem auto 0rem auto;
  font-family: $welcomeFont;
  color: $mainFontColor;
  position: relative;

  .background {
    position: absolute;
    top: -12rem;
    left: -2rem;
    z-index: -1;
    width: 30rem;
    transform: rotate(180deg);
  }

  .border {
    margin: auto;
    width: 270px;
    height: 260px;
    padding: 1rem;
  }
  .name {
    margin: auto;
    font-size: 40px;
  }
  .diamond {
    width: 47px;
    height: 47px;
    margin: 1rem;
    padding-top: 1rem;
  }

  .date {
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      text-transform: uppercase;
      width: 7rem;
      font-size: 30px;
      height: 100%;
    }
    .center {
      border-left: 1px solid black;
      border-right: 1px solid black;
    }

    .bold {
      font-weight: 700;
      font-size: 70px;
      line-height: 3rem;
    }
  }
}

.border {
  border: 4px solid white;
}
</style>