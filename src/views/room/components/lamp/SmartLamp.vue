<template>
  <div>
    <div class="device-card" v-for="(device,index) in deviceList">
      <div class="device-card-header">
        <span>{{device.name}}</span>
        <el-switch class="margin-left"
           v-model="status.led[index].switch"
           v-on:change="onSwitchChange(index)"
           active-color="#409eff"
           active-value='1'
           inactive-value='0'
           inactive-color="#e7e7e7">
        </el-switch>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SmartLamp',
    data() {
      return { // 设备列表
        deviceList: [
          {
            name: '第一路灯',
            state: 0,
            pv: 32
          },
          {
            name: '第二路灯',
            state: 0,
            pv: 10
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'status'
      ])
    },
    methods: {
      onSwitchChange: function(index) {
        console.log(this.deviceList[index])
        console.log(`${this.deviceList[index].state === '1' ? '关闭' : '打开'}第${(index + 1)}路智能灯`)
        var onOff = this.$store.getters.status.led[index].switch
        this.$store.dispatch('LedSwitch', { index: index, onOff: onOff }).then(ret => {
          console.log('111')
        })
      }
    }
  }
</script>

<style scoped>

</style>
