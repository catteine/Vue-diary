<template>
    <div class="list-page">
        <div class="item-list" v-if="resultList.length">
            <ul>
                <li v-for="{item, index} in resultList" v-bind:key="item.key">
                    <a href="#item" v-on:click.prevent="viewPage(item)">
                        <div class="item">
                            <div class="d_date">
                                {{item.time.date}} <span class="d_weekday">{{item.time.week}}</span>
                            </div>
                            <div class="d_summary">{{createSummary(item.text)}}</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="item-list-none" v-else>
            <p v-on:click.prevent="viewPage(item)">아이템이 없습니다.</p>
        </div>
    </div>
</template>

<script>
export default {
    props : ['query', 'data'],
    data() {
        return {
            itemList : this.data,
            resultList : [],
            summaryLimit : 30
        }
    },
    methods : {
        createSummary(dText) {
            var text = dText.slice(0, this.summaryLimit);
            if (dText.length > this.summaryLimit) {
                text = text + "...";
            }
            return text;
        },
        viewPage(item) {
            this.$emit('@viewpage', item);
        },
        searchResult() {
            if (this.keyword !== "") {
                this.resultList = this.itemList.filter(item => item.text.indexOf(this.query) > -1);
            } else {
                this.resultList = this.itemList;
            }
        }
    },
    mounted() {
        this.searchResult();
    },
    watch : {
        query() {
            this.searchResult();
        }
    }
}
</script>

<style scoped>
.list-page{position:relative;height:100%;overflow:hidden;overflow-y:auto}
.list-page .item-list{}
.list-page li{border-bottom:1px solid #ddd;background:#fff;}
.list-page li:first-child{margin:0}
.list-page li a{display:block}
.list-page .item{position:relative;font-size:16px;line-height:1.5;padding:15px}
.list-page .item .d_date{color:#555;font-size:14px;margin-bottom:5px}
.list-page .item .d_date .d_weekday{color:#aaa;font-style:italic}
.list-page .item .d_summary{overflow:hidden;color:#000;font-weight:500;white-space:nowrap;text-overflow:ellipsis}
.list-page .item-list-none{padding:100px 0}
.list-page .item-list-none p{color:#000;font-size:16px;text-align:center}
</style>