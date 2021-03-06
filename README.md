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
- 如果已有的组件库不能满足需求，可以在componant目录下**自定义组件**
  - 自定义组件时记得properties属性的type一定不可省略，会报property name of undefine
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

| 名称                         | 使用的组件                                                   | 备注                                                         |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 头像和基本信息***界面布局*** | i-card组件                                                   | 参考follow-home                                              |
| 列表                         | WeUI的navigator                                              | 参见my-home                                                  |
| 带头像的列表类布局           | i-cell-group, i-cell                                         | 参考org-list                                                 |
| 顶部切换栏                   | i-tabs和i-tab组件                                            | 参考my-org； 不同于原生微信接口 不能直接写在里面 要在外面用if渲染 [参考](https://github.com/TalkingData/iview-weapp/issues/179) |
| 输入框                       | i-panel，i-input，i-button                                   | 参考new-org                                                  |
| 可以换行的输入框（文本域）   | WeUI的textarea                                               | 参考https://github.com/Tencent/weui-wxss/blob/master/dist/example/form/form_textarea.wxml |
| 带发送按钮的输入框           |                                                              | 参见微信官方的[一行写法](![img](file:///C:\Users\Administrator\AppData\Roaming\Tencent\QQTempSys\%W@GJ$ACOF(TYDYECOKVDYB.png)https://github.com/Tencent/weui-wxss/blob/master/dist/example/input/input.wxml)； 如果文本比较长放不下，按钮可以换行 |
| 折叠面板                     | i-collapse和i-collapse-item                                  |                                                              |
| 图标                         | i-icon                                                       | 比较常见的图标可以在i-icon里面找                             |
| 下拉框                       | 微信自带的picker和微信官方wxss                               | 参考new-org                                                  |
| 按钮                         | 微信原生组件和官方wxss                                       | [参考](https://github.com/Tencent/weui-wxss/blob/master/dist/example/button/button.wxml) |
| 打分栏                       | vant-rate                                                    | 分为可输入和只显示两种；不用iview的原因是iview的rate组件不允许半星 |
| 搜索栏                       | vant-search                                                  | 参考mem-list                                                 |
| 带图片的弹出框               | ~~qnmd的vant，对齐又出问题了~~ 俺自己手搓了一个，在lib/daddy/dialog | 参考mem-list                                                 |
| 滑动栏                       | i-swipeout                                                   | 参考mem-list                                                 |
| 分割线                       | 自定义样式，见app.wxss；**请勿修改已有的样式**，可自行添加需要的样式 | 参考act-list                                                 |









~~致一个星期前(2021.04.14)的我：你真是个纯沙雕，美丽的iView和WeUI接口不用，去自己手搓丑到家的组件？~~

~~另外跪下向Vant道歉，原以为是您辣鸡，原来是我自己垃圾~~

qnmd的vant，dialog的对齐又出问题了...俺还是自己手搓吧（其实是网上抄的）

~~所以前端的经验就是：千万不要自己手搓组件；找一个组件库不够，就找三个~~



## 页面

| #    | 页面名       | 对应草图编号 | 对应文件路径            | 跳转自         | 跳转到                                                     | Beta版进度               |
| ---- | ------------ | ------------ | ----------------------- | -------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | 首页       | 1            | index/     | 底栏“首页”；2  | 某组织—9；某活动—10                          |  |
| 2   | 通知列表     |             | my/my-notif | 7             |                                     | TODO |
| 3    | 分区         | 3          | sections/sections-home  | 底栏“分区”     | 某版块—8；某组织—9                                         |                         |
| 4    | 关注         | 7            | follows/    | 底栏“关注”     | 某组织—9；某活动—10                                        |                        |
| 5    | 活动日程 | 8            | schedule/       |               | 某活动—10                                  |  |
| 6 | 活动参与者 |              | sections/act-detail/participants | 10 | 某用户—21 |  |
| 7    | 我的         | 10           | my/my-home              | 底栏“我的”     | ”我的组织“—11；”我的活动”—12；“活动发布”—13；“用户反馈”—17；“个人信息”—18；”通知列表“—2 |  |
| 8    | 组织列表   | 4            | sections/org-list   | 3              | 某组织—9；”组织创建“—14；搜索—19；                  |                    |
| 9    | 组织详情 | 4.12图1~4  | sections/act-list     | 1；3；4；8     | 某活动—10；信息编辑—16；成员管理—15；搜索—19；某管理员—21             |  |
| 10   | 活动详情     | 6            | sections/act-detail     | 1；4；9；12 | 新建/编辑活动—20；参与者—6；发布者—21 |  |
| 11   | 我管理的组织 | 11           | my/my-org               | 7              | “组织创建”—14；某组织—9                                   |  |
| 12 | 我发布的活动 | 14           | my/my-act               | 7              | 某活动—10                                                  |  |
| 13 | 活动发布/编辑 | 12           | my/new-act              | 7              |                                                            |  |
| 14   | 组织创建     | 13           | my/new-org              | 8；11          |                                                            |  |
| 15 | 组织成员管理 | 4.12图5 | sections/act-list/mem-list | 9 | 某管理员—21 |  |
| 16 | 组织信息编辑 | 4.12图6 | sections/org-edit | 9 |  |  |
| 17 | 用户反馈 |  | my/feedback | 7 |  |  |
| 18   | 个人信息     |              | my/my-account           | 7              |                                                            |  |
| 19 | 搜索结果 | | sections/search | 8；9 | |  |
| 20 | 新建/编辑评论 | | sections/act-detail/new-comment | 10 | |  |
| 21 | 用户信息 | | sections/user-info | 6；9；10；15 | |  |
|  |               |              |                                  |               |                                                              |            |



## Beta版 TODO-list

见`WorkRecord.md`



## 关于认证（验证邮箱+授权用户信息）

*  认证后才能进行的操作
  * 关注组织
  * 创建组织
  * 报名活动
  * 发布活动
  * 被添加为管理员
  * 查看follows-home、my-act、my-org
  * 组织管理和活动管理的一系列操作（没加判断，理论上不会出现未认证用户成为活动或组织管理员的情况）
  * 新建、编辑、删除评论

* 不认证也可以进行的操作
  * 查看推荐活动、组织
  * 提交反馈
  * 查看版块组织列表、活动列表、活动详情















