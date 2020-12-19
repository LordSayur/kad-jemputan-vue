<template>
  <div>
    <p v-if="!gengs">Fetching data...</p>
    <div v-else class="row">
      <h1>URL Generator</h1>
      <label>side</label>
      <input v-model='side' disabled type="text">
      <label>name (optional)</label>
      <input v-model='name' type="text">
      <label>kampong (optional)</label>
      <input v-model='kampong' type="text">
      <label>geng (optional)</label>
      <select v-model="geng" style="display: block">
        <option value="" disabled selected>Choose Geng</option>
        <option v-for="geng in gengs[side]" :key="geng.id" :value="geng.id">{{ geng.id }}</option>
      </select>
      <label>URL</label>
      <input v-model='generateUrl' id='url' type="text">
      <button @click="copy" class="btn">Copy</button>
    </div>
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
  name: 'AdminUrlGenerator',
  props: {
    side: {
      type: String,
      default: 'omar'
    },
  },
  data() {
    return {
      name: 'omar',
      kampong: 'Rimba',
      geng: '',
      gengs: null
    }
  },
  created () {
    this.getDataFromFB()
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc('gengs').onSnapshot((document) => {
        this.gengs = document.data().gengs;
      });
    },
    copy(){
      let copyText = document.getElementById('url')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
    },
  },
  computed: {
    generateUrl(){
      return `http://omar-amirah.netlify.app/?s=${this.side}${this.name ? '&n=' + encodeURIComponent(this.name) : ''}${this.kampong ? '&k='+ encodeURIComponent(this.kampong) : ''}${this.geng ? '&g='+ encodeURIComponent(this.geng) : ''}`
    }
  },
}
</script>

<style>

</style>