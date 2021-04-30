# 小程序前端代码



## 使用指南

* 下载微信开发者工具
* 克隆本仓库
* 打开开发者工具，选择”导入项目“，选择克隆的目录
* 在开发者工具中可以进行代码编辑，保存后左侧模拟器可以在电脑上进行操作模拟，调试器console中显示调试信息（由`util.debug`输出）
* 点击”预览“可以生成二维码在手机上查看，半小时内有效



## 统一样式

### 指南

- 前端设计主要从i-view, WeUI(微信官方组件), vant中选择组件

- i开头代表iview组件库里面的组件； vant开头代表vant组件库里面的组件。
- WeUI的wxss文件已经放入app.wxss中，直接通过类名选择器使用。

### 各组件库参考链接

| 组件库 | 参考文档                                                     | 代码                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| i-view | http://inmap.talkingdata.com/wx/index_prod.html#/components/button | https://github.com/TalkingData/iview-weapp/tree/master/examples/pages |
| WeUI   | https://weui.io/                                             | https://github.com/Tencent/weui-wxss/tree/master/dist/example |
| vant   | https://youzan.github.io/vant-weapp/#/calendar               | https://github.com/youzan/vant-weapp/tree/dev/example/pages  |

### 小程序体验码

iview

![img](README.assets/code.jpg)

WeUI

