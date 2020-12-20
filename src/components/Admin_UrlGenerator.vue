<template>
  <div>
    <p v-if="!gengs">Fetching data...</p>
    <div v-else class="row">
      <h1>URL Generator</h1>
      <label for="side">side</label>
      <input id="side" v-model="side" disabled type="text" />
      <label for="name">name (optional)</label>
      <input id="name" v-model="name" type="text" />
      <label for="kampong">kampong (optional)</label>
      <input id="kampong" v-model="kampong" type="text" />
      <label for="geng">geng (optional)</label>
      <select id="geng" v-model="geng" style="display: block">
        <option value="" disabled selected>Choose Geng</option>
        <option v-for="geng in gengs[side]" :key="geng.id" :value="geng.id">
          {{ geng.id }}
        </option>
      </select>
      <label for="url">URL</label>
      <input id="url" v-model="generateUrl" type="text" />
      <button @click="copy" class="btn">Copy</button>
    </div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "AdminUrlGenerator",
  props: {
    side: {
      type: String,
      default: "omar",
    },
  },
  data() {
    return {
      name: "omar",
      kampong: "Rimba",
      geng: "",
      gengs: null,
    };
  },
  created() {
    this.getDataFromFB();
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc("gengs").onSnapshot((document) => {
        this.gengs = document.data().gengs;
      });
    },
    copy() {
      let copyText = document.getElementById("url");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
  },
  computed: {
    generateUrl() {
      return `http://omar-amirah.netlify.app/?s=${this.side}${
        this.name ? "&n=" + encodeURIComponent(this.name) : ""
      }${this.kampong ? "&k=" + encodeURIComponent(this.kampong) : ""}${
        this.geng ? "&g=" + encodeURIComponent(this.geng) : ""
      }`;
    },
  },
};
</script>

<style>
</style>