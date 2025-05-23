# 代码公证

::: warning 请确保您的下载来源可信！

为避免可能出现的中间人攻击，请确保仅通过[官方途径]下载应用程序，我无法对非官方途径获得的任何一个二进制位的安全性做出保证。

[官方途径]: /quickstart/install/#下载

:::

## 项目证明

软件完全使用 GitHub Actions 流水线构建，使用 GitHub 提供的项目证明功能来认证软件的构建来源，您可以在 [Attestations] 页面确认结果。

对于自动升级功能，项目中硬编码了一对签名密钥，这对密钥在上传至 GitHub Actions Secrets 后已被销毁，可以确保在不出现意外泄露的情况下仅有 GitHub Actions 有权对应用程序执行签名认证，哪怕是我也无法对它建立相同的签名。

[Attestations]: https://github.com/Candinya/nekops/attestations

## 针对平台的签名

对于 Windows 平台和 macOS 平台的证书签名，因为我不想为了一个项目让自己从此实名上网（似乎证书必须要实名），所以暂时没有引入任何商业渠道的证书签署。

在 Windows 平台上这并不是一个问题，您可能会遇到安装程序启动后需要一小段时间（应该是 Windows Defender 在扫描）才会弹出 UAC 确认，但安装完成后可以正常执行。

在 macOS 上您无法直接执行应用程序，请参照[快速开始中的提示]。或者如果您不信任下载到的可执行文件，您也可以自行[从源码构建]。

[快速开始中的提示]: /quickstart/install/#运行
[从源码构建]: /develop/build
