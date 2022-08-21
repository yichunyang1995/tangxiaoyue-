<template>
   <div>
       <Header/>
       <router-view></router-view>
    <Footer v-show="$route.meta.show"> </Footer>
   </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
name:"App",
components:{Header,Footer},
mounted() {
   //性能优化  放在app组件中  数据只会从后台申请加载一次  提升性能
     this.$store.dispatch("categoryList");
},
}
</script>

<style>

</style>
