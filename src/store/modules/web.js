import { allSwitch, welcomeSwitch, machineSwitch, machineVolume, machineSig, ledSwitch, curtainSwitch, purifierSwitch, deviceStatus, sensorData } from '@/api/web'

const web = {
  state: {
    welcomeSwitch: '0',
    allSwitch: '0',
    machine: [{ switch: '0', sigSource: '0', volume: 0 }, { switch: '0', sigSource: '0', volume: 0 }],
    led: [{ switch: '0' }, { switch: '0' }],
    curtain: [{ switch: '0' }],
    purifier: [{ switch: '0', lock: '0', sleep: '0', mode: '0', anion: '0', uv: '0', timer: '0', windSpeed: '0' }]
  },
  mutations: {
    SET_WELCOME: (state, onOff) => {
      state.welcomeSwitch = onOff
    },
    SET_ALLSWITCH: (state, onOff) => {
      state.allSwitch = onOff
    },
    SET_MACHINESWITCH: (state, param) => {
      state.machine[param.index].switch = param.onOff
    },
    SET_MACHINESIG: (state, param) => {
      state.machine[param.index].sigSource = param.sigSource
    },
    SET_MACHINEVOLUME: (state, param) => {
      state.machine[param.index].volume = param.volume
    },
    SET_LEDSWITCH: (state, param) => {
      state.led[param.index].switch = param.onOff
    },
    SET_CURTAINSWITCH: (state, onOff) => {
      state.curtain[0].switch = onOff
    },
    SET_PURIFIERSWITCH: (state, onOff) => {
      state.purifier[0].switch = onOff
    },
    SET_PURIFIERLOCK: (state, lock) => {
      state.purifier[0].lock = lock
    },
    SET_PURIFIERSLEEP: (state, sleep) => {
      state.purifier[0].sleep = sleep
    },
    SET_PURIFIERMODE: (state, mode) => {
      state.purifier[0].mode = mode
    },
    SET_PURIFIERANION: (state, anion) => {
      state.purifier[0].anion = anion
    },
    SET_PURIFIERUV: (state, uv) => {
      state.purifier[0].uv = uv
    },
    SET_PURIFIERTIMER: (state, t) => {
      state.purifier[0].timer = t
    },
    SET_PURIFIERWINDSPEED: (state, windSpeed) => {
      state.purifier[0].windSpeed = windSpeed
    }
  },
  actions: {
    WelcomeSwitch({ commit }, onOff) {
      welcomeSwitch(onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('welcomeSwitch')
        }
      })
    },
    AllSwitch({ commit }, onOff) {
      allSwitch(onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('allSwitch')
        }
      })
    },
    MachineSwitch({ commit }, param) {
      machineSwitch(param.index, param.onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('machineSwitch')
          // commit('SET_MACHINESWITCH', param)
        }
      })
    },
    MachineVolume({ commit }, param) {
      machineVolume(param.index, param.volume).then(response => {
        if (response === 'SUCCESS') {
          console.log('machineVolume')
        }
      })
    },
    MachineSig({ commit }, param) {
      machineSig(param.index, param.sigSource).then(response => {
        if (response === 'SUCCESS') {
          console.log('machineVolume')
        }
      })
    },
    LedSwitch({ commit }, param) {
      ledSwitch(param.index, param.onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('machineSwitch')
        }
      })
    },
    CurtainSwitch({ commit }, onOff) {
      curtainSwitch(onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('allSwitch')
        }
      })
    },
    PurifierSwitch({ commit }, onOff) {
      purifierSwitch(onOff).then(response => {
        if (response === 'SUCCESS') {
          console.log('allSwitch')
        }
      })
    },
    DeviceStatus({ commit }) {
      deviceStatus().then(response => {
        if (response === 'SUCCESS') {
          console.log('deviceStatus')
        }
      })
    },
    SensorData({ commit }) {
      sensorData().then(response => {
        if (response === 'SUCCESS') {
          console.log('deviceStatus')
        }
      })
    }
  }
}

export default web
