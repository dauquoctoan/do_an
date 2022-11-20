<template>
  <div>
    <el-button type='info' @click="$store.commit('increment')">{{ $store.getters.getCounter }}</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data: function(){
    return{
    }
  }
})

</script>
