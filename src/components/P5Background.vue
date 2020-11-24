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
      width: window.innerWidth,
      height: window.innerHeight + 100,

      flower: null,
      snowflakes: [],
    };
  },

  methods: {
    preload(p5) {
      this.p5 = p5;
      this.flower = this.p5.loadImage(require('@/assets/jasmine.png'));
    },
    setup() {
      this.p5.createCanvas(this.width, this.height);
      this.p5.background(250);

      // create a random number of snowflakes each frame
      for (let i = 0; i < 5; i++) {
        this.snowflakes.push(new snowflake(this.p5, this.width, this.height, this.flower, this.snowflakes)); // append snowflake object
      }
    },
    draw() {
      this.p5.background(250);
      let t = this.p5.frameCount / 60; // update time

      // loop through snowflakes with a for..of loop
      for (let flake of this.snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
      }
    },
    keypressed(data) {},
  },
}

// snowflake class
	function snowflake(sk, width, height, flower, snowflakes) {
		// initialize coordinates
		this.posX = 0;
		this.posY = sk.random(-50, 0);
		this.initialangle = sk.random(0, 2 * sk.PI);
		this.size = sk.random(2, 5);

		// radius of snowflake spiral
		// chosen so the snowflakes are uniformly spread out in area
		this.radius = sk.sqrt(sk.random(sk.pow(width / 2, 2)));

		this.update = function(time) {
			// x position follows a circle
			let w = 0.6; // angular speed
			let angle = w * time + this.initialangle;
			this.posX = width / 2 + this.radius * sk.sin(angle);

			// different size snowflakes fall at slightly different y speeds
			this.posY += sk.pow(this.size, 0.5);

			// delete snowflake if past end of screen
			if (this.posY > height + 50) {
				let index = snowflakes.indexOf(this);
				// snowflakes.splice(index, 1);
				this.posY = -50;
			}
		};

		this.display = function() {
			// sk.ellipse(this.posX, this.posY, this.size);
			sk.image(flower, this.posX - 25, this.posY - 25, 25, 25);
		};
	}
</script>

<style scoped lang="scss">
</style>
