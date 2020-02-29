<template>
    <div id="loader">
        <span class="icon">로딩 중...</span>
    </div>
</template>

<style scoped>
#loader{position: absolute;top:50%;width:100%;transform:translateY(-50%)}
#loader .icon{display:block;width:100px;height:100px;color:rgba(0,0,0,0);border:4px solid #000;border-radius:50%;background:#fff;margin:0 auto;box-sizing:border-box;animation:loader 2s linear infinite;transform:rotate(0)}
#loader .icon:before{position:absolute;top:-4px;left:50%;bottom:-4px;width:10px;background:#fff;margin-left:-5px;z-index:100;content:''}
@keyframes loader{
	100% {transform:rotate(360deg)}
}
</style>