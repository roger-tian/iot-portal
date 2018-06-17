import store from '@/store'

// const { body } = document
// const WIDTH = 1024
// const RATIO = 3

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    // const isMobile = this.isMobile()
    // if (isMobile) {
    //   store.dispatch('ToggleDevice', 'mobile')
    //   store.dispatch('CloseSideBar', { withoutAnimation: true })
    // }
    this.resizeHandler()
  },
  methods: {
    isMobile() {
      // const rect = body.getBoundingClientRect()
      // return rect.width - RATIO < WIDTH
      return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        if (isMobile) {
          // 判断手机横竖屏状态
          if ('onorientationchange' in window) {
            if (window.orientation === 180 || window.orientation === 0) {
              // alert('竖屏状态！')
              store.dispatch('ToggleDevice', 'mobile')
            }
            if (window.orientation === 90 || window.orientation === -90) {
              // alert('横屏状态！');
              store.dispatch('ToggleDevice', 'desktop')
            }
          }
          store.dispatch('CloseSideBar', { withoutAnimation: true })
        } else {
          store.dispatch('ToggleDevice', 'desktop')
        }
        // store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
        //
        // if (isMobile) {
        //   store.dispatch('CloseSideBar', { withoutAnimation: true })
        // }
      }
    }
  }
}
