# 开发

Nekops 提供了完整的开源代码，您可以从源码开始构建。

## 准备工作

### 开发环境

- Nekops 的主体基于 Tauri 框架，您需要安装 Tauri 框架运行需要的环境，请参考 [Tauri 的前置要求] 文档准备您的开发环境。
- Nekops 使用 pnpm 作为包管理工具，您需要[安装 pnpm] 来获取构架软件所需的依赖。虽然您也可以使用其他包管理工具，但请恕我无法对其他工具可能造成的意料之外的情况负责。
- Nekops 嵌入的二进制可执行程序使用 Go 开发，您需要 [下载安装 Go] 来构建它们。
- Nekops 的源码使用 git 进行管理，安装 git 可以为您提供一个较为舒适的开发环境。您也可以使用一些集成 git 功能的图形化界面客户端。特别地， Nekops 使用了<ruby>子模块<rp>(</rp><rt>submodules</rt><rp>)</rp></ruby>功能管理一些组件，您需要确认您的 git 客户端支持这个功能。

[Tauri 的前置要求]: https://tauri.app/zh-cn/start/prerequisites/
[安装 pnpm]: https://pnpm.io/zh/installation
[下载安装 Go]: https://go.dev/doc/install

### 获取源码

Nekops 的源码托管在 GitHub 上，仓库地址为 https://github.com/Candinya/nekops 。您可以使用 HTTPS 协议获取源码：

```sh
git clone --recurse-submodules https://github.com/Candinya/nekops.git
```

如果您想要创建您的分叉版本，您也可以先在 GitHub 上 fork 项目仓库，再使用您喜欢的协议获取源码。
