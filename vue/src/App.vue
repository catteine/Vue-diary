<template>
    <div id="myDiary">

        <app-header>
        </app-header>

        <app-search
            v-bind:searchKey="searchKeyword"
            v-on:@searchAction="setSearchKey">
        </app-search>

        <app-contents
            v-if="isLoaded && !isWriteMode"
            v-bind:isView="isViewMode"
            v-bind:listdata="itemList"
            v-bind:searchKey="searchKeyword"
            v-on:@viewpage="viewPage"
            v-bind:pageData="selectedPage"
            v-on:@backtolist="backToList"
            v-on:@modifypage="modifyPage"
            v-on:@deleteitem="deleteDiaryItem">
        </app-contents>

        <app-btn-write
            v-if="isLoaded && !isWriteMode"
            v-on:@setwritemode="setWriteMode">
        </app-btn-write>

        <app-write
            v-if="isLoaded && isWriteMode"
            v-bind:inputValue="inputText"
            v-bind:thisTime="todayTime"
            v-bind:isModify="isModifyMode"
            v-bind:itemPage="selectedPage"
            v-on:@stopwrite="stopWrite"
            v-on:@additem="addDiaryItem"
            v-on:@modifyitem="modifyDiaryItem">
        </app-write>

        <app-loader v-if="!isLoaded">
        </app-loader>

    </div>
</template>

<script>
import ItemModel from './models/itemModel.js'

import AppHeader from './components/AppHeader.vue'
import AppContents from './components/AppContents.vue'
import AppWrite from './components/AppWrite.vue'
import AppLoader from './components/AppLoader.vue'
import AppWriteButton from './components/AppWriteButton.vue'
import SearchComponent from './components/SearchComponent.vue'

export default {
    name: 'App',
    data () {
        return {
            isWriteMode : false,
            isModifyMode : false,
            isViewMode : false,
            isLoaded : false,
            todayTime : {},
            inputText : "",
            selectedPage : {},
            itemList : [],
            searchKeyword : ""
        }
    },
    components : {
        'app-header' : AppHeader,
        'app-contents' : AppContents,
        'app-write' : AppWrite,
        'app-loader' : AppLoader,
        'app-btn-write' : AppWriteButton,
        'app-search' : SearchComponent
    },
    methods : {
        getToday() {
            var today = new Date(),
            arrayWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            this.todayTime = {
                date : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                week : arrayWeek[today.getDay()],
                createTime : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            };
        },
        getDiaryList() {
            ItemModel.list().then(data => {
                this.itemList = data;
            }).catch(function(err){
                console.log(err);
            });
        },
        addDiaryItem(textData) {
            this.inputText = textData;
            var data = {};
            data = {
                time : this.todayTime,
                text : this.inputText
            };
            ItemModel.saveData(data);
            this.backToList();
            this.appInit();
        },
        modifyDiaryItem(textData) {
            this.inputText = textData;
            var data = {};
            data = {
                text : this.inputText
            };
            ItemModel.updateData(this.selectedPage.key, data);
            this.stopWrite();
            this.appInit();
        },
        deleteDiaryItem() {
            if (confirm("삭제하시겠습니까?")) {
                ItemModel.deleteData(this.selectedPage.key);
                this.backToList();
                this.appInit();
            }
        },
        modifyPage() {
            this.isModifyMode = true;
            this.inputText = this.selectedPage.text;
            this.setWriteMode();
        },
        setWriteMode() {
            this.isWriteMode = true;
            /*
            var t = this;
            Vue.nextTick(function(){
                t.$refs.inputTextArea.focus();
            });
            */
        },
        setContentMode() {
            this.isWriteMode = false;
            this.stopWrite();
        },
        textareaClear() {
            this.inputText = "";
        },
        viewPage(dItem) {
            this.isViewMode = true;
            this.selectedPage = dItem;
        },
        stopWrite() {
            this.isWriteMode = false;
            this.isModifyMode = false;
            this.textareaClear();
        },
        backToList() {
            this.isWriteMode = false;
            this.isModifyMode = false;
            this.isViewMode = false;
            this.stopWrite();
        },
        setSearchKey(query) {
            this.searchKeyword = query;
            this.backToList();
        },
        checkLoaded() {
            var checking = setInterval(() => {
                console.log('Loading...');
                if (ItemModel.loadComplete()) {
                    this.isLoaded = true;
                    console.log('Loading Complete');
                    clearInterval(checking);
                }
            }, 500);
        },
        appInit() {
            this.getToday();
            this.getDiaryList();
        }
    },
    computed : {
       //
    },
    created() {
        //
        console.log('created');
    },
    mounted() {
        //
        console.log('mounted');
        this.appInit();
        this.checkLoaded();
    }
}
</script>

<style scoped>
#myDiary{position:relative;height:100%;overflow:hidden;background:#fafafa}
</style>
