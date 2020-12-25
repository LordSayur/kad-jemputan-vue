<template>
  <div class="center-align teka-teki">
    <h4>Teka Teki 🤠</h4>
    <div class="susun">
      <span>Susun:</span>
      <span @click="changeSort('latest')" :class="`${isLatest ? 'active' : ''}`"
        >Latest</span
      >
      |
      <span @click="changeSort('random')" :class="`${isLatest ? '' : 'active'}`"
        >Random</span
      >
    </div>
    <div class="flip-card" v-if="seeds">
      <div :class="`flip-card-inner ${isFlipped ? 'flipped' : ''}`">
        <div class="card horizontal flip-card-front z-depth-3">
          <div class="card-stacked">
            <div class="card-content">
              <p>
                {{ GetTekaTeki }}
              </p>
              <p class="creator">by {{ GetCreator }}</p>
              <p class="tekaNo">{{ GetNumber }}</p>
            </div>
            <div @click="flipCard" class="card-action">
              <h6 class="green-text">Bah Tia! 👈</h6>
            </div>
          </div>
        </div>
        <div class="card horizontal flip-card-back z-depth-3">
          <div class="card-stacked">
            <div class="card-content">
              <p class="answer">{{ GetAnswer }}</p>
            </div>
            <div @click="flipCard" class="card-action">
              <h6 class="green-text">Lagi ‼</h6>
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
        v-show="!showForm"
      >
        Mau Share Teka Teki? Takan Sini!🎯
      </p>
      <div
        v-if="showForm"
        class="teka-form animate__animated animate__bounceIn"
      >
        <form novalidate @submit.prevent="submitTekaTeki">
          <div class="soalan">
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
          </div>

          <div class="soalan">
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
          </div>

          <div class="soalan">
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
          </div>

          <button type="submit" class="btn" :disabled="disableButton">
            Share!
          </button>
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
      seeds: null,
      isLatest: true,
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

          this.sort("latest");
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
          this.index++;
          if (this.index == this.tekaTeki.length) {
            this.index = 0;
          }
        }, 500);
      }
    },
    suffle(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    sort(sortBy) {
      let sort = {
        latest: () => {
          this.seeds.reverse();
        },
        random: () => {
          this.seeds = this.suffle(this.seeds);
        },
      };

      this.seeds = [];
      for (let index = 0; index < this.tekaTeki.length; index++) {
        this.seeds.push(index);
      }

      sort[sortBy]();
    },
    changeSort(sortBy) {
      sortBy == "latest" ? (this.isLatest = true) : (this.isLatest = false);
      this.sort(sortBy);
      this.index = 0;
    },
  },
  computed: {
    GetTekaTeki() {
      return this.tekaTeki[this.seeds[this.index]].soalan;
    },
    GetAnswer() {
      return this.tekaTeki[this.seeds[this.index]].jawapan;
    },
    GetCreator() {
      return this.tekaTeki[this.seeds[this.index]].creator;
    },
    GetNumber() {
      return `${this.seeds[this.index] + 1} / ${this.tekaTeki.length}`;
    },
  },
};
</script>

<style lang='scss'>
.teka-teki {
  margin: 5rem auto;
}
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  margin: 2rem auto;
  width: 80%;
  height: 25rem;
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
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .card-content::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .card-content {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
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
  margin-top: 4rem;
  .share {
    cursor: pointer;
    text-decoration: underline;
    color: lightskyblue;
    margin: 4rem auto;
    border: 1px solid lightblue;
    width: 15rem;
    border-radius: 1rem;
    padding: 1rem;
  }
  .teka-form {
    max-width: 15rem;
    margin: auto;
    margin-bottom: 2rem;
  }
  .soalan {
    padding-bottom: 2rem;
  }
}

.susun {
  margin-top: 2rem;
  span {
    padding: 1rem;
  }
}
.active {
  color: lightsalmon;
  &::after {
    content: "🍕";
  }
}

.tekaNo {
  padding-top: 1rem;
  font-size: 0.8rem;
  color: lightgrey;
}
</style>