<template>
  <div>
      <span @click="send">this is test</span>
  </div>
</template>

<script>
export default {
    name:'Test',
    methods:{
      send(){
        this.axios.get('/gg/c')
      }
    },
    mounted(){
      // window.location.href = '/api/gg/a'
    }
}
</script>

<style>
  span{
    display: inline-block;
    height: 40px;
    background-color: tomato;
  }
</style>