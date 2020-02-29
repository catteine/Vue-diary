export default {
    template : '#write-page',
    props : ['value', 'ismodify', 'thistime', 'thispage'],
    data() {
        return {
            inputValue : this.value.trim(),
            isModify : this.ismodify,
            timeValue : this.thistime,
            thisPage : this.thispage
        }
    },
    watch : {
        inputValue : function (){
            //console.log('asd');
        }
    },
    methods : {
        stopWrite() {
            this.$emit('@stopwrite');
        },
        submitAdd() {
            if (!this.isTextAreaEmpty()) {
                this.$emit('@submitaction', 'add', this.inputValue);
            }
        },
        submitModify() {
            if (!this.isTextAreaEmpty()) {
                this.$emit('@submitaction', 'modify', this.inputValue);
            }
        },
        isTextAreaEmpty() {

            if (this.inputValue === "") {
                alert("내용을 입력하세요");
                //this.focusTextArea();
                return true;
            } else {
                return false;
            }
        },
        focusTextArea() {
            this.$refs.inputTextArea.focus();
        }
    },
    mounted() {
        //this.focusTextArea();
    }
}