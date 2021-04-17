# 小程序前端代码



## 使用指南

* 下载微信开发者工具
* 克隆本仓库
* 打开开发者工具，选择”导入项目“，选择克隆的目录
* 在开发者工具中可以进行代码编辑，保存后左侧模拟器可以在电脑上进行操作模拟，调试器console中显示调试信息（由`util.debug`输出）
* 点击”预览“可以生成二维码在手机上查看，半小时内有效



## 页面

| #    | 页面名       | 对应草图编号 | 对应文件路径            | 备注                       | 跳转自         | 跳转到                                                     | 当前完成度 (剩余工作内容)                           |
| ---- | ------------ | ------------ | ----------------------- | -------------------------- | -------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | 推荐         | 1            | index/recommend         |                            | 底栏“首页”；2  | 顶栏“地图”—2；某组织—9；某活动—10                          |                           |
| 2    | 地图         | 2            | index/index-map         |                            | 1              | 顶栏“推荐”—1；某活动—10                                    |                                     |
| 3    | 分区         | 3&4          | sections/sections-home  | 合并了3和4的顶栏           | 底栏“分区”     | 某版块—8；某组织—9                                         | 90%(组织列表)                            |
| 4    | 关注         | 7            | follows/follows-home    | 合并了7的两个顶栏          | 底栏“关注”     | 某组织—9；某活动—10                                        | 50%(js)                                 |
| 5    | 活动日程 | 8            | schedule/sch-list       | 活动列表和日历两个顶栏 |               | 某活动—10                                  |                                            |
|      |              |              |                        |                                            |                |                                                              |                                            |
| 7    | 我的         | 10           | my/my-home              |                            | 底栏“我的”     | ”我的组织“—11；”我的活动”—12；“活动发布”—13；“用户反馈”—17；“我的账户”—18 | 95%(统一UI) |
| 8    | 组织列表   | 4            | sections/org-list   | 显示所有组织               | 3              | 某组织—9；”组织创建“—14；搜索—19                           | 90%(搜索函数)                     |
| 9    | 组织详情 | 4.12图1~4  | sections/act-list     | 见草图，使用折叠组件，条件渲染显示编辑按钮 | 1；3；4；8     | 某活动—10；信息编辑—16(/14)；成员管理—15；搜索—19                     | 80%(活放列表) |
| 10   | 活动详情     | 6            | sections/act-detail     | 显示所有评论；管理员可修改 | 1；2；4；9；12 |                                                            |                                                            |
| 11   | 我管理的组织 | 11           | my/my-org               |                            | 7              | “组织创建”—14；某组织—9                                   |                                    |
| 12   | 我管理的活动 | 14           | my/my-act               | 将活动修改移至活动详情页   | 7              | 某活动—10                                                  |                                                   |
| 13   | 活动发布     | 12           | my/new-act              |                            | 7              |                                                            |                                                            |
| 14   | 组织创建     | 13           | my/new-org              |                            | 8；11          |                                                            | 100% |
| 15 | 组织成员管理 | 4.12图5 | my/act-list/mem-list | 只有负责人能打开 | 9 |  |  |
| 16 | 组织信息编辑 | 4.12图6 | sections/org-detail | 可以和14使用同一页？ | 9 |  | 80%(头像) |
| 17 | 用户反馈 |  | my/feedback | | 7 |  |  |
| 18   | 我的账户     |              | my/my-account           | 邮箱认证、修改昵称签名等   | 7              |                                                            | 80%(信息编辑) |
| 19 | 搜索结果 | | my/org-list/search |  | 8；9 | |  |

* 新增一个页面page，你需要：
  * 创建一个目录page
  * 在page目录下创建名为page的页面（即wxml, wxss, js, json四个文件）
  * 在app.json的pages中注册页面
  * 在本表格中添加新表项
* “跳转自”不包含从下级页面返回到上级页面（事实上这个返回按钮由`navigateTo`自动产生）


