import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh",
  title: "Nekops",
  description: "Ops' now nyaing",
  lastUpdated: true,
  cleanUrls: true,
  head: [["meta", { name: "theme-color", content: "#62b6e7" }]],
  themeConfig: {
    logo: "/assets/logo.png",

    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "链接",
        items: [
          {
            text: "项目仓库",
            link: "https://github.com/Candinya/nekops",
          },
          {
            text: "项目组织",
            link: "https://github.com/nekops-app",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "快速开始",
        link: "/quickstart/",
        items: [
          { text: "获取 Nekops", link: "/quickstart/install/" },
          {
            text: "初见体验",
            items: [
              { text: "第一印象", link: "/quickstart/first-impression/" },
              { text: "你好，服务器", link: "/quickstart/hello-server/" },
              { text: "一切皆在掌控中", link: "/quickstart/everything-under-control/" },
            ],
          },
          {
            text: "进阶研习",
            items: [
              { text: "一呼百应的力量", link: "/quickstart/power-of-multirun/" },
              { text: "拯救大服务器", link: "/quickstart/rescue-server/" },
              { text: "透视数据的维度", link: "/quickstart/analysis-of-servers/" },
              { text: "定制我的客户端", link: "/quickstart/customize-my-client/" },
            ],
          },
          { text: "更新", link: "/quickstart/update/" },
          { text: "报告问题", link: "/quickstart/report-issues" },
          { text: "加入社区", link: "/quickstart/join-the-community" },
        ],
      },
      {
        text: "视窗分离",
        link: "/window/",
        collapsed: true,
        items: [
          { text: "主视窗", link: "/window/main/" },
          { text: "命令行", link: "/window/shell/" },
          { text: "救援", link: "/window/rescue/" },
        ],
      },
      {
        text: "页面",
        link: "/page/",
        collapsed: true,
        items: [
          {
            text: "连接",
            items: [
              { text: "SSH", link: "/page/connect/ssh/" },
              { text: "群控", link: "/page/connect/multirun/" },
              { text: "救援", link: "/page/connect/rescue/" },
            ],
          },
          {
            text: "库",
            items: [
              { text: "服务器", link: "/page/library/servers/" },
              { text: "代码片段", link: "/page/library/snippets/" },
            ],
          },
          { text: "分析", link: "/page/analysis/" },
          { text: "设置", link: "/page/settings/" },
        ],
      },
      {
        text: "开发",
        link: "/develop/",
        items: [
          { text: "从源码构建", link: "/develop/build" },
          { text: "已知问题", link: "/develop/issues" },
        ],
      },
      {
        text: "附录",
        items: [
          { text: "概念", link: "/concept" },
          { text: "代码公证", link: "/notarize" },
          { text: "开源许可", link: "/license" },
          { text: "更新日志", link: "/changelog" },
          { text: "国际化", link: "/i18n" },
        ],
      },
    ],

    editLink: {
      pattern: "https://github.com/nekops-app/docs/edit/main/:path",
      text: "在 GitHub 上编辑此页",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Candinya/nekops",
      },
    ],

    footer: {
      copyright: `© 2023-${new Date().getFullYear()} Nya Candy 版权所有`,
    },

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除查询条件",
            backButtonTitle: "返回",
            noResultsText: "抱歉，暂时没有相关结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: "deep",
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },

  markdown: {
    config: (md) => {
      md.use(footnote);
    },
  },

  sitemap: {
    hostname: "https://docs.nekops.app",
  },
});
