<template>
  <div class="title">{{ words }}</div>
</template>
<script>
import { getCookie } from '@/utils/cookies'
export default {
  data () {
    return {
      words: '欢迎来到笔记整理界面'
    }
  }
}
</script>
<style scoped lang="less">
	.title {
		font-size: 20px;
		font-weight: bold;
	}
</style>