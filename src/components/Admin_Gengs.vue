<template>
  <div>
    <p v-if="!gengs">Fetching data...</p>
    <form v-else @submit.prevent="updateDb">
      <h1>Gengs</h1>
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb
          v-if="states.isShow"
          docName="gengs"
          :payload="{ gengs }"
          @updateDone="states.isShow = false"
        />
      </div>
      <div class="row">
        <div v-for="(geng, index) in Gengs" :key="index" class="row gengs">
          <div class="myFlex">
            <div>
              <label :for="'id' + index">Geng ID</label>
              <input :id="'id' + index" v-model="geng.id" type="text" />
            </div>
            <button :class="`btn red`" @click="deleteGeng(index)">X</button>
          </div>
          <div>
            <label :for="'name' + index">Geng Name</label>
            <input :id="'name' + index" v-model="geng.name" type="text" />
          </div>
          <div>
            <label :for="'message' + index">Special Message</label>
            <textarea
              :id="'message' + index"
              v-model="geng.msg"
              style="min-height: 10rem"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <button
          class="btn"
          @click="gengs[side].push({ id: '', name: '', msg: '' })"
        >
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
  name: "AdminGengs",
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
      gengs: null,
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
      fb.omaramirah.doc("gengs").onSnapshot((document) => {
        this.gengs = document.data().gengs;
      });
    },
    deleteGeng(index) {
      this.gengs[this.side].splice(index, 1);
    },
    updateDb() {
      this.states.isShow = true;
    },
  },
  computed: {
    Gengs() {
      return this.isOmar ? this.gengs.omar : this.gengs.amirah;
    },
  },
};
</script>

<style lang='scss' scoped>
.gengs {
  border: 1px solid lightblue;
  border-radius: 1rem;
  padding: 1rem;
}
.myFlex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>