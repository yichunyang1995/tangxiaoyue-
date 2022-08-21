<template>
  <div class="spec-preview"  @mousemove="move" ref="spec">
     <img :src="imgUrl.imgUrl"  />
     <!-- 不懂 -->
    <div class="event">
    </div>
    <div class="big">
      <img :src="imgUrl.imgUrl" ref="big" />
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
console.log()
  export default {
    
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        index:0
      }
    },
    computed:{
      imgUrl(){
        return this.skuImageList[this.index]||{}
      }
    },
    mounted(){
      this.$bus.$on('hello',(index)=>{
        this.index=index
      })
    },
  methods:{
    move(e){
    let x=e.offsetX-this.$refs.mask.offsetWidth/2
    let y=e.offsetY-this.$refs.mask.offsetHeight/2
    let maxL=this.$refs.spec.offsetWidth-this.$refs.mask.offsetWidth
    let maxT=this.$refs.spec.offsetHeight-this.$refs.mask.offsetHeight
     if(x<0){
       x=0
     }else if(x>maxL){
       x=maxL
     }
    if(y<0){
      y=0
    }else if(y>maxT){
      y=maxT
    }
     this.$refs.mask.style.left = x + "px";
    this.$refs.mask.style.top = y + "px";
    this.$refs.big.style.left=-2*x+'px';
    this.$refs.big.style.top=-2*y+'px';

    }
  }
  }

</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>