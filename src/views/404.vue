<template>
  <div class="p_layout_404">
    <div class="content-404">
      <img class="pic-404" :src="img_404" alt="404">
      <div>
        <p class="message-tip">这个页面您无权进入...</p>
        <p class="message-tip">请检查您输入的网址是否正确，请点击以下按钮返回主页</p>
        <a href="/" class="back-home-btn">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png'
import img_404_cloud from '@/assets/404_images/404_cloud.png'

export default {
  data() {
    return {
      img_404,
      img_404_cloud
    }
  },
  computed: {
    message() {
      return ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   .p_layout_404{
     background:#f0f2f5;width:100%;height: 100%;display: flex;
     align-items: center;justify-content: center;
   }
   .content-404{
     display: flex;align-items: flex-end;flex-direction: row;padding: 16px;
   }
  .pic-404{
     max-width: 50%;
  }

   .back-home-btn {
     display: block;
     height: 36px;
     max-width: 110px;
     margin-top: 10px;
     background: #1482f0;
     border-radius: 100px;
     padding: 0 8px;
     text-align: center;
     color: #ffffff;
     font-size: 14px;
     line-height: 36px;
     cursor: pointer;
   }
  .message-tip{
    color: #999999;font-size: 13px;
  }
  @media only screen and (max-width: 800px) {
    .content-404{
      flex-direction: column;align-items: center;
    }
  }
  @media only screen and (max-width: 500px){
    .pic-404{
      max-width: 80%;
    }
  }
</style>
