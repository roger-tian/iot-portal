<template>
   <div>
     <div class="border-card" v-for="(device,index) in deviceList">
        <div class="cleaner-name">
          <span>{{device.name}}</span>
          <el-switch class="margin-left"
             v-model="status.purifier[0].switch"
             v-on:change="onSwitchChange(index)"
             active-color="#409eff"
             active-value="1"
             inactive-value="0"
             inactive-color="#e7e7e7">
          </el-switch>
        </div>
        <div class="fun-card" v-for="fun in device.funList">
          <div class="fun-name">{{fun.name}}</div>
          <div style="padding: 8px;" class="m-device-opt">
            <el-checkbox-group v-if="fun.type==='mut'" v-model="fun.cmods" >
              <el-checkbox class="igrs-checkbox" v-for="mod in fun.mod" :label="mod.id" :key="mod.id" disabled>{{mod.name}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-else v-model="fun.cmods" >
              <el-radio class="igrs-radio" v-for="mod in fun.mod" :label="mod.id" :key="mod.id" disabled>{{mod.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
     </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'AirCleaner',
      data() {
        return {
          // 设备列表
          deviceList: [
            { name: '1#净化器',
              state: 0,
              funList: [
                {
                  name: '模式控制',
                  cmods: [],
                  type: 'mut',
                  mod: [
                    { name: '童锁', id: 0 },
                    { name: '睡眠', id: 1 },
                    { name: '自动', id: 2 },
                    { name: '负离子', id: 3 },
                    { name: 'UV', id: 4 },
                    { name: '定时', id: 5 }]
                },
                {
                  name: '风速控制',
                  cmods: -1,
                  type: 'single',
                  mod: [
                    { name: '高速', id: 0 },
                    { name: '中速', id: 1 },
                    { name: '低速', id: 2 }]
                }
              ]

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
          console.log(this.deviceList[index].state)
          this.$store.dispatch('PurifierSwitch', this.$store.getters.status.purifier[0].switch).then(ret => {
            console.log('111')
          })
        }
      }
    }
</script>

<style scoped>
  .border-card {
     border: 1px solid #f8f8f8;
  }
  .cleaner-name {
    border-bottom: 1px solid #f8f8f8;padding: 8px;
    display: flex;align-items: center;
  }
  .fun-card{
    background-color: #f8f8f8;border-radius: 5px;
  }
  .fun-card + .fun-card{
    margin-top: 10px;
  }
  .fun-name{
    border-left: 5px solid #409eff;padding: 6px 8px;
  }
</style>
