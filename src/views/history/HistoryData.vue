<template>
  <div class="padding">
    <div class="my-card-shadow flex-box">

      <div style="display: flex;justify-content: space-between;padding: 10px;">
        <el-radio-group size="small" v-model="selectZb" @change="onZbChange">
          <el-radio-button v-for="zb in zbList" :key="zb.id" :label="zb.id">
            <div v-html="zb.name"></div>
          </el-radio-button>
        </el-radio-group>

        <el-dropdown @command="onZbChange" trigger="click">
            <span class="el-dropdown-link">
              <span v-html="zbList[selectZb].name"></span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="zb.id" divided v-bind:key="zb.id" v-for="zb in zbList">
              <div v-html="zb.name"></div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


        <el-date-picker
          size="small"
          v-model="selectDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <e-charts :options="lineOpt" auto-resize style="width: 100%;"></e-charts>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import { getHistoryData } from '@/api/web'
  export default {
    name: 'HistoryData',
    components: { ECharts },
    data() {
      return {
        selectZb: '0',
        selectDate: '',
        zbList: [{ name: 'PM<sub>2.5</sub>', id: '0' },
          { name: 'C0<sub>2</sub>', id: '1' },
          { name: 'TVOC', id: '2' },
          { name: '温度', id: '3' },
          { name: '湿度', id: '4' },
          { name: '甲醛', id: '5' }],
        // 统计图配置
        lineOpt: {
          tooltip: {
            confine: true,
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#91c7ae',
                type: 'dashed'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            splitLine: {
              lineStyle: {
                color: ['#eee']
              }
            }
          },
          series: {
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#91c7ae'
              }
            },
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        }
      }
    },
    created() {
      this.fetchData(this.selectDate, this.selectZb)
    },
    methods: {
      fetchData(date, type) {
        console.log(date)
        // var str = date.toLocaleDateString().replace(/(\d+)[^\d](\d+)[^\d](\d+)[^\d]/, '$1-$2-$3')
        // console.log(str)
        var sType = ['pm25', 'co2', 'tvoc', 'temperature', 'humidity', 'formaldehyde']
        var decimal = [0, 0, 3, 1, 1, 3]
        getHistoryData(date, sType[type]).then(response => {
          console.log(response)
          var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          for (var i = 0; i < response.length; i++) {
            data[i] = parseFloat(response[i].value).toFixed(decimal[type])
          }
          console.log(this)
          this.lineOpt.series.data = data
        })
      },
      // 指标切换事件
      onZbChange: function(zb) {
        this.selectZb = zb
        this.fetchData(this.selectDate, this.selectZb)
      }
    }
  }
</script>

<style scoped>
  .flex-box{
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-dropdown{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: none;
    font-size: 13px;
    line-height: 30px;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
  }
  @media only screen and (max-width: 840px) {
    .el-radio-group{
      display: none;
    }
    .el-dropdown{
      display: inline-block;
    }

  }
</style>
