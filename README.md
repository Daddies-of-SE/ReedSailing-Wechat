# 小程序前端代码



## 页面

| #    | 页面名       | 对应草图编号 | 对应文件路径            | 备注                        | 跳转关系 |
| ---- | ------------ | ------------ | ----------------------- | --------------------------- | -------- |
| 1    | 推荐         | 1            | index/recommend         |                             |          |
| 2    | 地图         | 2            | index/index-map         |                             |          |
| 3    | 分区         | 3&4          | sections/sections-home  | 合并了3和4的顶栏            |          |
| 4    | 关注         | 7            | follows/follows-home    | 合并了7的两个顶栏           |          |
| 5    | 活动列表     | 8            | schedule/sch-list       |                             |          |
| 6    | 活动日历     | 9            | schedule/calendar       | 调整日历为活动tag的默认顶栏 |          |
| 7    | 我的         | 10           | my/my-home              |                             |          |
| 8    | 组织详情     | 5            | sections/org-detail     |                             |          |
| 9    | 活动详情     | 6            | sections/act-detail     |                             |          |
| 10   | 我管理的组织 | 11           | my/my-org               |                             |          |
| 11   | 我管理的活动 | 14           | my/my-act               |                             |          |
| 12   | 活动发布     | 12           | my/new-act              |                             |          |
| 13   | 组织创建     | 13           | my/new-org              |                             |          |
| 14   | 组织活动管理 | 15           | my/org-admin/org-act    |                             |          |
| 15   | 组织成员管理 | 16           | my/org-damin/org-people | 即管理员管理                |          |
| 16   | 组织信息管理 | 17           | my/org-damin/org-info   |                             |          |

* 新增一个页面page，你需要：
  * 创建一个目录page
  * 在page目录下创建名为page的页面（即wxml, wxss, js, json四个文件）
  * 在app.json的pages中注册页面
  * 在本表格中添加新表项

