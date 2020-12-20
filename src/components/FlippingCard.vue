<template>
  <div class="center-align">
    <h5>Teka Teki</h5>
    <div class="flip-card">
      <div :class="`flip-card-inner ${isFlipped ? 'flipped' : ''}`">
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
    <div class="form-container">
      <p
        class="share"
        @click="
          showForm = true;
          disableButton = false;
        "
      >
        Mau Share Teka Teki? Takan Sini!🎯
      </p>
      <div
        v-if="showForm"
        class="teka-form animate__animated animate__bounceIn"
      >
        <form novalidate @submit.prevent="submitTekaTeki">
          <label for="soalan">Soalan</label>
          <textarea
            name="soalan"
            placeholder="Contoh: Banyak banyak 🍔..."
            id="soalan"
            cols="30"
            rows="10"
            v-model="proposedTeka.soalan"
            required
          ></textarea>
          <p v-show="errorMessage.soalan" class="red-text">
            {{ errorMessage.soalan }}
          </p>

          <label for="jawapan">Jawapan</label>
          <textarea
            name="jawapan"
            placeholder="Contoh: Apanahhh😜"
            id="jawapan"
            cols="30"
            rows="10"
            v-model="proposedTeka.jawapan"
            required
          ></textarea>
          <p v-show="errorMessage.jawapan" class="red-text">
            {{ errorMessage.jawapan }}
          </p>

          <label for="name">Nick Name</label>
          <input
            type="text"
            placeholder="Contoh: Lord 🥦"
            name="name"
            id="name"
            v-model="proposedTeka.creator"
            required
          />
          <p v-show="errorMessage.creator" class="red-text">
            {{ errorMessage.creator }}
          </p>

          <button type="submit" :disabled="disableButton">Share!</button>
        </form>
      </div>
      <p class="green-text" v-show="successMessage">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
const fb = require("../firebaseConfig");
export default {
  name: "FlippingCard",
  data() {
    return {
      isFlipped: false,
      tekaTeki: [
        {
          soalan: "Banyak banyak 🍔, 🍔 apa paling nyaman?",
          jawapan: "Begaru!",
          creator: "Lord Sayur",
        },
      ],
      index: 0,
      showForm: false,
      tekateki: null,
      proposedTeka: {
        soalan: "",
        jawapan: "",
        creator: "",
      },
      errorMessage: {
        soalan: "",
        jawapan: "",
        creator: "",
      },
      disableButton: false,
      successMessage: "",
    };
  },
  created() {
    this.getDataFromFB();
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.omaramirah
        .doc("teka-teki")
        .onSnapshot((document) => {
          this.tekateki = document.data().tekateki;
          this.tekaTeki = this.tekateki.approved;
        });
    },
    async submitTekaTeki() {
      if (!this.proposedTeka.soalan) {
        this.errorMessage.soalan = "Apa soalan biskita ani?";
        return;
      } else {
        this.errorMessage.soalan = "";
      }

      if (!this.proposedTeka.jawapan) {
        this.errorMessage.jawapan = "Apa jawapan biskita ani?";
        return;
      } else {
        this.errorMessage.jawapan = "";
      }

      if (!this.proposedTeka.creator) {
        this.errorMessage.creator = "Mana nick name biskita ani?";
        return;
      } else {
        this.errorMessage.creator = "";
      }

      this.disableButton = true;

      this.tekateki.pending.push(this.proposedTeka);
      await fb.omaramirah.doc("teka-teki").set({
        tekateki: this.tekateki,
      });

      this.disableButton = false;
      this.successMessage = "Teka teki biskita masani dalam process approval.";
      this.proposedTeka = {
        soalan: "",
        jawapan: "",
        creator: "",
      };
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
      this.showForm = false;
    },
    flipCard(fn) {
      this.isFlipped = !this.isFlipped;
      if (!this.isFlipped) {
        setTimeout(() => {
          this.index = Math.floor(Math.random() * this.tekaTeki.length);
        }, 500);
      }
    },
  },
  computed: {
    GetTekaTeki() {
      return this.tekaTeki[this.index].soalan;
    },
    GetAnswer() {
      return this.tekaTeki[this.index].jawapan;
    },
    GetCreator() {
      return this.tekaTeki[this.index].creator;
    },
  },
};
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
.card.horizontal {
  &.flip-card-front,
  &.flip-card-back {
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
  p.answer {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
}

.form-container {
  .share {
    cursor: pointer;
    text-decoration: underline;
    color: lightskyblue;
  }
  .teka-form {
    max-width: 15rem;
    margin: auto;
  }
}
</style>