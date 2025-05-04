import { defineConfig } from "vitepress";

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
          { text: "获取 Nekops", link: "/quickstart/acquire" },
          { text: "我的第一个服务器", link: "/quickstart/my-first-server" },
        ],
      },
      {
        text: "视窗分离",
        link: "/window/",
        items: [
          { text: "主视窗", link: "/window/main" },
          { text: "命令行", link: "/window/shell" },
          { text: "救援", link: "/window/rescue" },
        ],
      },
      {
        text: "页面",
        link: "/page/",
        items: [
          {
            text: "连接",
            items: [
              { text: "SSH", link: "/page/connect/ssh" },
              { text: "群控", link: "/page/connect/multirun" },
              { text: "救援", link: "/page/connect/rescue" },
            ],
          },
          {
            text: "库",
            items: [
              { text: "服务器", link: "/pages/library/servers" },
              { text: "代码片段", link: "/pages/library/snippets" },
            ],
          },
          { text: "分析", link: "/pages/analysis" },
          { text: "设置", link: "/pages/settings" },
        ],
      },
      {
        text: "开发",
        link: "/develop/",
        items: [
          { text: "准备工作", link: "/develop/prepare" },
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

  sitemap: {
    hostname: "https://docs.nekops.app",
  },
});
