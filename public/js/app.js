import ItemModel from './itemModel.js'

import WriteComponent from './component/WriteComponent.js'
import ViewComponent from './component/ViewComponent.js'
import ListComponent from './component/ListComponent.js'

var diary = new Vue({
    el : "#app",
    data : {
        isWriteMode : false,
        isModifyMode : false,
        isViewMode : false,
        isLoaded : false,
        thisTime : {},
        inputText : "",
        thisPage : {},
        itemList : [],
        arrayWeek : [
            'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
        ]
    },
    components : {
        'write-page' : WriteComponent,
        'view-page' : ViewComponent,
        'list-page' : ListComponent
    },
    methods : {
        getToday() {
            var today = new Date();
            this.thisTime = {
                date : today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
                week : this.arrayWeek[today.getDay()],
                createTime : today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            };
        },
        getThisList() {
            ItemModel.list().then(data => {
                this.itemList = data;
            }).catch(function(err){
                console.log(err);
            });
        },
        setItemToList(setType, queryText) {
            this.inputText = queryText;
            
            if (setType === "delete") {
                if (confirm("삭제하시겠습니까?")) {
                    ItemModel.deleteData(this.thisPage.key);
                    this.backToList();
                    this.appInit();
                }
            } else {
                if (this.inputText === "") {
                    alert("내용을 입력하세요");
                } else {
                    var data = {};
                    if (setType === "add") {
                        data = {
                            time : this.thisTime,
                            text : this.inputText
                        };
                        ItemModel.saveData(data);
                        this.backToList();
                    } else if (setType === "modify") {
                        this.thisPage.text = this.inputText;
                        data = {
                            text : this.inputText
                        };
                        ItemModel.updateData(this.thisPage.key, data);
                        this.stopWrite();
                    }
                    this.appInit();
                }
            }
        },
        modifyPage() {
            this.isModifyMode = true;
            this.inputText = this.thisPage.text;
            this.setWriteMode();
        },
        setWriteMode() {
            this.isWriteMode = true;
            var t = this;
            Vue.nextTick(function(){
                //t.$refs.inputTextArea.focus();
            });
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
            this.thisPage = dItem;
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
        checkLoaded() {
            var t = setInterval(() => {
                console.log('Loading...')
                if (ItemModel.loadComplete()) {
                    this.isLoaded = true;
                    clearInterval(t);
                }
            }, 500);
        },
        appInit() {
            this.getToday();
            this.getThisList();
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
});