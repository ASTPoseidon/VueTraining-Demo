<template>
  <div>
    <!--top-->
    <div class="top">
      <input v-model="content">
      <button @click="Add()">添加</button>
    </div>
    <!--main-->
    <div class="main">
      <div>
        <h2>未完成</h2>
        <ui>
          <li v-for="i in list" v-show="!i.status" :key="i.id">{{ i.content }}
            <button @click="Fin(i.id)">完成</button>
          </li>
        </ui>
      </div>
      <div>
        <h2>已完成</h2>
        <ui>
          <li v-for="i in list" v-show="i.status" :key="i.id">{{ i.content }}
            <button @click="Del(i.id)">删除</button>
          </li>
        </ui>
      </div>
      <div>
        <h2>全部</h2>
        <ui>
          <li v-for="i in list" :key="i.id">{{ i.content }}</li>
        </ui>
      </div>
    </div>

    <br>

    <div>
      <!-- 搜索框 -->
      <div class="search">
        <img src="./../assets/LogIn.png" width="40"/>
        <input placeholder="请输入搜索内容"/>
        <button>
          <img src="./../assets/search.png"/>
        </button>
      </div>
      <!-- 轮播图 -->
      <img src="./../assets/news.jpg" width="30%"/>

      <!-- 列表 -->
      <div class="list">
        <h2>新闻列表</h2>
        <div v-for="item in news" :key="item.id" class="news-item">
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.desc }}</p>
          <p class="time">{{ item.createTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  created() {
    axios.get('api/list').then((data) => {
      console.log(data)
      this.news = data.data.data
    })
  },

  data() {
    return {
      content: "",
      list: [],
      news: []
    }
  },
  methods: {
    Add() {
      if (this.content != "")
        this.list.push({
          id: new Date().getTime(),
          content: this.content,
          status: false
        })
      this.content = ""
      console.log(this.list)
    },
    Fin(id) {
      this.list.forEach(i => {
        if (i.id == id) {
          i.status = true
        }
      })
    },
    Del(id) {
      this.list.splice(this.list.indexOf(id), 1)
      // or:
      // this.list.splice(this.list.findIndex((each) => {
      //   return each.id == id
      // }),1)
    }
  }
}
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

.top {
  height: 120px;
  text-align: center;
}

.top input {
  width: 800px;
  height: 60px;
  border: 2px solid #ff9900;
  border-radius: 10px;
  outline: none;
  padding-left: 20px;
  font-size: 18px;
  margin-top: 30px;
}

.top input:focus {
  border: 2px solid #ff9900;
  box-shadow: 0px 0px 20px #ff9900;
}

.top button {
  width: 100px;
  height: 60px;
  border: 1px solid #000000;
  background: #ff9900;
  border-radius: 10px;
  margin-left: 20px;
  color: #ffffff;
}

.main {
  display: flex;
  width: 1250px;
  margin-left: auto;
  margin-right: auto;
}

.main div {
  width: 400px;
  border: 1px solid #ff9900;
  margin-right: 25px;
  padding: 15px;
  border-radius: 5px;
}

li {
  list-style: none;
  line-height: 41px;
  padding-left: 15px;
}

li:hover {
  background: #ff9900;
  color: #ffffff;
  padding-left: 15px;
  border-radius: 10px;
}

li button {
  background: #ff9900;
  color: #ffffff;
  border: none;
  margin-left: 15px;
  padding: 5px;
}

li :hover button {
  background: #ffffff;
  color: #ff9900;
}

.search {
  padding: 5px 15px;
  height: 40px;
  border-bottom: 1px solid #ccc; /**下边框 */
}

.search input {
  vertical-align: top; /**垂直方向上的对齐方式 */
  width: 70%;
  padding-left: 5%;
  font-size: 16px;
  height: 40px;
  border: none; /**去除边框 */
  outline: none; /**去除点击效果 */
}

.search button {
  background: none;
  border: none;
  vertical-align: top;
  margin-top: 5px;
  border: 1px solid #5465CF;
  width: 30px;
  height: 30px;
  border-radius: 50%; /**变成圆 */
}

.search button img {
  width: 20px;

}

.list {
  padding: 15px;
}

.list h2 {
  font-size: 18px;
}

.news-item {
  margin: 10px 0;
  border-bottom: 1px solid #eee;
}

.title {
  font-weight: 600; /**600 - 900是加粗 */
  margin-bottom: 5px;
}

.desc {
  font-size: 13px;
  color: #666;
}

.time {
  color: #333;
  margin-top: 10px;
  font-size: 12px;
}
</style>
