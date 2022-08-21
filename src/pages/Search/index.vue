<template>
  <div>
    <!-- 商品三级列表 -->
    <TypNave />
    <div class="main">
      <div class="py-container">
        <!--bread 面包线-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeDate">x</i>
            </li>
            <!-- 搜索的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
              <!-- 品牌面包屑 -->
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removetrademark">x</i>
            </li>
            <!-- 平台售卖属性值的展示 -->
             <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{item.split(":")[1]}}<i @click="removeProps(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @makeInfo="brandInfo" @atterInfo="atterInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:one}" @click="changeOrder(1)">
                  <a >综合<span v-show="one" class="iconfont " :class="{'icon-shangjiantou':isAsc,'icon-xiajiantou':isDesc}"  ></span></a>
                </li >
                <li :class="{active:two}" @click="changeOrder(2)">
                  <a >价格 <span class="iconfont " :class="{'icon-shangjiantou':isAsc,'icon-xiajiantou':isDesc}" v-show="two" ></span></a>
                </li>
              </ul>
            </div>
          </div>
        <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                v-for="(item, index) in goodsList"
                :key="item.id"
                class="yui3-u-1-5"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"
                      ><img :src="item.defaultImg"
                    /></a> -->
                    <!-- 路由跳转的时候带上id(params) -->
                    <router-link :to='`/detail/${item.id}`'>
                    <img :src="item.defaultImg"/>
                     <!-- <img v-lazy="item.defaultImg"/> -->
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em> ¥</em>&nbsp;
                      <i>{{ item.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        <Pagination :pageNo=searchParams.pageNo :pageSize=searchParams.pageSize :total=totle :countinues=5 @getPage="getPage"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters ,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器参数,
      searchParams: {
        //一级分类
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        //分页器
        pageNo: 5,
        //排序方式
        order: "2:desc",
        //一页展示个数
        pageSize:4,
        //平台售卖属性
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //在发请求之前  把接口需要传递的参数进行整理好  服务器就会返回查询的数据
  created() {
    // // console.log(this.$route.query)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getDate();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    one(){
      return  this.searchParams.order.indexOf('1')!=-1
    },
      two(){
      return  this.searchParams.order.indexOf('2')!=-1
    },
    isAsc(){
return this.searchParams.order.indexOf('asc')!=-1
    },
        isDesc(){
return this.searchParams.order.indexOf('desc')!=-1
    },
  ...mapState({
    totle:function(state){
      // console.log(state)
      return state.search.getSearchList.total
    }
  })
  },
  methods: {
    //根据参数不同返回不同的数据进行展示
    getDate() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类的名字
    removeDate() {
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";

      //再次发起请求
      this.getDate();
      // console.log(this.$router)
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      //给服务器带的参数的keyword置空
      this.searchParams.keyword = "";
      //再次发数据请求
      this.getDate();
      this.$router.push({ name: "search", query: this.$route.query });
      //自定义事件clear
      this.$bus.$emit("clear");
    },
    //删除品牌的名字
    removetrademark() {
      this.searchParams.trademark = "";
      this.getDate();
    },
    brandInfo(item) {
      // console.log(item)
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`;
      this.getDate();
    },
    atterInfo(item,items){
    // console.log(item,items)
    let props=`${item.attrId}:${items}:${item.attrName}`
    if(this.searchParams.props.indexOf(props)==-1){
 this.searchParams.props.push(props);
    }
    this.getDate();
    },
    //删除售卖的属性
    removeProps(index){
    this.searchParams.props.splice(index,1);
    this.getDate()
    },
    changeOrder(flag){
      // alert(flag)
      //获取起始的状态
      let originOrder=this.searchParams.order;
      // console.log(originOrder)
      let originFlag=this.searchParams.order.split(':')[0]
      // console.log(originFlag)
      let originSort=this.searchParams.order.split(':')[1];
      // console.log(originFlag,flag)
      //准备一个新的order属性值
      let newOrder='';
      if(flag==originFlag){
    newOrder=`${originFlag}:${originSort=='desc'?'asc':'desc'}`
      }else{
        newOrder=`${flag}:${'desc'}`
      }
      //将新的order赋予给searchParams
  this.searchParams.order=newOrder;
  //再次发请求  拿数据
  this.getDate();
    },
    getPage(pageNo){
    this.searchParams.pageNo=pageNo;
    this.getDate();
    }
  },
  //数据监听  监听组件实例身上的属性的属性值的变化
  watch: {
    //监听路由信息是否变化  如发生变化  再次发生请求
    $route(newValue, oldValue) {
      // alert(123)
      //再次发请求之前的整理数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // console.log(this.searchParams)
      //再次发起ajax请求
      this.getDate();
      //每次请求之后 需要把一级、二级或者三级进行置空
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>