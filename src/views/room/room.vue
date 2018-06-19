<template>
  <div style="padding: 16px;">
    <div class="my-card-shadow yb-switch">
      <el-switch
        v-model="ybModel"
        v-on:change="ybSwitchChange()"
        active-color="#409eff"
        active-text="迎宾模式"
        active-value="1"
        inactive-value="0"
        inactive-color="#e7e7e7">
      </el-switch>
    </div>
    <div class="parent-box">
      <div class="tab-content my-card-shadow">
        <el-tabs class="my-tab" v-model="currentTabIndex" @tab-click="changeTab">
          <el-tab-pane
            v-for="(item,index) in tabArr"
            :key="item.name"
            :name="item.name">
            <span slot="label" class="tab-txt">{{item.label}}</span>
            <component v-bind:is="getTabContent"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="box-chart my-card-shadow">
        <div class="chart">
          <e-charts :options="gaugeOpt" auto-resize style="width: 100%;"></e-charts>
          <div class="zb-row">
            <div class="zb-col">
              <div class="zb-name">CO<sub>2</sub></div>
              <div class="zb-unit">（ppm）</div>
              <div class="zb-value">{{co2}}</div>
            </div>
            <div class="zb-col">
              <div class="zb-name">TVOC</div>
              <div class="zb-unit">（μg/m<sup>3</sup>）</div>
              <div class="zb-value">{{tvoc}}</div>
            </div>
            <div class="zb-col">
              <div class="zb-name">温度</div>
              <div class="zb-unit">（℃）</div>
              <div class="zb-value">{{temp}}</div>
            </div>
            <div class="zb-col">
            <div class="zb-name">湿度</div>
            <div class="zb-unit">（%RH）</div>
            <div class="zb-value">{{hum}}</div>
          </div>
            <div class="zb-col">
              <div class="zb-name">甲醛</div>
              <div class="zb-unit">（ppm）</div>
              <div class="zb-value">{{hcho}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainSwitch from './components/mainSwitch/MainSwitch'
import InteractionScreen from './components/interactionScreen/InteractionScreen'
import SmartLamp from './components/lamp/SmartLamp'
import curtain from './components/curtain/curtain'
import AirCleaner from './components/airCleaner/AirCleaner'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/tooltip'
import { deviceStatus, sensorData } from '@/api/web'
export default {
  components: {
    MainSwitch,
    InteractionScreen,
    SmartLamp,
    curtain,
    AirCleaner,
    ECharts
  },
  data() {
    return {
      currentTabIndex: '0',
      ybModel: '0', // 迎宾模式开关
      co2: 0,
      tvoc: 0,
      temp: 0,
      hum: 0,
      hcho: 0,
      tabArr: [ // tab数组
        { label: '总开关', name: '0', component: 'MainSwitch' },
        { label: '交互大屏', name: '1', component: 'InteractionScreen' },
        { label: '智能灯', name: '2', component: 'SmartLamp' },
        { label: '窗帘', name: '3', component: 'curtain' },
        { label: '净化器', name: '4', component: 'AirCleaner' }],
      // 仪表盘配置
      gaugeOpt: {
        tooltip: {
          show: false,
          formatter: '{a} <br/>PM<sub>2.5</sub> : {c}',
          confine: true
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '2018-05-31 15:00',
            type: 'gauge',
            min: 0,
            max: 500,
            axisLine: {
              lineStyle: {
                color: [
                  [0.07, '#00c140'],
                  [0.15, '#e1b701'],
                  [0.23, '#ff7e00'],
                  [0.3, '#ff0000'],
                  [0.5, '#99004c'],
                  [1, '#6e0023']
                ]
              }
            },
            detail: {
              formatter: function(value) {
                return value + '\n{a|μg/m}{b|3}'
              },
              rich: {
                a: {
                  fontSize: 12
                },
                b: {
                  fontSize: 6,
                  padding: [8, 0, 0, 0]
                }
              }
            },
            data: [{ value: 13, name: '{a|PM}{b|2.5}' }],
            title: {
              offsetCenter: [0, '-30%'],
              rich: {
                a: {
                  fontSize: 16,
                  color: '#444',
                  lineHeight: 16
                },
                b: {
                  fontSize: 8,
                  color: '#444',
                  lineHeight: 16,
                  padding: [0, 0, 8, 0]
                }
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 页面切换事件
     * @param tab
     * @param event
     */
    changeTab: function(tab, event) {
      console.log(this.currentTabIndex)
    },
    /**
     * 迎宾模式 开关事件
     */
    ybSwitchChange: function() {
      console.log(this.ybModel)
      this.$store.dispatch('WelcomeSwitch', this.ybModel).then(ret => {
        console.log('111')
      })
    },
    fetchData() {
      deviceStatus().then(response => {
        console.log(response)
        var param
        var allSwitch, machine0Switch, machine1Switch, led0Switch, led1Switch, curtainSwitch
        var mode = [0, 0, 0, 0, 0, 0] // lc, sl, mo, io, uv, ti
        for (var i = 0; i < response.length; i++) {
          switch (response[i].deviceId) {
            case 'welcomemode':
              this.ybModel = response[i].value
              break
            case 'machine0':
              switch (response[i].attribute) {
                case 'switch':
                  machine0Switch = response[i].value
                  param = { index: 0, onOff: machine0Switch }
                  this.$store.commit('SET_MACHINESWITCH', param)
                  break
                case 'sig_source':
                  param = { index: 0, sigSource: response[i].value }
                  this.$store.commit('SET_MACHINESIG', param)
                  break
                case 'volume':
                  param = { index: 0, volume: parseInt(response[i].value) }
                  this.$store.commit('SET_MACHINEVOLUME', param)
                  break
              }
              break
            case 'machine1':
              switch (response[i].attribute) {
                case 'switch':
                  machine1Switch = response[i].value
                  param = { index: 1, onOff: response[i].value }
                  this.$store.commit('SET_MACHINESWITCH', param)
                  break
                case 'sig_source':
                  param = { index: 1, sigSource: response[i].value }
                  this.$store.commit('SET_MACHINESIG', param)
                  break
                case 'volume':
                  param = { index: 1, volume: parseInt(response[i].value) }
                  this.$store.commit('SET_MACHINEVOLUME', param)
                  break
              }
              break
            case 'led0':
              led0Switch = response[i].value
              param = { index: 0, onOff: response[i].value }
              this.$store.commit('SET_LEDSWITCH', param)
              break
            case 'led1':
              led1Switch = response[i].value
              param = { index: 1, onOff: response[i].value }
              this.$store.commit('SET_LEDSWITCH', param)
              break
            case 'curtain':
              curtainSwitch = response[i].value
              this.$store.commit('SET_CURTAINSWITCH', response[i].value)
              break
            case 'purifier':
              switch (response[i].attribute) {
                case 'switch':
                  console.log(response[i].value)
                  this.$store.commit('SET_PURIFIERSWITCH', response[i].value)
                  break
                case 'lock':
                  mode[0] = (response[i].value === '1') ? 1 : 0
                  break
                case 'sleep':
                  mode[1] = (response[i].value === '1') ? 2 : 0
                  break
                case 'mode':
                  mode[2] = (response[i].value === '1') ? 3 : 0
                  break
                case 'anion':
                  mode[3] = (response[i].value === '1') ? 4 : 0
                  break
                case 'uv':
                  mode[4] = (response[i].value === '1') ? 5 : 0
                  break
                case 'timer':
                  mode[5] = (response[i].value === '1') ? 6 : 0
                  break
                case 'windspeed':
                  this.$store.commit('SET_PURIFIERWINDSPEED', parseInt(response[i].value))
                  break
              }
              break
          }
        }
        this.$store.commit('SET_PURIFIERMODE', mode)
        if (machine0Switch + machine1Switch + led0Switch + led1Switch + curtainSwitch === '00000') {
          console.log(machine0Switch, machine1Switch, led0Switch, led1Switch, curtainSwitch)
          allSwitch = '0'
        } else {
          allSwitch = '1'
        }
        this.$store.commit('SET_ALLSWITCH', allSwitch)
      })

      sensorData().then(response => {
        console.log(response)
        console.log(this.gaugeOpt.series[0].data[0].value)
        var result = response.split(',')
        var pm25 = parseFloat(result[0]).toFixed(0)
        var co2 = parseFloat(result[1]).toFixed(0)
        var tvoc = parseFloat(result[2]).toFixed(3)
        var temp = parseFloat(result[3]).toFixed(1)
        var hum = parseFloat(result[4]).toFixed(1)
        var hcho = parseFloat(result[5]).toFixed(3)
        this.gaugeOpt.series[0].data[0].value = pm25
        this.co2 = co2
        this.tvoc = tvoc
        this.temp = temp
        this.hum = hum
        this.hcho = hcho
      })
    },
    webSocket() {
      // websocket
      var websocket = null
      if ('WebSocket' in window) {
        websocket = new WebSocket('ws://192.168.1.150:8080/igrsiot/websocket')
        // websocket = new WebSocket('ws://localhost:8080/igrsiot/websocket')
      } else {
        console.log('browser not support websocket')
      }
      websocket.onerror = function() {
      }
      websocket.onopen = function() {
      }
      websocket.onmessage = (event) => {
        console.log(event.data)
        var data = event.data
        var result
        var results
        var i
        if (data.search('pw::') !== -1) { // purifier data from server
          var purifierSwitch, windSpeed
          var mode = [0, 0, 0, 0, 0, 0] // lc, sl, mo, io, uv, ti
          results = data.split(',')
          for (i = 0; i < results.length; i++) {
            result = results[i].split('::')
            switch (result[0]) {
              case 'pw':
                purifierSwitch = (result[1] === '10') ? '1' : '0'
                this.$store.commit('SET_PURIFIERSWITCH', purifierSwitch)
                break
              case 'lc':
                mode[0] = (result[1] === '10') ? 1 : 0
                break
              case 'sl':
                mode[1] = (result[1] === '10') ? 2 : 0
                break
              case 'mo':
                mode[2] = (result[1] === '10') ? 3 : 0
                break
              case 'io':
                mode[3] = (result[1] === '10') ? 4 : 0
                break
              case 'uv':
                mode[4] = (result[1] === '10') ? 5 : 0
                break
              case 'ti':
                mode[5] = (result[1] !== '000') ? 6 : 0
                break
              case 'fa':
                windSpeed = parseInt(result[1][0])
                this.$store.commit('SET_PURIFIERWINDSPEED', windSpeed)
                break
            }
          }
          this.$store.commit('SET_PURIFIERMODE', mode)
        } else if (data.search('pm25') !== -1) { // sensor data from server
          results = data.split(',')
          for (i = 0; i < results.length; i++) {
            result = results[i].split(':')
            switch (result[0]) {
              case 'pm25':
                var pm25 = result[1].toFixed(0)
                this.gaugeOpt.series[0].data[0].value = pm25
                break
              case 'co2':
                var co2 = result[1].toFixed(0)
                this.co2 = co2
                break
              case 'tvoc':
                var tvoc = result[1].toFixed(3)
                this.tvoc = tvoc
                break
              case 'temperature':
                var temp = result[1].toFixed(1)
                this.temp = temp
                break
              case 'humidity':
                var hum = result[1].toFixed(1)
                this.hum = hum
                break
              case 'formaldehyde':
                var hcho = result[1].toFixed(3)
                this.hcho = hcho
                break
            }
          }
        } else { // sync message from socket controller
          var allSwitch
          var machine0Switch = this.$store.getters.status.machine[0].switch
          var machine1Switch = this.$store.getters.status.machine[1].switch
          var led0Switch = this.$store.getters.status.led[0].switch
          var led1Switch = this.$store.getters.status.led[1].switch
          var curtainSwitch = this.$store.getters.status.curtain[0].switch

          var str = data.split(':')
          var param
          switch (str[0]) {
            case 'welcomeModeSwitch':
              this.ybModel = str[1]
              break
            case 'allSwitch':
              allSwitch = str[1]
              this.$store.commit('SET_ALLSWITCH', allSwitch)
              param = { index: 0, onOff: str[1] }
              this.$store.commit('SET_MACHINESWITCH', param)
              param = { index: 1, onOff: str[1] }
              this.$store.commit('SET_MACHINESWITCH', param)
              param = { index: 0, onOff: str[1] }
              this.$store.commit('SET_LEDSWITCH', param)
              param = { index: 1, onOff: str[1] }
              this.$store.commit('SET_LEDSWITCH', param)
              this.$store.commit('SET_CURTAINSWITCH', str[1])
              param = { index: 0, onOff: str[1] }
              break
            case 'machine0Switch':
              machine0Switch = str[1]
              param = { index: 0, onOff: machine0Switch }
              this.$store.commit('SET_MACHINESWITCH', param)
              if (machine0Switch === '1') {
                allSwitch = '1'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              } else if (machine1Switch + led0Switch + led1Switch + curtainSwitch === '0000') {
                allSwitch = '0'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              }
              break
            case 'machine0Sig':
              param = { index: 0, sigSource: str[1] }
              this.$store.commit('SET_MACHINESIG', param)
              break
            case 'machine0Volume':
              param = { index: 0, volume: parseInt(str[1]) }
              this.$store.commit('SET_MACHINEVOLUME', param)
              break
            case 'machine1Switch':
              machine1Switch = str[1]
              param = { index: 1, onOff: machine1Switch }
              this.$store.commit('SET_MACHINESWITCH', param)
              if (machine1Switch === '1') {
                allSwitch = '1'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              } else if (machine0Switch + led0Switch + led1Switch + curtainSwitch === '0000') {
                allSwitch = '0'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              }
              break
            case 'machine1Sig':
              param = { index: 1, sigSource: str[1] }
              this.$store.commit('SET_MACHINESIG', param)
              break
            case 'machine1Volume':
              param = { index: 1, volume: parseInt(str[1]) }
              this.$store.commit('SET_MACHINEVOLUME', param)
              break
            case 'led0Switch':
              led0Switch = str[1]
              param = { index: 0, onOff: led0Switch }
              this.$store.commit('SET_LEDSWITCH', param)
              if (led0Switch === '1') {
                allSwitch = '1'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              } else if (machine0Switch + machine1Switch + led1Switch + curtainSwitch === '0000') {
                allSwitch = '0'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              }
              break
            case 'led1Switch':
              led1Switch = str[1]
              param = { index: 1, onOff: led1Switch }
              this.$store.commit('SET_LEDSWITCH', param)
              if (led1Switch === '1') {
                allSwitch = '1'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              } else if (machine0Switch + machine1Switch + led0Switch + curtainSwitch === '0000') {
                allSwitch = '0'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              }
              break
            case 'curtainSwitch':
              curtainSwitch = str[1]
              this.$store.commit('SET_CURTAINSWITCH', curtainSwitch)
              if (curtainSwitch === '1') {
                allSwitch = '1'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              } else if (machine0Switch + machine1Switch + led0Switch + led0Switch === '0000') {
                allSwitch = '0'
                this.$store.commit('SET_ALLSWITCH', allSwitch)
              }
              break
            case 'purifierSwitch':
              param = { index: 0, onOff: str[1] }
              this.$store.commit('SET_PURIFIERSWITCH', param)
              break
          }
        }
      }
      websocket.onclose = function() {
      }
      window.onbeforeunload = function() {
        webSocketClose()
      }
      function webSocketClose() {
        websocket.close()
      }
      // function webSocketsendMessage(message) {
      //  websocket.send(message)
      // }
    }
  },
  computed: {
    getTabContent: function() {
      return this.tabArr[this.currentTabIndex].component
    }
  },
  created() {
    this.fetchData()
    this.webSocket()
  }
}
</script>

<style scoped>
  .parent-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
  }
  .yb-switch{
    padding:10px;
  }
  .tab-txt {
    /*font-size: 12px;*/
  }

  .tab-content {
    flex: 5 1 0;
    padding: 0 10px 10px;
    margin-top: 16px;
  }

  .box-chart {
    flex: 3 1 0;
    margin-top: 16px;
    margin-left: 10px;
  }
  @media only screen and (max-width: 960px) {
    .parent-box {
      flex-direction: column;
    }
    .box-chart{
      margin-left: 0;
    }
  }
  .zb-row{
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .zb-col{
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f8f8f8;
    padding: 6px;
  }
  .zb-col + .zb-col{
    border-left: 1px solid #f8f8f8;
  }
  .zb-name{
    font-size: 14px;
  }
  .zb-unit{
    font-size: 12px;
  }
  .zb-value{
    font-size: 14px;
  }
</style>
