<template>
  <div>
    <div class="alert alert-primary" role="alert">
      图书管理系统
    </div>
    <div class="container input-group input-group-lg">
      <spam style="margin-top: 12px">添加：</spam>
      <input v-model="Name" type="text" class="form-control" aria-label="Sizing example input"
             aria-describedby="inputGroup-sizing-lg">
      <input v-model="Author" type="text" class="form-control" aria-label="Sizing example input"
             aria-describedby="inputGroup-sizing-lg">
      <input v-model="Pub" type="text" class="form-control" aria-label="Sizing example input"
             aria-describedby="inputGroup-sizing-lg">
      <input v-model="Price" type="text" class="form-control" aria-label="Sizing example input"
             aria-describedby="inputGroup-sizing-lg">
      <input v-model="ISBN" type="text" class="form-control" aria-label="Sizing example input"
             aria-describedby="inputGroup-sizing-lg">
      <button type="button" class="btn btn-outline-dark" @click="add()">确定</button>
      <button type="button" class="btn btn-outline-danger" @click="reset()">清空</button>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios.get('api/BookList').then((data) => {
      this.books = data.data.data
      console.log(data)
    })
  },
  head() {
    return {
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
        }
      ]
    }
  },
  data() {
    return {
      Name: '',
      Author: '',
      Pub: '',
      Price: '',
      ISBN: '',
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
    add() {
      this.books.push({
        Name: this.Name,
        Author: this.Author,
        Pub: this.Pub,
        Price: this.Price,
        ISBN: this.ISBN
      })
    },
    reset() {
      this.Name = ''
      this.Author = ''
      this.Pub = ''
      this.Price = ''
      this.ISBN = ''
    },
  }
};
</script>

<style>
/* CSS styles */
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css';

</style>
