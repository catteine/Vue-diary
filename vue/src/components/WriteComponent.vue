<template>
    <div class="write-page">
        <div class="page-top">
            <h2>
                <span v-if="!isModify">{{timeValue.date}} {{timeValue.week}}</span>
                <span v-else>{{thisPage.time.date}} {{thisPage.time.week}}</span>
            </h2>
        </div>
        <div class="page-write-box">
        <form>
            <div class="write-inner">
                <textarea v-model="inputValue" ref="inputTextArea" placeholder="내용을 입력하세요 (500자 제한)" maxlength="500" key="text-area"></textarea>
            </div>
            <div class="write-btns">
                <button type="submit" v-if="!isModify" v-on:click.prevent="submitAdd" class="btn-submit">
                    <i class="fas fa-check fa-2x"></i><span class="blind">작성 완료</span>
                </button>
                <button type="submit" v-else v-on:click.prevent="submitModify" class="btn-submit">
                    <i class="fas fa-check fa-2x"></i><span class="blind">수정 완료</span>
                </button>
                <button type="button" v-on:click="stopWrite" class="btn-text-cancel">
                    <i class="fas fa-times fa-2x"></i><span class="blind">취소</span>
                </button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    props : ['value', 'ismodify', 'todayTime', 'thispage'],
    data() {
        return {
            inputValue : this.value.trim(),
            isModify : this.ismodify,
            timeValue : this.todayTime,
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
                this.$emit('@additem', this.inputValue);
            }
        },
        submitModify() {
            if (!this.isTextAreaEmpty()) {
                this.$emit('@modifyitem', this.inputValue);
                this.thisPage.text = this.inputValue;
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
    watch : {
        value : function() {
            console.log('a')
        }
    },
    mounted() {
        //this.focusTextArea();
    }
}
</script>

<style scoped>
.write-page{position:relative;height:100%}
.write-page .page-top{position:absolute;top:10px;left:20px;right:20px;height:60px;background:#fff}
.write-page .page-top h2{height:60px;color:#000;font-size:20px;line-height:60px;text-align:center;white-space:nowrap;margin:0 15px;box-sizing:border-box}
.write-page .page-write-box{position:absolute;top:70px;left:20px;right:20px;bottom:0}
.write-page .page-write-box .write-inner{position:absolute;top:0;left:0;bottom:70px;width:100%;}
.write-page .page-write-box .write-inner textarea{width:100%;height:100%;overflow:hidden;overflow-y:auto;color:#000;font-size:16px;line-height:1.6em;word-break:break-all;border:0;background:#fff;padding:10px 20px 0;box-sizing:border-box;-webkit-appearance:none}
.write-page .page-write-box .write-btns{position:absolute;bottom:0;left:0;right:0;padding:20px 0}
.write-page .page-write-box .write-btns:after{clear:both;display:table;content:''}
.write-page .page-write-box .write-btns button{width:30px;height:30px;border:0;background:#fff}
.write-page .page-write-box .write-btns .btn-text-cancel{float:left}
.write-page .page-write-box .write-btns .btn-submit{float:right}
</style>