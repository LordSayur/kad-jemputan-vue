<template>
  <div>
    <p v-if="!gengs">Fetching data...</p>
    <form v-else @submit.prevent="updateDb">
      <h1>Gengs</h1>
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb v-if="states.isShow" docName='gengs' :payload="{gengs}" @updateDone="states.isShow = false" />
      </div>
      <div class="row">
        <div v-for="(geng, index) in Gengs" :key='index' class="myFlex">
          <div>
            <label>Geng ID</label>
            <input v-model="geng.id" type="text" >
          </div>
          <div>
            <label>Geng Name</label>
            <input v-model="geng.name" type="text" >
          </div>
          <div>
            <label>Special Message</label>
            <textarea v-model="geng.msg" cols="30" rows="10"></textarea>
          </div>
          <div>
            <button :class="`btn red`" @click="deleteGeng(index)">X</button>
          </div>
        </div>
      </div>
      <div class="row">
        <button class="btn" @click="gengs[side].push({id: '',name:'',msg:''})">Add New</button>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
import UpdateDb from '@/components/UpdateDb'
export default {
  name: 'AdminGengs',
  props: {
    isOmar: {
      type: Boolean,
      default: true
    },
    side: {
      type: String,
      default: 'omar'
    },
  },
  components: {
    UpdateDb,
  },
  data() {
    return {
      gengs: null,
      states: {
        isShow: false
      }
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
    deleteGeng(index) {
      this.gengs[this.side].splice(index, 1)
    },
    updateDb(){
      this.states.isShow = true;
    }
  },
  computed: {
    Gengs(){
      return this.isOmar ? this.gengs.omar : this.gengs.amirah
    },
  },
}
</script>

<style>

</style>