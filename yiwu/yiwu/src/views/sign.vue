<template>
    <div>
        <m-header></m-header>
        <sign-in></sign-in>
    </div>
</template>
<script>
import signIn from "../components/signin.vue"
import mHeader from "../components/header.vue"
export default {
    components:{signIn,mHeader}
}
</script>