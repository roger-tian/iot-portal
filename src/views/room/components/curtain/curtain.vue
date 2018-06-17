<template>
    <div>
      <el-switch
        v-model="status.curtain[0].switch"
        v-on:change="onSwitchChange()"
        active-color="#409eff"
        active-text="开关"
        active-value="1"
        inactive-value="0"
        inactive-color="#e7e7e7">
      </el-switch>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'curtain',
  data() {
    return {
      switchState: '0'
    }
  },
  computed: {
    ...mapGetters([
      'status'
    ])
  },
  methods: {
    onSwitchChange: function() {
      console.log(this.switchState)
      this.$store.dispatch('CurtainSwitch', this.$store.getters.status.curtain[0].switch).then(ret => { console.log(124) })
    }
  }
}
</script>

<style scoped>

</style>
