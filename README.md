# YUI · 试用期工作述职

现有React 19 + Vite 8单页网站，包含四个述职章节、四个项目案例、轮播、图片放大、长图滚动与两帧人物动画。GitHub仓库计划为`yui-review`。

## 先审核再上传

**请先阅读PUBLICATION-REVIEW.md，确认客户项目、企业微信截图、肖像及内部述职内容可对互联网公开。上传GitHub本身也属于向外部服务提供资料。当前仅完成本地配置，没有上传或发布。**

## 本地运行与生产检查

建议Node.js 24 LTS（CI使用24）；运行：

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run check:pages
npm run preview -- --host 127.0.0.1 --port 4173
```

开发：`http://localhost:5173/yui-review/`（端口以终端为准）。
生产预览：`http://127.0.0.1:4173/yui-review/`。
手机实际设备若需局域网测试，可自行启动`npm run preview -- --host 0.0.0.0 --port 4173`并用同一Wi-Fi访问电脑局域网IP加`/yui-review/`；此操作会向局域网提供当前资料，本轮预览仅绑定本机。

## 部署配置

- vite.config.js：`base: '/yui-review/'`。
- src/assetUrl.js：所有JSX public图片、作品及缩略图使用Vite的BASE_URL。
- CSS的背景/字体及HTML图标由Vite转换为子目录路径。
- .github/workflows/deploy-pages.yml：main推送/手动运行→npm ci→lint→build→路径检查→上传dist→部署。使用官方actions、固定commit SHA，使用GitHub自动提供的GITHUB_TOKEN，不需填写个人API密钥。
- tools/prepare-pages.mjs：从源码引用确定静态资源白名单，仅剔除生成的dist中未引用的public副本。原始素材不删除。将来新增资源应直接使用源码字符串路径，以便扫描；动态拼接的新文件须扩展此扫描脚本。
- public/fonts/OFL-LXGWWenKai.txt：字体许可随站点保留。

网站通过React状态切换章节，没有React Router/History API路径路由，仅有`#home`等页面内锚点。因此访问`/yui-review/`或`/yui-review/#home`刷新可正常进入首页，无需404.html路由回退。刷新后已打开的弹窗状态重置为首页，这是现有行为。

## 审核通过后上传到GitHub

先在GitHub创建空仓库`yui-review`，不要初始化README、license或.gitignore。公开作品授权确认前不要上传资料或开启Pages。GitHub Free一般使用公开仓库发布Pages；私有仓库Pages取决于套餐，且私有仓库不代表站点私有。

当前目录不是Git仓库。以下命令仅供你在授权审核后执行，本轮没有执行：

```sh
cd /Users/ws-216-apple/Desktop/yui-website
git init -b main
git add .gitignore .oxlintrc.json .github README.md PUBLICATION-REVIEW.md package.json package-lock.json vite.config.js index.html src public tools/prepare-pages.mjs tools/check-pages.mjs
git status --short
git diff --cached --stat
git diff --cached --name-only
```

核对清单无node_modules、dist、.env、原PDF、来源记录和历史素材。确认后提交和推送（把YOUR_USERNAME换成你的GitHub用户名）：

```sh
git commit -m "Prepare Yui review for GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/yui-review.git
git push -u origin main
```

登录可通过GitHub Desktop或Git凭据管理器，勿将token写入代码或remote URL。

## 启用Pages

1. 仓库Settings→Pages→Build and deployment→Source选择**GitHub Actions**。
2. 仓库Actions中查看`Deploy Yui Review to GitHub Pages`；若初次推送在启用Pages前失败，在Actions选择Run workflow或重跑。
3. 等部署成功，Settings→Pages显示正式地址：`https://YOUR_USERNAME.github.io/yui-review/`。
4. 后续main推送会自动发布最新内容。仅提交源码和审核过的网站素材，不提交dist。上传源码文件到GitHub网页不能代替构建。

如果是组织仓库，URL中的用户名改为组织名。若仓库改名，同步修改base并重建。域名和正式部署结果须在实际远程发布后核对，本轮尚未得到正式网址。

官方说明：
- https://vite.dev/guide/static-deploy.html#github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 图片加载优化

页面预览使用public/images/optimized中的WebP副本，点击放大仍使用原始作品文件。修改原图后可用安装了Pillow的Python运行tools/optimize-images.py重新生成预览和src/optimizedImages.js映射，然后重新构建。两帧人物仍按一秒切换；非当前作品不提前下载高清原图。
