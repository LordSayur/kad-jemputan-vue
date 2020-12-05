<template>
  <div class="container">
    <div class="row">
      <h1>Admin</h1>
      <hr>
      <button :class="`btn ${isOmar ? 'active ' : 'btn-flat'}`" @click="isOmar = true">Omar</button>
      <button :class="`btn ${isOmar ? 'btn-flat' : 'active '}`" @click="isOmar = false">Amirah</button>
      <h2>Tentative - {{ isOmar ? 'Omar' : 'Amirah'}}</h2>
      <div class="col s12">
        <ul class="tabs">
        </ul>
      </div>
      <table>
        <thead>
          <tr>
              <th>Time</th>
              <th>Period</th>
              <th>Agenda</th>
              <th>Status</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(agenda, index) in Agendas" :key="index">
            <td><input v-model="agenda.time" type="text"></td>
            <td><input v-model="agenda.period" type="text"></td>
            <td><input v-model="agenda.agenda" type="text"></td>
            <td><input v-model="agenda.status" type="text"></td>
            <td><button :class="`btn red`" @click="deleteAgenda(index)"  :disabled='buttonDisabled'>Delete</button></td>
          </tr>
        </tbody>
      </table>
      <div style="margin: 1rem auto">
        <button :class="`btn`" @click="addAgenda()" :disabled='buttonDisabled'>Add New</button>
        <button :class="`btn`" @click="updateDb()"  :disabled='buttonDisabled' style="margin-left: 1rem;">Update to Database</button>
      </div>
      <div v-show="isShow">
        <span>Are you sure?</span>
        <div style="margin: 1rem auto">
          <button :class="`btn btn-small blue`" @click="upload()">Yes</button>
          <button :class="`btn btn-small red`" @click="CancelUpdate" style="margin-left: 1rem;">No</button>
        </div>
      </div>
      <div>
        <p v-show="isUpdateCancelled" class="red-text">Update Cancelled!</p>
        <p v-show="isUpdating" class="blue-text">Updating...</p>
        <p v-show="isUpdated" class="green-text">Updated!</p>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require('@/firebaseConfig.js')
export default {
  name: 'Admin',
  async created(){
    this.getDataFromFB()
  },
  methods: {
    async getDataFromFB() {
      console.log(fb)
      let documents = await fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').onSnapshot((document) => {
        let item = document.data().agendas;
        this.agendas = item
      });
    },
    deleteAgenda(index) {
      this.agendas[this.isOmar ? 'omar' : 'amirah'].splice(index, 1)
    },
    addAgenda() {
      this.agendas[this.isOmar ? 'omar' : 'amirah'].push({
        time: '11.00',
        period: 'am',
        agenda: 'omar tidur',
        status: 'todo'
      })
    },
    updateDb() {
      this.isShow = true
      this.isUpdateCancelled = false
    },
    async upload() {
      this.isShow = false;
      this.isUpdating = true;
      this.buttonDisabled = true;
      await fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').set({
        agendas: this.agendas
      })
      this.isUpdating = false;
      this.buttonDisabled = false;
      this.isUpdated = true
      setTimeout(() => {
        this.isUpdated = false
      }, 5000);
    },
    CancelUpdate() {
      this.isUpdateCancelled = true
      this.isShow = false
      setTimeout(() => {
        this.isUpdateCancelled = false
      }, 5000);
    },
  },
  data() {
    return {
      isOmar: true,
      isShow: false,
      isUpdateCancelled: false,
      isUpdating: false,
      isUpdated: false,
      buttonDisabled: false,
      agendas: {
        omar: [
          {
            time: '11.00',
            period: 'am',
            agenda: 'omar tidur',
            status: 'todo'
          },
        ],
        amirah: [
          {
            time: '11.00',
            period: 'am',
            agenda: 'amirah tidur',
            status: 'todo'
          },
        ]
      }
    }
  },
  computed:{
    Agendas(){
      return this.isOmar ? this.agendas.omar : this.agendas.amirah
    }
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
</style>