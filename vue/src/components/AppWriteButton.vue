<template>
    <div class="btn-write-diary">
        <button type="button" v-on:click="setWriteMode" class="btn-write"><i class="fas fa-plus fa-2x"></i><span class="blind">입력하기</span></button>
    </div>
</template>

<script>
export default {
    methods : {
        setWriteMode() {
            this.$emit('@setwritemode');
        }
    }
}
</script>

<style scoped>
.btn-write-diary{position:fixed;bottom:0;left:0;right:0;height:60px;border:1px solid #fff;background:#fff;box-sizing:border-box;z-index:10000;box-shadow:0 0 5px rgba(0,0,0,0.3)}
.btn-write-diary button{width:100%;height:100%;text-align:center;border:0;background:rgba(255,255,255,0)}
</style>