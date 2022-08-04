<template>
    <div class="search">

       <form action="/">
  <van-search  v-model="value" shape="round" show-action placeholder="请输入搜索关键词" @input="onSearch"  @search="onSearchs" @cancel="onCancel"/>
</form>

<div class="search-result" v-show="value.trim()">
  <van-cell :title="item.title" @click="searchResultTab(item.title)" v-for="item in searchResult" :key="item._id">
</van-cell>
</div>

<!-- 历史记录 -->
<div class="search-history">
<van-cell title="搜索历史">
<div @click="clear">
  <span>全部删除</span>
  <van-icon name="delete"></van-icon>
</div>
</van-cell>
<van-cell @click="historyTab(item)" :title="item" v-for="(item,index) in searchHistory" :key="item">
<van-icon @click.stop="del(index)" name="close"></van-icon>
</van-cell>
</div>
    </div>
    <!-- 函数防抖 来防止搜索栏多次请求数据 赵成浪费 -->
</template>
<!-- value.trim()  去掉字符串的前后空格 -->


<script>
import search from './search.js'
export default search
</script>

<style lang="scss" scoped>
.van-nav-bar .van-icon {
    color: black;
    font-size: 25px;
}
.van-search{
  background-color: #eee;
}
.search-result{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
  background-color: #f4f4f4;
  z-index: 999;
}
.search-history{
  margin-top: 0px;
}
    
</style>