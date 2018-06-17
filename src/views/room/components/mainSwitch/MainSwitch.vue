<template>
  <div>
      <el-switch
        v-model="status.allSwitch"
        v-on:change="totalSwitchChange()"
        active-color="#409eff"
        active-text="总开关"
        active-value="1"
        inactive-value="0"
        inactive-color="#e7e7e7">
      </el-switch>
    <div>
      <div class="device-card" v-for="(device,index) in deviceList">
         <div class="device-card-header">
           <span>{{device.name}}</span>
           <el-switch class="margin-left"
             v-model="device.state"
             v-on:change="onSwitchChange(index)"
             active-color="#13ce66"
             active-value="1"
             inactive-value="0"
             inactive-color="#e7e7e7">
           </el-switch>
         </div>
        <div class="my-slider-box" v-if="device.pv!==undefined">
          <el-slider
            v-model="device.pv"
            :min=-50
            :max=10
            input-size="mini"
            show-input>
          </el-slider>
        </div>
        <div style="padding: 8px;">
          <el-radio-group v-model="device.cmod" class="m-device-opt">
            <el-radio :label="rad.id" :key="index2" v-for="(rad,index2) in device.mod">{{rad.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'MainSwitch',
      data() {
        return {
          // 开关状态
          switchState: '0',
          // 设备列表
          deviceList: [
            { name: '智能空调',
              state: 0,
              cmod: -1,
              mod: [
                { name: '制冷', id: 0 },
                { name: '制热', id: 1 },
                { name: '除湿', id: 2 },
                { name: '自动', id: 3 },
                { name: '送风', id: 4 }]
            },
            { name: '智能热水器',
              state: 0,
              cmod: -1,
              mod: [
                { name: '中温', id: 0 },
                { name: '增容', id: 1 },
                { name: '即时加热', id: 2 },
                { name: '夜电', id: 3 }]
            },
            { name: '智能冰箱',
              state: 0,
              cmod: -1,
              pv: -10,
              mod: [
                { name: '人工智能', id: 0 },
                { name: '速冻', id: 1 },
                { name: '速冷', id: 2 }]
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
        totalSwitchChange: function() {
          console.log(this.$store)
          this.$store.dispatch('AllSwitch', this.$store.getters.status.allSwitch).then(ret => {
            console.log('111')
          })
        },
        onSwitchChange: function(index) {
          console.log(index)
        }
      },
      created() {
        // console.log('总开关', this.$store)
      },
      mounted() {
        // console.log('总开关 页面挂载', this.$store)
      }
    }
</script>

<style scoped>

</style>
