# 公开发布前资料审核（本地检查：2026-10-09）

本轮没有创建远程仓库、推送、上传或公开发布。是否属于保密资料、是否已公开及是否具备作品/参考素材的公开授权，需要由资料所有者确认；技术扫描不能代替授权审核。

## 发布产物和仓库里仍需确认的内容

| 风险文件 | 具体风险 |
| --- | --- |
| public/images/derma/cleanser.jpg、body-wash.jpg、facial-soap.jpg、spray.jpg | 客户真实电商设计作品；无法确认公开状态、客户/公司授权与素材使用范围。 |
| public/images/proline/point-*-left.jpg、point-*-right.jpg、右侧缩略图 | 我方创意过程稿、阶段设计稿与部分第三方参考；需要公开授权。 |
| public/images/proline/feedback-01.png、feedback-02.png | 未遮挡企业微信聊天截图，包含姓名、头像、公司标识及被提及参与者信息；当前页面按用户此前要求保留原样，公开前需相关许可。 |
| public/images/coreplus/strategy/01.png—05.png | 策略、科学符号、概念探索及第三方品牌Moodboard。标记“参考”不等于取得公开授权。 |
| public/images/coreplus/shampoo/01.png—04.png、lot/01.png | 未最终确认/阶段性方案，含第三方品牌材质参考，需公司/客户确认可公开范围。 |
| public/images/peony-cedar/full-epage.jpg、01-product.png、02-science.png、03-fragrance.png | 真实完整详情页及局部作品，需核对客户作品及产品/人物素材公开授权。 |
| public/images/yui-portrait-1.png、yui-portrait-2.png | 本人肖像及拼贴素材；公开后可下载，需确认公开使用意愿与拼贴素材权利。 |
| public/decor/work-archive-envelope.png | 用户提供的档案袋背景；需确认背景素材使用许可。 |
| src/WorkArchive.jsx、ReviewChapters.jsx、reviewData.js、各Case组件及data文件 | 试用期时间、岗位、项目组、项目状态、实际行动和规划属于内部述职内容；会进入网站JS，不能认为源代码隐藏即可保密。 |

## 保留本地但排除提交和网站产物的文件

- .openai/hosting.json：本地另一部署环境的项目标识；与GitHub Pages无关。
- tools/build-core-assets.py、tools/build-proline-assets.py：仅本机重建PDF素材使用，含本机目录或处理历史，不是网站运行依赖。
- public/**/asset-provenance.json、public/**/README.md：源文件名、裁切记录、来源说明等本地维护资料。
- public/images/core/**：旧版未使用的PDF裁切素材；未删除。
- public/images/proline/feedback-*-redacted.png：历史脱敏版本未在页面使用；未删除。
- public/images/hero-collage.png、src/assets/hero.png：旧版未使用人物素材；未删除。
- node_modules、dist、.DS_Store、环境变量文件、凭据文件、PDF/PSD/AI等源资料：通过.gitignore排除。此项目当前未发现.env文件，也未在项目文本文件中发现常见私钥/GitHub token/云access key/API key特征；不构成所有秘密均已排除的保证。

Git忽略规则仅影响尚未跟踪的文件。当前项目尚未初始化Git，首次上传按README的明确文件清单暂存；如以后曾提交了敏感文件，追加.gitignore并不能移除历史记录。

## 重要边界

- GitHub Pages公开站点的图像和JS均可由访问者下载；私有仓库不自动等于私有Pages网站。
- 不建议把仅限老板/公司内部观看的资料直接公开。先确认以上内容可对互联网发布，再上传或开启Pages。
- 当前代码没有加入假密码、前端“隐藏”或弱访问控制；保留现有真实内容和功能。
- main推送后工作流会自动发布；若需要每次人工批准，可在GitHub的github-pages环境配置Required reviewers（取决于账号/仓库支持情况）。本轮未配置远程环境。

参考：
https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
