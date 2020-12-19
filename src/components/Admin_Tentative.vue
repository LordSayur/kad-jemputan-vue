<template>
  <div>
    <p v-if="!agendas">Fetching data...</p>
    <form v-else @submit.prevent="updateDb" class='col s12'>
      <h2>Tentative - {{ isOmar ? 'Omar' : 'Amirah'}}</h2>
      <!-- Buttons -->
      <div class="row">
          <button type="submit" :class="`btn`">Update to Database</button>
          <UpdateDb v-if="states.isShow" docName='agendas' :payload="{agendas}" @updateDone="states.isShow = false" />
      </div>
      <!-- List -->
      <div v-for="(agenda, index) in Agendas" :key="index" class="row">
        <div class="tentative">
          <div>
            <label :for="'agenda'+index">Agenda</label>
            <textarea :id="'agenda'+index" v-model="agenda.agenda"></textarea>
          </div>
          <div class="tentative-inner">
            <div>
              <label :for="'masa'+index">Masa</label>
              <input :id="'masa'+index" v-model="agenda.time" type="text">
            </div>
            <select v-model="agenda.period" style="display: block">
              <option value="" disabled selected>Choose Status</option>
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          <div class="tentative-inner">
            <div>
              <label :for="'status'+index">Status</label>
              <select :id="'status'+index" v-model="agenda.status" style="display: block">
                <option value="" disabled selected>Choose Status</option>
                <option value="todo">Todo</option>
                <option value="currently">Current</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button :class="`btn red`" @click="deleteAgenda(index)">X</button>
          </div>
        </div>
        <div class="teal" style="height: 3px"></div>
      </div>
      <!-- Buttons -->
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

<style lang='scss' scoped>
.tentative {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tentative-inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>