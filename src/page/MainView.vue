<template>
  <div>
    <div class="alert alert-primary" role="alert">
      图书管理系统
    </div>
    <div class="container input-group input-group-lg">
      <spam style="margin-top: 12px">索引：</spam>
      <select v-model="selectedType" style="text-align:center;width: 20vh">
        <option value="null">索引条件</option>
        <option value="书名">书名</option>
        <option value="作者">作者</option>
        <option value="出版社">出版社</option>
        <option value="价格">价格</option>
        <option value="ISBN">ISBN</option>
      </select>
      <input v-model="searchText" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
      <button type="button" class="btn btn-outline-dark" @click="search" :disabled="selectedType === 'null' || searchText.trim() === ''">搜索</button>
      <button type="button" class="btn btn-outline-danger" @click="reset">清空</button>
      <button v-if="flag === 1" type="button" class="btn btn-outline-success" @click="backMain">返回图书列表</button>
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
              <tr v-for="book in books" :key="book.id">
                <td><input type="checkbox" name="checkbox" :value="book.id"></td>
                <td :id="`${book.id}_Name`">{{ book.Name }}</td>
                <td :id="`${book.id}_Author`">{{ book.Author }}</td>
                <td :id="`${book.id}_Publisher`">{{ book.Pub }}</td>
                <td :id="`${book.id}_Price`">{{ book.Price }}</td>
                <td :id="`${book.id}_ISBN`">{{ book.ISBN }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="text-align: right;margin-right: 100px">
      <button style="margin-right: 20px" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addbook">
        添加书籍
      </button>
      <button style="margin-right: 20px" type="button" class="btn btn-warning" data-toggle="modal" data-target="#updatebook" :disabled="selectedBooks.length !== 1">修改书籍</button>
      <button style="margin-right: 20px" type="button" class="btn btn-danger" @click="deleteBooks">删除书籍</button>
      <div style="text-align: right">
        <small class="form-text text-muted">（仅有 1 个书籍被选中时，修改按钮激活）</small>
      </div>
    </div>
    <!-- 添加书籍的模态框 -->
    <div class="modal fade" id="addbook" tabindex="-1" aria-labelledby="addbook" aria-hidden="true">
      <!-- ... -->
    </div>
    <!-- 修改书籍的模态框 -->
    <div class="modal fade" id="updatebook" tabindex="-1" aria-labelledby="updatebook" aria-hidden="true">
      <!-- ... -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios.get('api/BookList').then((data) => {
      this.books = data.data.data
      console.log(this.books)
    })
  },
  head(){
    return{
      script:[
        {
          src:'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js'
        },
        {
          src:'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
        }
      ]
    }
  },
  data() {
    return {
      selectedType: '',
      searchText: '',
      flag: 0,
      bookResult: [],
      books: [],
      selectedBooks: [],
      // ... other data properties
    };
  },
  methods: {
    search() {
      // Perform search logic and update the bookResult or books array based on the flag
      if (this.flag === 1) {
        // Perform search with bookResult
      } else {
        // Perform search with books
      }
    },
    reset() {
      this.searchText = '';
    },
    backMain() {
      this.flag = 0;
      // Perform any necessary logic to reset the view back to the main book list
    },
    deleteBooks() {
      // Perform logic to delete the selected books
    },
    // ... other methods
  },
};
</script>

<style>
/* CSS styles */
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';

</style>
