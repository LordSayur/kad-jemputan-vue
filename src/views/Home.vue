<template>
  <div>
    <div class="home">
      <!-- <P5Background/> -->

      <!-- Banner -->
      <div
        id="banner"
        :class="`sticky animate__animated animate__fadeInDown ${
          showBanner ? 'showBanner' : ''
        }`"
      >
        <span>Omar</span>
        <img src="@/assets/diamond-ring.svg" alt="diamond=ring" />
        <span>Amirah</span>
      </div>

      <!-- Shortcut -->
      <div>
        <a
          class="shortcut address animate__animated animate__fadeInLeft animate__delay-3s"
          href="#address"
          ><i class="material-icons">location_on</i></a
        >
        <a
          class="shortcut majlis animate__animated animate__fadeInLeft animate__delay-4s"
          href="#tentative"
          >LIVE!</a
        >
        <a
          class="shortcut teka-teki animate__animated animate__fadeInLeft animate__delay-5s"
          href="#teka-teki"
          >🤠</a
        >
      </div>

      <GroomAndBride
        class="animate__animated animate__fadeIn animate__delay-2s"
      />

      <Jemputan
        class="animate__animated animate__fadeInUp animate__delay-3s"
        :nama="nama"
        :kampong="kampong"
        :side="side"
        :geng="geng"
      />

      <Majlis
        class="animate__animated animate__fadeInUp animate__delay-4s"
        :side="side"
      />

      <Tentative
        class="animate__animated animate__fadeInUp animate__delay-4s"
        :side="side"
      />
    </div>

    <!-- Extra -->
    <div class="extra animate__animated animate__fadeInUp animate__delay-4s">
      <!-- Makluman -->
      <div id="makluman">
        <h5>{{ title }}</h5>
        <div v-html="content" style="margin-bottom: 3rem"></div>
      </div>

      <Address :side="side" />

      <!-- Download eCard -->
      <div class="center-align download">
        <a :href="require(`@/assets/ecard-${side}.png`)" download
          >📩 Download eCard</a
        >
      </div>
    </div>

    <FlippingCard
      class="animate__animated animate__fadeInUp animate__delay-4s"
    />

    <div class="animate__animated animate__fadeInUp animate__delay-4s">
      <h6
        style="
          text-align: center;
          text-decoration: underline;
          margin-bottom: 1rem;
        "
      >
        <a href="https://wsb.netlify.app/">Waktu Sembahyang Brunei</a>
      </h6>
      <iframe
        src="https://wsb.netlify.app/"
        style="height: 35rem; width: 100%"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
// import P5Background from '@/components/P5Background.vue'
import GroomAndBride from "@/components/GroomAndBride.vue";
import Jemputan from "@/components/Jemputan.vue";
import Majlis from "@/components/Hajat.vue";
import Tentative from "@/components/Tentative.vue";
import Address from "@/components/Address.vue";
import FlippingCard from "@/components/FlippingCard.vue";

const fb = require("@/firebaseConfig.js");

export default {
  name: "Home",
  components: {
    // P5Background,
    GroomAndBride,
    Jemputan,
    Majlis,
    Tentative,
    Address,
    FlippingCard,
  },
  data() {
    return {
      nama: "",
      kampong: "",
      geng: "",
      side: "",
      title: "",
      content: "<p></p>",
      showBanner: false,
    };
  },
  created() {
    this.nama = this.$route.query.n || "";
    this.kampong = this.$route.query.k || "";
    this.side = this.$route.query.s || "omar";
    this.geng = this.$route.query.g || "";
    this.getDataFromFB();
  },
  mounted() {
    let header = document.getElementById("banner");
    window.onscroll = function () {
      if (window.pageYOffset > 500) {
        header.classList.add("showBanner");
      } else {
        header.classList.remove("showBanner");
      }
    };
  },
  methods: {
    async getDataFromFB() {
      let documents = await fb.omaramirah
        .doc("makluman")
        .onSnapshot((document) => {
          let item = document.data().makluman;
          let makluman = item[this.side === "omar" ? "omar" : "amirah"];
          this.title = makluman.title;
          this.content = makluman.content;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/main.scss";
body {
  font-family: $welcomeFont;
}
.home {
  overflow: hidden;
  margin: auto;
  padding: 2rem;
  max-width: 30rem;
  position: relative;
}
#makluman {
  color: darkslategrey;
}
.p5Canvas {
  width: 100% !important;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: -30;
}
.shortcut {
  z-index: 100;
  position: fixed;
  left: 0;
  padding: 0.5rem;
  margin: 0;
  border: 1px solid lightgray;
  color: black;
  background-color: white;
  opacity: 0.5;
  &.address {
    bottom: 11rem;
  }
  &.majlis {
    bottom: 7.5rem;
    font-weight: 700;
  }
  &.teka-teki {
    bottom: 4rem;
  }
}
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background-color: rgba($color: white, $alpha: 0.5);
  color: black;
  z-index: 100;
  display: none;
  &.showBanner {
    display: flex;
  }
  img {
    width: 2rem;
    margin: 0 1rem;
  }
}
.download {
  width: 12rem;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid darkslategrey;
  border-radius: 1rem;
  a {
    color: darkslategrey;
  }
}
.extra {
  padding: 2rem;
  background-color: #ffc9b7;
}
</style>
