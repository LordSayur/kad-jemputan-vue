<template>
  <div class="container">
    <h1>Admin</h1>
    <div>
      <button :class="`btn ${isOmar ? 'active blue' : 'btn-flat'}`" @click="updateSide('omar')">Omar</button>
      <button :class="`btn ${isOmar ? 'btn-flat' : 'active blue'}`" @click="updateSide('amirah')">Amirah</button>
    </div>
    <div>
      <br>
      <button :class="`btn ${show.Tentative ? 'active blue' : 'btn-flat'}`" @click="updateTab('Tentative')">Tentative</button>
      <button :class="`btn ${show.UrlGen ? 'active blue' : 'btn-flat'}`" @click="updateTab('UrlGen')">URL Generator</button>
      <button :class="`btn ${show.Makluman ? 'active blue' : 'btn-flat'}`" @click="updateTab('Makluman')">Makluman</button>
      <button :class="`btn ${show.Gengs ? 'active blue' : 'btn-flat'}`" @click="updateTab('Gengs')">Gengs</button>
    </div>
    <!-- Tentative -->
    <div class="row" v-show="show.Tentative">
      <h2>Tentative - {{ isOmar ? 'Omar' : 'Amirah'}}</h2>
      <div class='col s12'>
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
                <button :class="`btn red`" @click="deleteAgenda(index)"  :disabled='buttonDisabled'>X</button>
              </div>
              <div class="teal" style="height: 3px"></div>
            </div>
          </div>
      </div>
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
    <!-- URL Generator -->
    <div class="row" v-show="show.UrlGen">
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
    <!-- Makluman -->
    <div class="row" v-show="show.Makluman">
      <h1>Makluman</h1>
      <label>Title</label>
      <input v-model="Makluman.title" type="text">
      <label>Content</label>
      <input v-model="Makluman.content" type="text">
      <button :class="`btn`" @click="updateDb()"  :disabled='buttonDisabled' style="margin-left: 1rem;">Update to Database</button>
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
    <!-- gengs -->
    <div class="row" v-show="show.Gengs">
      <h1>Gengs</h1>
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
          <button :class="`btn red`" @click="deleteGeng(index)"  :disabled='buttonDisabled'>X</button>
        </div>
      </div>
      <button class="btn" @click="addGeng(gengs[side].push({id,name,msg}))">Add</button>
      <button :class="`btn`" @click="updateDb()"  :disabled='buttonDisabled' style="margin-left: 1rem;">Update to Database</button>
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
    await this.getDataFromFB()
  },
  methods: {
    async getDataFromFB() {
      fb.agendas.doc('F5XNcpXkHQTIKHWHcLXW').onSnapshot((document) => {
        let item1 = document.data().agendas;
        this.agendas = item1
        let item2 = document.data().makluman;
        this.makluman = item2
        let item3 = document.data().gengs;
        this.gengs = item3
      });
    },
    updateSide(side){
      this.isOmar = side === 'omar'
      this.side = side === 'omar' ? 'omar' : 'amirah'
    },
    deleteAgenda(index) {
      this.agendas[this.side].splice(index, 1)
    },
    deleteGeng(index) {
      this.gengs[this.side].splice(index, 1)
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
        agendas: this.agendas,
        makluman: this.makluman,
        gengs: this.gengs
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
    copy(){
      let copyText = document.getElementById('url')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      console.log(copyText.value)
    },
    updateTab(tab) {
      this.show = {
        Tentative: false,
        UrlGen: false,
        Makluman: false,
        Gengs: false,
      }

      this.show[tab] = true;
    }
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
      },
      side: 'omar',
      name: 'omar',
      kampong: 'Rimba',
      geng: '',
      makluman: {
        omar: [],
        amirah: []
      },
      title: '',
      content: '',
      gengs: {
        omar: [
          {
            id: 'tahfiz',
            name: 'Rakan Tahfiz',
            msg: 'Hello Geng Tahfiz'
          }
        ],
        amirah: [
          {
            id: 'chung-ching',
            name: 'Rakan chung-ching',
            msg: 'Hello Geng chung-ching'
          }
        ]
      },
      show: {
        Tentative: true,
        UrlGen: false,
        Makluman: false,
        Gengs: false,
      }
    }
  },
  computed:{
    Agendas(){
      return this.isOmar ? this.agendas.omar : this.agendas.amirah
    },
    Makluman(){
      return this.isOmar ? this.makluman.omar : this.makluman.amirah
    },
    Gengs(){
      return this.isOmar ? this.gengs.omar : this.gengs.amirah
    },
    generateUrl(){
      return `http://omar-amirah.netlify.app/?s=${this.side}${this.name ? '&n=' + encodeURIComponent(this.name) : ''}${this.kampong ? '&k='+ encodeURIComponent(this.kampong) : ''}${this.geng ? '&g='+ encodeURIComponent(this.geng) : ''}`
    }
  }
}
</script>

<style lang='scss'>
@import '@/main.scss';
.myFlex {
  display: flex;
  justify-content: space-evenly;
}
</style>
