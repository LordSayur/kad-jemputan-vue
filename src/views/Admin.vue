<template>
  <div class="container">
    <h1>Admin</h1>
    <!-- Side button -->
    <div class="row">
      <button
        :class="`btn ${isOmar ? 'active blue' : 'btn-flat'}`"
        @click="updateSide('omar')"
      >
        Omar
      </button>
      <button
        :class="`btn ${isOmar ? 'btn-flat' : 'active blue'}`"
        @click="updateSide('amirah')"
      >
        Amirah
      </button>
      <hr />
    </div>
    <!-- tabs button -->
    <div class="row">
      <button
        :class="`btn ${currentTab == 'tentative' ? 'active blue' : 'btn-flat'}`"
        @click="updateTab('Tentative')"
      >
        Tentative
      </button>
      <button
        :class="`btn ${
          currentTab == 'url-generator' ? 'active blue' : 'btn-flat'
        }`"
        @click="updateTab('UrlGenerator')"
      >
        URL Generator
      </button>
      <button
        :class="`btn ${currentTab == 'makluman' ? 'active blue' : 'btn-flat'}`"
        @click="updateTab('Makluman')"
      >
        Makluman
      </button>
      <button
        :class="`btn ${currentTab == 'gengs' ? 'active blue' : 'btn-flat'}`"
        @click="updateTab('Gengs')"
      >
        Gengs
      </button>
      <button
        :class="`btn ${currentTab == 'teka-teki' ? 'active blue' : 'btn-flat'}`"
        @click="updateTab('TekaTeki')"
      >
        Teka Teki
      </button>
      <hr />
    </div>
    <keep-alive>
      <component :is="currentTab" :side="side" :isOmar="isOmar"></component>
    </keep-alive>

    <button id="myBtn">👆</button>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import Tentative from "@/components/Admin_Tentative";
import UrlGenerator from "@/components/Admin_UrlGenerator";
import Makluman from "@/components/Admin_Makluman";
import Gengs from "@/components/Admin_Gengs";
import TekaTeki from "@/components/Admin_TekaTeki";

export default {
  name: "Admin",
  components: {
    tentative: Tentative,
    "url-generator": UrlGenerator,
    makluman: Makluman,
    gengs: Gengs,
    "teka-teki": TekaTeki,
  },
  methods: {
    updateSide(side) {
      this.isOmar = side === "omar";
      this.side = side === "omar" ? "omar" : "amirah";
    },
    updateTab(tab) {
      this.currentTab = this.tabs[tab];
    },
  },
  data() {
    return {
      side: "omar",
      isOmar: true,
      tabs: {
        Tentative: "tentative",
        UrlGenerator: "url-generator",
        Makluman: "makluman",
        Gengs: "gengs",
        TekaTeki: "teka-teki",
      },
      currentTab: "tentative",
      showUpBtn: false,
    };
  },
};
</script>

<style lang='scss'>
@import "@/main.scss";
#myBtn {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  background-color: red; /* Set a background color */
  color: white; /* Text color */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 15px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  font-size: 18px; /* Increase font size */
}
</style>
