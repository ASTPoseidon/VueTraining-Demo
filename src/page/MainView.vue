<template>
  <div>
    <div class="alert alert-primary" role="alert">
      图书管理系统
      <div style="top: 5px;left: 90%;position: absolute">
        <button class="btn btn-outline-primary" @click="backLogin()">返回登陆界面</button>
      </div>
    </div>
    <div class="container input-group input-group-lg">
      <spam style="margin-top: 12px">添加：</spam>
      <input v-model="Name" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             type="text">
      <input v-model="Author" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             type="text">
      <input v-model="Pub" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             type="text">
      <input v-model="Price" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             type="text">
      <input v-model="ISBN" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             type="text">
      <button :disabled="isDisabled" class="btn btn-outline-primary" type="button" @click="add()">确定</button>
      <button class="btn btn-outline-secondary" type="button" @click="reset()">清空</button>
      <button class="btn btn-outline-danger" style="margin-left: 50px" type="button" @click="del()">删除</button>
    </div>
    <!-- 图书列表 -->
    <div style="display: flex;justify-content: center;align-items: center">
      <div style="width: 185vh">
        <h2>图书列表：</h2>
        <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
          <table class="table table-striped table-md">
            <thead>
            <tr>
              <th>#</th>
              <th>书名</th>
              <th>作者</th>
              <th>出版社</th>
              <th>价格</th>
              <th>ISBN</th>
            </tr>
            </thead>
            <tbody>
            <template>
              <tr v-for="book in books" :key="book.ID">
                <td><input v-model="selectedList" :value="book.ID" name="checkbox" type="checkbox"></td>
                <td :id="`${book.ID}_Name`">{{ book.Name }}</td>
                <td :id="`${book.ID}_Author`">{{ book.Author }}</td>
                <td :id="`${book.ID}_Publisher`">{{ book.Pub }}</td>
                <td :id="`${book.ID}_Price`">{{ book.Price }}</td>
                <td :id="`${book.ID}_ISBN`">{{ book.ISBN }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Name: '',
      Author: '',
      Pub: '',
      Price: '',
      ISBN: '',
      books: [],
      selectedList: [],
    };
  },
  created() {
    axios.get('api/BookList').then((data) => {
      this.books = data.data.data
    })
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.Au) {
      if (sessionStorage.getItem('status') !== "1") {
        alert("请先登录！")
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  },
  computed: {
    isDisabled() {
      return this.Name === '' || this.Author === '' || this.Pub === '' || this.Price === '' || this.ISBN === '';
    },
  },
  methods: {
    backLogin() {
      this.$router.push('/');
    },
    add() {
      this.books.push({
        ID: this.books.length + 1,
        Name: this.Name,
        Author: this.Author,
        Pub: this.Pub,
        Price: this.Price,
        ISBN: this.ISBN
      })
      this.reset()
    },
    reset() {
      this.Name = ''
      this.Author = ''
      this.Pub = ''
      this.Price = ''
      this.ISBN = ''
    },
    del() {
      this.selectedList.forEach(i => {
        this.books.splice(i - 1, 1)
      })
      this.reset()
    }
  }
};
</script>

<style scoped>

</style>
