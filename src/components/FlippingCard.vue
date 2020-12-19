<template>
  <div class="center-align">
    <h5>Teka Teki</h5>
    <div class="flip-card">
      <div :class="`flip-card-inner ${isFlipped ? 'flipped': ''}`">
        <div class="card horizontal flip-card-front z-depth-3">
          <div class="card-stacked">
            <div class="card-content">
              <p>{{ GetTekaTeki }}</p>
              <p class="creator">by {{ GetCreator }}</p>
            </div>
            <div class="card-action">
              <a @click="flipCard">Bah Tia!</a>
            </div>
          </div>
        </div>
        <div class="card horizontal flip-card-back z-depth-3">
          <div class="card-stacked">
            <div class="card-content">
              <p class="answer">{{ GetAnswer }}</p>
            </div>
            <div class="card-action">
              <a @click="flipCard">Lagi!</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig')
export default {
  name: 'FlippingCard',
  data() {
    return {
      isFlipped: false,
      tekaTeki: [
        {
          soalan: 'Banyak banyak 🍔, 🍔 apa paling nyaman?',
          jawapan: 'Begaru!',
          creator: 'Lord Sayur',
        }
      ],
      index: 0
    }
  },
  created () {
    this.getDataFromFB();
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.omaramirah.doc('teka-teki').onSnapshot((document) => {
        this.tekaTeki = document.data().tekateki.approved;
      });
    },
    flipCard(fn) {
      this.isFlipped = !this.isFlipped
      if (!this.isFlipped) {
        setTimeout(() => {
          this.index = Math.floor(Math.random() * this.tekaTeki.length)
        }, 500);
      }
    },
  },
  computed: {
    GetTekaTeki() {
      return this.tekaTeki[this.index].soalan
    },
    GetAnswer() {
      return this.tekaTeki[this.index].jawapan
    },
    GetCreator() {
      return this.tekaTeki[this.index].creator
    }
  },
}
</script>

<style lang='scss'>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  margin: auto;
  width: 80%;
  height: 15rem;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  /* Do an horizontal flip when you move the mouse over the flip box container */
  &.flipped {
    transform: rotateY(180deg);
  }
}


/* Position the front and back side */
.card.horizontal
{
  &.flip-card-front, &.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    .card-content {
      overflow: scroll;
    }
  }
}

/* Style the front side (fallback if image is missing) */
.card.horizontal.flip-card-front {
  color: black;
  p.creator {
    margin-top: 2rem;
  }
}

/* Style the back side */
.card.horizontal.flip-card-back {
  transform: rotateY(180deg);
  p.answer{
    margin-top: 2rem;
    font-size: 1.5rem;
  }
}

</style>