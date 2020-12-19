<template>
  <div>
    <p v-if="!agendas">Fetching data...</p>
    <form v-else @submit.prevent="updateDb" class='col s12'>
      <h2>Tentative - {{ isOmar ? 'Omar' : 'Amirah'}}</h2>
      <div class="row">
          <button type="submit" :class="`btn`">Update to Database</button>
          <UpdateDb v-if="states.isShow" docName='agendas' :payload="{agendas}" @updateDone="states.isShow = false" />
      </div>
      <div v-for="(agenda, index) in Agendas" :key="index">
        <div class="row">
          <div class="col s12">
            <textarea class="materialize-textarea" v-model="agenda.agenda"></textarea>
          </div>
          <div  class="col s12 myFlex">
            <input v-model="agenda.time" type="text">
            <select v-model="agenda.period" style="display: block">
              <option value="" disabled selected>Choose Status</option>
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
            <select v-model="agenda.status" style="display: block">
              <option value="" disabled selected>Choose Status</option>
              <option value="todo">Todo</option>
              <option value="currently">Current</option>
              <option value="done">Done</option>
            </select>
            <button :class="`btn red`" @click="deleteAgenda(index)">X</button>
          </div>
          <div class="teal" style="height: 3px"></div>
        </div>
      </div>
      <div class="row">
        <button type="button" :class="`btn`" @click="addAgenda()">Add New</button>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
import UpdateDb from '@/components/UpdateDb'
export default {
  name: 'AdminTentative',
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
      agendas: null,
      states: {
        isShow: false,
      }
    }
  },
  created () {
    this.getDataFromFB()
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc('agendas').onSnapshot((document) => {
        this.agendas = document.data().agendas;
      });
    },
    addAgenda() {
      this.agendas[this.isOmar ? 'omar' : 'amirah'].push({
        time: '11.00',
        period: 'am',
        agenda: 'omar tidur',
        status: 'todo'
      })
    },
    deleteAgenda(index) {
      this.agendas[this.side].splice(index, 1)
    },
    updateDb(){
      this.states.isShow = true;
    }
  },
  computed: {
    Agendas(){
      return this.isOmar ? this.agendas.omar : this.agendas.amirah
    },
  },
}
</script>

<style>

</style>