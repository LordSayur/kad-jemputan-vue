<template>
  <vueP5 v-on="{preload, setup, draw, keypressed}" />
</template>

<script>
import VueP5 from "vue-p5";

export default {
  name: 'P5Background',
  components: { VueP5 },

  data() {
    return {
      p5: null,
      x: window.innerWidth,
      y: window.innerHeight + 100,
    };
  },

  methods: {
    preload(p5) {
      this.p5 = p5;
    },
    setup() {
      this.p5.createCanvas(this.x, this.y);
      this.p5.background(0);
    },
    draw() {
    },
    keypressed(data) {},
  },
}
</script>

<style scoped lang="scss">
</style>
