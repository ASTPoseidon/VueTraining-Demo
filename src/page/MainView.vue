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
             placeholder="书名" type="text">
      <input v-model="Author" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             placeholder="作者" type="text">
      <input v-model="Publisher" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             placeholder="出版社" type="text">
      <input v-model="Price" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             placeholder="价格" type="text">
      <input v-model="ISBN" aria-describedby="inputGroup-sizing-lg" aria-label="Sizing example input"
             class="form-control"
             placeholder="ISBN" type="text">
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
                <td><input v-model="selectedList" :value="book.ID" name="checkbox" type="checkbox" @change="check()">
                </td>
                <td :id="`${book.ID}_Name`">{{ book.Name }}</td>
                <td :id="`${book.ID}_Author`">{{ book.Author }}</td>
                <td :id="`${book.ID}_Publisher`">{{ book.Publisher }}</td>
                <td :id="`${book.ID}_Price`">{{ book.Price }}</td>
                <td :id="`${book.ID}_ISBN`">{{ book.ISBN }}</td>
              </tr>
            </template>
            </tbody>
          </table>
          <input v-model="all" type="checkbox" @change="selectAll()">&nbsp;全选
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
      Publisher: '',
      Price: '',
      ISBN: '',
      books: [],
      selectedList: [],
      all: false
    };
  },
  created() {
    axios.get('api/List').then((data) => {
      this.books = data.data
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
      return this.Name === '' || this.Author === '' || this.Publisher === '' || this.Price === '' || this.ISBN === '';
    },
  },
  methods: {
    backLogin() {
      this.$router.push('/');
    },
    selectAll() {
      if (this.all) {
        this.books.forEach(i => {
          this.selectedList.push(i.ID)
        })
      } else {
        this.selectedList = []
      }
    },
    check() {
      if (this.selectedList.length == this.books.length) {
        this.all = true
      } else {
        this.all = false
      }
    },
    add() {
      if (isNaN(Number(this.Price))) {
        alert("输入有误！")
        this.reset()
      } else {
        // var lastID = this.books[this.books.length - 1].ID + 1
        var lastID = this.books.length == 0 ? 0 : this.books[this.books.length - 1].ID + 1
        this.books.push({
          ID: lastID,
          Name: this.Name,
          Author: this.Author,
          Publisher: this.Publisher,
          Price: this.Price,
          ISBN: this.ISBN
        })
        axios.get('api/Insert', {
          params: {
            Name: this.Name,
            Author: this.Author,
            Publisher: this.Publisher,
            Price: this.Price,
            ISBN: this.ISBN
          }
        }).then(response => {
          if (response.data.message === 'success') {
            console.log("插入成功")
          } else {
            console.log("插入失败")
          }
        })
        this.reset()
      }
    },
    reset() {
      this.Name = ''
      this.Author = ''
      this.Publisher = ''
      this.Price = ''
      this.ISBN = ''
    },
    del() {
      this.selectedList.forEach(i => {
        this.books = this.books.filter(book => book.ID !== i);
        axios.get(`api/Delete?ID=${i}`)
      })
      this.reset()
    }
  }
};
</script>

<style scoped>

</style>
