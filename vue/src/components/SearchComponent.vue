<template>
    <div id="search">
        <button type="button" v-on:click="toggleBox" class="btn-toggle">
            <i class="fas fa-search fa-2x" v-if="isFolded"></i>
            <i class="fas fa-times fa-2x" v-else></i>
            <span class="blind">검색</span>
        </button>
        <div class="search-box" v-show="!isFolded">
            <input type="search" v-model="query" v-on:keyup.enter="searchDiary">
        </div>
    </div>
</template>

<script>
export default {
    props : ['searchKey'],
    data() {
        return {
            query : this.searchKey,
            isFolded : true
        }
    },
    methods : {
        searchDiary() {
            this.$emit('@searchAction', this.query);
        },
        toggleBox() {
            this.isFolded = !this.isFolded;
            this.query = "";
        }
    }
}
</script>

<style scoped>
#search{position:fixed;top:0;right:0;width:100%;height:0;z-index:1500}
#search .btn-toggle{position:absolute;top:15px;right:15px;width:30px;height:30px;color:#fff;border:0;background:rgba(0,0,0,0)}
#search .search-box{position:absolute;top:10px;left:20px;right:60px;background:rgb(214,230,245)}
#search .search-box input{width:100%;height:40px;color:#000;font-size:14px;line-height:20px;border:1px solid #ddd;background:#fff;padding:10px;box-sizing:border-box}
</style>