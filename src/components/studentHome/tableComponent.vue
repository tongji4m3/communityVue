<template>
  <table class="mailTable" :style="styleObject" v-if="s_showByRow">
    <tr v-for="index in rowCount">
      <td class="column">{{tableData[index*3-3].key}}</td>

      <td>{{tableData[index*3-3].value}}</td>

      <td class="column">{{tableData[index*3-2] !== undefined ? tableData[index*3-2].key : ''}}</td>

      <td>{{tableData[index*3-2] !== undefined ? tableData[index*3-2].value : ''}}</td>

      <td class="column">{{tableData[index*3-1] !== undefined ? tableData[index*3-1].key : ''}}</td>

      <td>{{tableData[index*3-1] !== undefined ? tableData[index*3-1].value : ''}}</td>
    </tr>
  </table>

  <table class="mailTable" :style="styleObject" v-else>
    <tr v-for="index in rowCount">
      <td class="column">{{tableData[index-1].key}}</td>

      <td>{{tableData[index-1].value}}</td>

      <td
        class="column"
      >{{tableData[rowCount/2+index-1] !== undefined ? tableData[rowCount/2+index-1].key : ''}}</td>

      <td>{{tableData[rowCount/2+index-1] !== undefined ? tableData[rowCount/2+index-1].value : ''}}</td>

      <td
        class="column"
      >{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : ''}}</td>

      <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
    </tr>
  </table>
</template>



<script>
export default {
  data() {
    return {
      styleObject: {},

      s_showByRow: true,
    };
  },

  props: ["tableData", "tableStyle", "showByRow"],

  computed: {
    rowCount: function () {
      //设置为几列数据就除以几。通过td tr模拟表格

      return Math.ceil(this.tableData.length / 3);
    },
  },

  created() {
    this.styleObject = this.tableStyle;

    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
};
</script>



<style>
.mailTable,
.mailTable tr,
.mailTable tr td {
  border: 1px solid #e6eaee;
}

.mailTable {
  font-size: 10px;
  color: #71787e;
  width: 100%;
  height: 100%;
}

.mailTable tr td {
  border: 1px solid #e6eaee;
  width: 15%;
  height: 76px;
  box-sizing: border-box;
  padding: 0 10px;
}

.mailTable tr td.column {
  background-color: #eff3f6;
  color: #000000;
}
</style>