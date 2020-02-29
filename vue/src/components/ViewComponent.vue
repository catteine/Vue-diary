<template>
    <div class="view-page">
        <div class="page-top">
            <button type="button" v-on:click="backToList" class="btn-back-to-list"><i class="fas fa-arrow-left fa-2x"></i><span class="blind">목록으로</span></button>
            <h2>{{pageItem.time.date}} {{pageItem.time.week}}</h2>
        </div>
        <div class="page-text">
            <div v-html="replaceStringWithHTML(pageItem.text)" class="text-inner"></div>
            <p class="text-footer">
                <span class="created-time">{{pageItem.time.createTime}}에 작성됨</span>
            </p>
        </div>
        <div class="page-bottom">
            <button type="button" v-on:click="modifyPage" class="btn-page-modify"><i class="fas fa-edit fa-2x"></i><span class="blind">수정</span></button>
            <button type="button" v-on:click="deleteItem" class="btn-page-delete"><i class="fas fa-trash-alt fa-2x"></i><span class="blind">삭제</span></button>
        </div>
    </div>
</template>

<script>
export default {
    props : ['page'],
    data() {
        return {
            pageItem : this.page
        }
    },
    methods : {
        replaceStringWithHTML(dText) {
            var str = dText.split(' ').join('&nbsp;');
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
            return str;
        },
        replaceHTMLWithString(dText) {
            var str = dText.split('&nbsp;').join(' ');
            str = str.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
            return str;
        },
        modifyPage() {
            this.$emit('@modifypage');
        },
        deleteItem() {
            this.$emit('@deleteitem');
        },
        backToList() {
            this.$emit('@backtolist');
        }
    }
}
</script>

<style scoped>
.view-page{position:relative;height:100%}
.view-page .page-top{position:absolute;top:10px;left:20px;right:20px;height:60px;background:#fff}
.view-page .page-top h2{height:60px;color:#000;font-size:20px;line-height:60px;text-align:center;white-space:nowrap;margin:0 15px;box-sizing:border-box}
.view-page .page-top .btn-back-to-list{position:absolute;top:15px;left:20px;width:30px;height:30px;border:0;background:#fff}
.view-page .page-text{position:absolute;top:70px;left:20px;right:20px;bottom:70px;overflow:hidden;overflow-y:auto;background:#fff}
.view-page .page-text .text-inner{color:#000;font-size:16px;line-height:1.6em;word-break:break-all;margin:10px 20px 0}
.view-page .page-text .text-footer{text-align:right;padding:30px 0 10px}
.view-page .page-text .text-footer .created-time{color:#888;font-size:12px}
.view-page .page-bottom{position:absolute;bottom:0;left:30px;right:30px;padding:20px 0}
.view-page .page-bottom:after{clear:both;display:table;content:''}
.view-page .page-bottom button{width:30px;height:30px;border:0;background:#fff}
.view-page .page-bottom .btn-page-delete{float:left}
.view-page .page-bottom .btn-page-modify{float:right}
</style>