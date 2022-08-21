<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="sendData">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="sendData2" >1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>
 
    <button  v-for="(item, index) in startNumAndEndNum.end" :key="index" v-if="item>=startNumAndEndNum.start" @click="$emit('getPage',item)"  >
      {{ item }}
    </button>

    <button v-if="startNumAndEndNum.end<totolPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totolPage" @click="sendData3">{{ totolPage }}</button>
    <button  @click="sendData4" :disabled='pageNo==totolPage'>下一页</button>
    <button style="margin-left: 30px">{{ total }}</button>
    <!-- <h1>{{ startNumAndEndNum}}</h1> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "countinues"],
  //计算出总共的页码数
  computed: {
    //向上取整
    totolPage() {
      // console.log(this);
      // console.log(this.pageNo)
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { totolPage, pageNo, countinues } = this;
      // console.log(pageNo)
      let start = 0;
      let end = 0;
      //总页数没有连续页码数大
      if (countinues > totolPage) {
        start = 1;
        end = totolPage;
      } else {
        //开始数字
        start = pageNo - parseInt(countinues/ 2);
        //结束数字
        end = pageNo + parseInt(countinues / 2);
        if (start < 1) {
          start = 1;
          end = countinues;
        }
        if (end > totolPage) {
          end = totolPage;
          start = totolPage - countinues + 1;
        }
      }
 return { start,end}
    },
  },
  methods:{
    sendData(){
  //  console.log(this.pageNo)
    this.$emit('getPage',this.pageNo-1)
    },
    sendData2(){
    this.$emit('getPage',1)   
    },
    sendData3(){
      this.$emit('getPage',this.totolPage)
    },
    sendData4(){
      this.$emit('getPage',this.pageNo+1)
    }
    // sendData3(){
    // this.$emit('getPage',this.item)   
    // }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>