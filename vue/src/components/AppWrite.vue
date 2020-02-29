<template>
    <div id="contents">

        <write-page
            v-bind:value="inputValue"
            v-bind:todayTime="todayTime"
            v-bind:ismodify="isModifyMode"
            v-bind:thispage="thisPage"
            v-on:@stopwrite="stopWrite"
            v-on:@additem="submitAdd"
            v-on:@modifyitem="submitModify">
        </write-page>

    </div>
</template>

<script>
import WriteComponent from './WriteComponent.vue'

export default {
    props : ['inputValue', 'thisTime', 'isModify', 'itemPage'],
    data() {
        return {
            inputText : this.inputValue,
            todayTime : this.thisTime,
            isModifyMode : this.isModify,
            thisPage : this.itemPage
        }
    },
    components : {
        'write-page' : WriteComponent
    },
    methods : {
        stopWrite() {
            this.$emit('@stopwrite');
        },
        submitAdd(inputVal) {
            this.$emit('@additem', inputVal);
        },
        submitModify(inputVal) {
            this.$emit('@modifyitem', inputVal);
        }
    }
}
</script>

<style scoped>
#contents{position:absolute;top:60px;left:0;right:0;bottom:59px}
</style>