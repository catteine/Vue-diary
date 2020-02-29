<template>
    <div id="contents">

        <list-page
            v-if="!isviewmode"
            v-bind:data="itemList"
            v-bind:query="searchKey"
            v-on:@viewpage="viewPage">
        </list-page>

        <view-page
            v-if="isviewmode"
            v-bind:page="itemPage"
            v-on:@backtolist="backToList"
            v-on:@modifypage="modifyPage"
            v-on:@deleteitem="deleteItem">
        </view-page>

    </div>
</template>

<script>
import ListComponent from './ListComponent.vue'
import ViewComponent from './ViewComponent.vue'

export default {
    props : ['isView', 'listdata', 'pageData', 'searchKey'],
    data() {
        return {
            isviewmode : this.isView,
            itemList : this.listdata,
            itemPage : this.pageData
        }
    },
    components : {
        'list-page' : ListComponent,
        'view-page' : ViewComponent
    },
    methods : {
        viewPage(item) {
            this.$emit('@viewpage', item);
        },
        modifyPage() {
            this.$emit('@modifypage');
        },
        deleteItem() {
            this.$emit('@deleteitem', 'delete');
        },
        backToList() {
            this.$emit('@backtolist');
        }
    },
    watch : {
        isView : function() {
            this.isviewmode = this.isView;
            this.itemPage = this.pageData;
        },
        listdata : function() {
            this.itemList = this.listdata;
        },
        pagedata : function() {
            this.itemPage = this.pageData;
        }
    }
}
</script>

<style scoped>
#contents{position:absolute;top:60px;left:0;right:0;bottom:59px}
</style>