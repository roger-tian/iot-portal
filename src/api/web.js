import request from '@/utils/request'

const WelcomeMethod = {
  WelcomeSwitch: '/control/welcomemode'
}
export function welcomeSwitch(onOff) {
  return request.post(WelcomeMethod.WelcomeSwitch, { onOff: onOff })
}

const AllMethod = {
  AllSwitch: '/control/all'
}
export function allSwitch(onOff) {
  return request.post(AllMethod.AllSwitch, { onOff: onOff })
}

const MachineMethod = {
  MachineSwitch: '/control/machine',
  MachineVolume: '/control/machineVol',
  MachineSig: '/control/machineSig'
}
export function machineSwitch(index, onOff) {
  return request.post(MachineMethod.MachineSwitch, { index: index, onOff: onOff })
}
export function machineVolume(index, volume) {
  return request.post(MachineMethod.MachineVolume, { index: index, volume: volume })
}
export function machineSig(index, sigSource) {
  return request.post(MachineMethod.MachineSig, { index: index, sigSource: sigSource })
}

const LedMethod = {
  LedSwitch: '/control/led'
}
export function ledSwitch(index, onOff) {
  return request.post(LedMethod.LedSwitch, { index: index, onOff: onOff })
}

const CurtainMethod = {
  CurtainSwitch: '/control/curtain'
}
export function curtainSwitch(onOff) {
  return request.post(CurtainMethod.CurtainSwitch, { onOff: onOff })
}

const PurifierMethod = {
  PurifierSwitch: '/control/purifier/control'
}
export function purifierSwitch(onOff) {
  return request.post(PurifierMethod.PurifierSwitch, { deviceId: '#lemx500s#78b3b912418f', lock: 0, power: onOff, duration: 30 })
}

const StatusMethod = {
  DeviceStatus: '/control/status'
}
export function deviceStatus() {
  return request.post(StatusMethod.DeviceStatus, { })
}

const SensorMethod = {
  SensorData: '/control/sensor'
}
export function sensorData(onOff) {
  return request.post(SensorMethod.SensorData, { })
}
