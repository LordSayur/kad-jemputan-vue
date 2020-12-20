<template>
  <form @submit.prevent="updateDb">
    <h1>Teka Teki</h1>
    <p v-if="!tekateki">Fetching data...</p>
    <div v-else>
      <div class="row">
        <button type="submit" :class="`btn`">Update to Database</button>
        <UpdateDb
          v-if="states.isShow"
          docName="teka-teki"
          :payload="{ tekateki }"
          @updateDone="states.isShow = false"
        />
      </div>
      <div class="row">
        <div>
          <label for="status">Status</label>
          <select
            v-model="states.currentStatus"
            id="status"
            style="display: block"
          >
            <option value="" disabled selected>Choose Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <TekaTekiList
          :status="tekateki[states.currentStatus]"
          :statusName="states.currentStatus"
          @approved="approveTeka"
          @rejected="rejectTeka"
        />
      </div>
    </div>
  </form>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import UpdateDb from "@/components/UpdateDb";
import TekaTekiList from "@/components/TekaTekiList";
export default {
  name: "TekaTeki",
  components: {
    UpdateDb,
    TekaTekiList,
  },
  data() {
    return {
      tekateki: null,
      states: {
        isShow: false,
        currentStatus: "pending",
      },
    };
  },
  created() {
    this.getDataFromFB();
  },
  methods: {
    getDataFromFB() {
      fb.omaramirah.doc("teka-teki").onSnapshot((document) => {
        this.tekateki = document.data().tekateki;
      });
    },
    updateDb() {
      this.states.isShow = true;
    },
    rejectTeka(event) {
      let rejected = event.arr.splice(event.index, 1)[0];
      this.tekateki.rejected.push(rejected);
    },
    approveTeka(event) {
      let approved = event.arr.splice(event.index, 1)[0];
      this.tekateki.approved.push(approved);
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/main.scss";
.myFlex {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 1rem;
  padding: 1rem;
}
</style>