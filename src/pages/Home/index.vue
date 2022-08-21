<template>
  <div>
    <TypNave />
    <List/>
    <Recommed/>
    <Rank/>
    <Like/>
    <Floor v-for="(item,index) in floorList" :key="item.id" :list="item"/>
    <!-- <Floor/> -->
  </div>
</template>
<script>
import List from '@/pages/Home/List'
import Recommed from '@/pages/Home/Recommed'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import  Floor from '@/pages/Home/Floor'
import {mapState} from 'vuex'
export default {
  name: "Home",
 components:{
   List,
   Recommed,
   Rank,
   Like,
   Floor
 },
 mounted(){
   this.$store.dispatch("getFloorList")
   this.$store.dispatch('getUserMessage')
 },
 computed:{
// floorList:...mapState(function(state){
//   return state.floorList
// })
...mapState({
  floorList:function(state){
  return state.home.floorList
  }
})
 }
};
</script>

<style lang='less' scoped>
</style>

