// lib/daddy/dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },  // 图文弹框是否显示
    title: {
      type: String,
      value: '',
    },   // 标题
    desc: {
      type: String,
      value: '',
    },  // 内容
    src: {
      type: String,
      value: '',
    },         // 图片地址
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm: function(){
      this.triggerEvent('confirmTap')
    },
    cancel: function() {
      this.triggerEvent('cancelTap')
    },

  }
})