![https://weui.io](README.assets/178efd46-2725-11e6-8952-09d7836e968d.png)

vant

![img](README.assets/68747470733a2f2f696d672e797a63646e2e636e2f76616e742d77656170702f7172636f64652d3230313830383130313131342e6a7067)



### 样式规定

| 名称                         | 使用的组件                        | 备注                                                         |
| ---------------------------- | --------------------------------- | ------------------------------------------------------------ |
| 头像和基本信息***界面布局*** | i-card组件                        | 参考follow-home                                              |
| 不带头像的基本界面布局       | i-panel, i-cell-group, i-cell组件 |                                                              |
| 列表类布局                   | i-cell-group, i-cell              | 参考org-list                                                 |
| 顶部切换栏                   | i-tabs和i-tab组件                 | 参考my-org； 不同于原生微信接口 不能直接写在里面 要在外面用if渲染 [参考](https://github.com/TalkingData/iview-weapp/issues/179) |
| 输入框                       | i-panel，i-input，i-button        | 参考new-org                                                  |
| 可以换行的输入框（文本域）   | WeUI的textarea                    | 参考https://github.com/Tencent/weui-wxss/blob/master/dist/example/form/form_textarea.wxml |
| 带发送按钮的输入框           |                                   | 参见微信官方的[一行写法](![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\QQTempSys\%W@GJ$ACOF(TYDYECOKVDYB.png)https://github.com/Tencent/weui-wxss/blob/master/dist/example/input/input.wxml)； 如果文本比较长放不下，按钮可以换行 |
| 折叠面板                     | i-collapse和i-collapse-item       |                                                              |
| 图标                         | i-icon                            | 比较常见的图标可以在i-icon里面找                             |
| 下拉框                       | 微信自带的picker和微信官方wxss    | 参考new-org                                                  |
| 按钮                         | 微信原生组件和官方wxss            | [参考](https://github.com/Tencent/weui-wxss/blob/master/dist/example/button/button.wxml) |
| 打分栏                       | vant-rate                         | 分为可输入和只显示两种；不用iview的原因是iview的rate组件不允许半星 |
|                              |                                   |                                                              |
|                              |                                   |                                                              |







~~致一个星期前(2021.04.14)的我：你真是个纯沙雕，美丽的iView和WeUI接口不用，去自己手搓丑到家的组件？~~

~~另外跪下向Vant道歉，原以为是您辣鸡，原来是我自己垃圾~~

~~所以前端的经验就是：千万不要自己手搓组件；找一个组件库不够，就找三个~~



## 页面

| #    | 页面名       | 对应草图编号 | 对应文件路径            | 跳转自         | 跳转到                                                     | alpha版完成度                      |
| ---- | ------------ | ------------ | ----------------------- | -------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | 推荐         | 1            | index/recommend         | 底栏“首页”；2  | 顶栏“地图”—2；某组织—9；某活动—10                          | 100% |
| 2    | 地图         | 2            | index/index-map         | 1              | 顶栏“推荐”—1；某活动—10                                    | — |
| 3    | 分区         | 3          | sections/sections-home  | 底栏“分区”     | 某版块—8；某组织—9                                         | 100%                        |
| 4    | 关注         | 7            | follows/follows-home    | 底栏“关注”     | 某组织—9；某活动—10                                        | 100%                       |
| 5    | 活动日程 | 8            | schedule/sch-list       |               | 某活动—10                                  | 50%(日历) |
| 6 | 活动参与者 |              | sections/act-detail/participants | 10 |                                                              |                                            |
| 7    | 我的         | 10           | my/my-home              | 底栏“我的”     | ”我的组织“—11；”我的活动”—12；“活动发布”—13；“用户反馈”—17；“我的账户”—18 | 100% |
| 8    | 组织列表   | 4            | sections/org-list   | 3              | 某组织—9；”组织创建“—14；搜索—19                           | 100%                   |
| 9    | 组织详情 | 4.12图1~4  | sections/act-list     | 1；3；4；8     | 某活动—10；信息编辑—16；成员管理—15；搜索—19                     | 100% |
| 10   | 活动详情     | 6            | sections/act-detail     | 1；2；4；9；12 | 新建/编辑活动—20；参与者—6 | 100% |
| 11   | 我管理的组织 | 11           | my/my-org               | 7              | “组织创建”—14；某组织—9                                   | 100% |
| 12 | 我管理的活动 | 14           | my/my-act               | 7              | 某活动—10                                                  | 100% |
| 13 | 活动发布     | 12           | my/new-act              | 7              |                                                            | 100% |
| 14   | 组织创建     | 13           | my/new-org              | 8；11          |                                                            | 100% |
| 15 | 组织成员管理 | 4.12图5 | my/act-list/mem-list | 9 |  |  |
| 16 | 组织信息编辑 | 4.12图6 | sections/org-edit | 9 |  | 100% |
| 17 | 用户反馈 |  | my/feedback | 7 |  | 100% |
| 18   | 我的账户     |              | my/my-account           | 7              |                                                            | 100% |
| 19 | 搜索结果 | | my/org-list/search | 8；9 | | — |
| 20 | 新建评论 | | sections/act-detail/new-comment | 10 | | 100% |

* 新增一个页面page，你需要：
  * 创建一个目录page
  * 在page目录下创建名为page的页面（即wxml, wxss, js, json四个文件）
  * 在app.json的pages中注册页面
  * 在本表格中添加新表项
* “跳转自”不包含从下级页面返回到上级页面（事实上这个返回按钮由`navigateTo`自动产生）



## Alpha版 TODO-list

- [ ] 成员管理页
  - [ ] 显示管理员
  - [ ] 搜索用户id、显示对应用户信息后添加管理员
  - [ ] 转让负责人
  - [ ] 删除管理员

- [ ] 日程表页
  - [ ] 显示日历
  - [ ] 点击每一天后显示出对应的活动列表（参考去年uniactive的用户使用手册）
- [x] 推荐页
  - [x] 活动列表js
- [x] 关注页
  - [x] 活动列表js
  - [x] 组织列表js
- [x] 活动详情页
  - [x] 显示平均评分
  - [x] 跳转至报名用户列表
- [ ] 新页面：已报名用户
  - [ ] 查看报名用户
  - [ ] （活动管理员）移除报名用户
- [x] 新建/编辑评论页
  - [x] 显示原评论内容
- [ ] 炮制真实数据





## Beta版 TODO-list

见`WorkRecord.md`







