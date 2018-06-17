<template>
  <div>
    <div class="device-card" v-for="(device,index) in deviceList">
      <div class="device-card-header">
        <span>{{device.name}}</span>
        <el-switch class="margin-left"
           v-model="status.machine[index].switch"
           v-on:change="onSwitchChange(index)"
           active-color="#409eff"
           active-value="1"
           inactive-value="0"
           inactive-color="#e7e7e7">
        </el-switch>
      </div>
      <div class="my-slider-box" v-if="device.pv!==undefined">
        <el-slider
          class="igrs-slider"
          disabled
          v-model="status.machine[index].volume"
          :min=0
          :max=100
          input-size="mini">
        </el-slider>
        <el-input-number
          class="igrs-number-input"
          v-model="status.machine[index].volume"
          @change="handleChangeNum(index)"
          size="small"
          :min="0" :max="100">
        </el-input-number>
      </div>
      <div style="padding: 8px;" class="large-screen-mod-selector">
        <el-radio-group v-model="status.machine[index].sigSource" class="m-device-opt" @change="onModChange(device,index)">
          <el-radio-button class="igrs-radio-btn" size="small" :label="rad.id" :key="index2" v-for="(rad,index2) in device.mod">{{rad.name}}</el-radio-button>
        </el-radio-group>
      </div>
      <div style="padding:8px;" class="small-screen-mod-selector">
        <el-select v-model="status.machine[index].sigSource" size="small" @change="onModChange(device,index)">
          <el-option
            v-for="(rad,index2) in device.mod"
            :key="index2"
            :label="rad.name"
            :value="rad.id">
             <span>{{rad.name}}</span>
          </el-option>
        </el-select>
      </div>
    </div>

  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'InteractionScreen',
      data() {
        return {
          // 设备列表
          deviceList: [
            { name: '前交互大屏',
              state: 0,
              cmod: { name: '主页', id: 0 },
              pv: 0,
              mod: [
                { name: '主页', id: 0 },
                { name: 'HDMI1', id: 1 },
                { name: 'HDMI2', id: 2 },
                { name: '内置电脑', id: 3 }]
            },
            { name: '后交互大屏',
              state: 0,
              cmod: { name: '主页', id: 0 },
              pv: 0,
              mod: [
                { name: '主页', id: 0 },
                { name: 'HDMI1', id: 1 },
                { name: 'HDMI2', id: 2 },
                { name: '内置电脑', id: 3 }]
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
          var onOff = this.$store.getters.status.machine[index].switch
          this.$store.dispatch('MachineSwitch', { index: index, onOff: onOff }).then(ret => {
            console.log('111')
          })
        },
        handleChangeNum: function(index) {
          console.log(index)
          var volume
          if (this.$store.getters.status.machine[index].volume > this.deviceList[index].pv) {
            volume = '1'
          } else {
            volume = '0'
          }
          this.deviceList[index].pv = this.$store.getters.status.machine[index].volume
          this.$store.dispatch('MachineVolume', { index: index, volume: volume }).then(ret => {
            console.log('111')
          })
        },
        /**
         * 模式选择
         * @param device 交互大屏设备
         * @param index  0--前交互大屏  1--后交互大屏
         */
        onModChange: function(device, index) {
          var sigSource = this.$store.getters.status.machine[index].sigSource
          this.$store.dispatch('MachineSig', { index: index, sigSource: sigSource }).then(ret => {
            console.log('111')
          })
        }
      }
    }
</script>

<style scoped>
   .large-screen-mod-selector{
     display: block;
   }
    .small-screen-mod-selector{
      display: none;
    }
    @media only screen and (max-width: 800px ){
      .large-screen-mod-selector{
        display: none;
      }
      .small-screen-mod-selector{
        display: block;
      }
    }
</style>

