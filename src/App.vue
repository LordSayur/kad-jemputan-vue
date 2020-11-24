<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/main.scss';
body{
  margin: 0;
}
.p5Canvas {
  width: 100% !important;
  position: fixed;
	top: 0%;
	left: 0%;
	z-index: -10;
}
</style>
