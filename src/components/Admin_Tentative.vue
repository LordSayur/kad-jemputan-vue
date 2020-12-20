<template>
  <div>
    <p v-if="!agendas">Fetching data...</p>
    <form v-else @submit.prevent="updateDb" class="col s12">
      <h2>Tentative - {{ isOmar ? "Omar" : "Amirah" }}</h2>
      <!-- Buttons -->
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb
          v-if="states.isShow"
          docName="agendas"
          :payload="{ agendas }"
          @updateDone="states.isShow = false"
        />
      </div>
      <!-- List -->
      <div v-for="(agenda, index) in Agendas" :key="index" class="row">
        <div class="tentative">
          <!-- Agenda -->
          <div>
            <label :for="'agenda' + index">Agenda</label>
            <textarea
              :id="'agenda' + index"
              v-model="agenda.agenda"
              style="min-height: 5rem"
            ></textarea>
          </div>
          <!-- Time -->
          <div class="tentative-inner">
            <div>
              <label :for="'masa' + index">Masa</label>
              <input :id="'masa' + index" v-model="agenda.time" type="text" />
            </div>
            <p>
              <label :for="'am' + index">
                <input
                  :id="'am' + index"
                  type="radio"
                  value="am"
                  v-model="agenda.period"
                  class="with-gap"
                />
                <span>Am</span>
              </label>
            </p>
            <p>
              <label :for="'pm' + index">
                <input
                  :id="'pm' + index"
                  type="radio"
                  value="pm"
                  v-model="agenda.period"
                  class="with-gap"
                />
                <span>Pm</span>
              </label>
            </p>
          </div>
          <!-- Status -->
          <div class="tentative-inner">
            <div>
              <p>
                <label :for="'todo' + index">
                  <input
                    :id="'todo' + index"
                    type="radio"
                    value="todo"
                    v-model="agenda.status"
                    class="with-gap"
                  />
                  <span>Todo</span>
                </label>
              </p>
              <p>
                <label :for="'currently' + index">
                  <input
                    :id="'currently' + index"
                    type="radio"
                    value="currently"
                    v-model="agenda.status"
                    class="with-gap"
                  />
                  <span>Current</span>
                </label>
              </p>
              <p>
                <label :for="'done' + index">
                  <input
                    :id="'done' + index"
                    type="radio"
                    value="done"
                    v-model="agenda.status"
                    class="with-gap"
                  />
                  <span>Done</span>
                </label>
              </p>
            </div>
            <button :class="`btn red`" @click="deleteAgenda(index)">X</button>
          </div>
        </div>
      </div>
      <!-- Buttons -->
      <div class="row">
        <button type="button" :class="`btn`" @click="addAgenda()">
          Add New
        </button>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import UpdateDb from "@/components/UpdateDb";
export default {
  name: "AdminTentative",
  props: {
    isOmar: {
      type: Boolean,
      default: true,
    },
    side: {
      type: String,
      default: "omar",
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
      },
    };
  },
  created() {
    this.getDataFromFB();
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc("agendas").onSnapshot((document) => {
        this.agendas = document.data().agendas;
      });
    },
    addAgenda() {
      this.agendas[this.isOmar ? "omar" : "amirah"].push({
        time: "11.00",
        period: "am",
        agenda: "omar tidur",
        status: "todo",
      });
    },
    deleteAgenda(index) {
      this.agendas[this.side].splice(index, 1);
    },
    updateDb() {
      this.states.isShow = true;
    },
  },
  computed: {
    Agendas() {
      return this.isOmar ? this.agendas.omar : this.agendas.amirah;
    },
  },
};
</script>

<style lang='scss' scoped>
.tentative {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  border: 1px solid lightblue;
  border-radius: 1rem;
  padding: 1rem;
}
.tentative-inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>