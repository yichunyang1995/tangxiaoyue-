<template>
  <div class="type-nav">
    <!-- <h1>{{category}}</h1> -->
    <div class="container" @mouseleave="navNone">
      <h2 class="all" @mouseenter="navShow" >
        全部商品分类
      </h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(item, index) in category"
              :key="item.categoryId"
              @mousemove="colorChange(index)"
              @mouseout="colorLeave"
              :class="{ cur: index == currentIndex }"
            >
              <h3>
                <a
                  :data-categoryName="item.categoryName"
                  :data-category1Id="item.categoryId"
                  >{{ item.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="(item2, index) in item.categoryChild"
                  :key="item2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="item2.categoryName"
                        :data-category2Id="item2.categoryId"
                        >{{ item2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(item3, index) in item2.categoryChild"
                        :key="item3.categoryId"
                      >
                        <a
                          :data-categoryName="item3.categoryName"
                          :data-category3Id="item3.categoryId"
                          >{{ item3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
// console.log(lod)
export default {
  name: "TypNave",
  //组件挂在完毕  可以向服务区请求数据  然后展示数据
  mounted() {
  
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    ...mapState({
      //这里的state就为大仓库中的数据
      category: function (state) {
        //console.log(state)
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    navShow() {
      this.show = true;
    },
    navNone() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // colorChange(index){
    // // console.log(index)

    // },
    //节流操作，采取的是键值对的形式  throttle属于lodash里面的函数方法
    colorChange: _.throttle(function (index) {
      this.currentIndex = index;
      //  console.log(index)
    }, 50),
    colorLeave() {
      this.currentIndex = -1;
    },
    goSearch(event) {
      // this.$router.push('/search')
      //事件委托
      let el = event.target;
      //节点有个属性 dataset 可以取出节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      //    console.log(el.dataset);
      //标签上拥有catagoryname属性就一定是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // console.log(location, query)
        if(this.$route.params){
            location.params=this.$route.params;
              location.query = query;
        //整理完参数
        // console.log(location)
        this.$router.push(location);
        }

      
      }
    },
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue !important;
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: 1s;
    }
  }
}
</style>