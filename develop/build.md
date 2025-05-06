# 从源码构建

## 构建嵌入的依赖项

我准备了一个 Makefile 命令来简化您的操作。如果您的开发环境支持运行 Makefile ，您可以使用这样的命令来构建嵌入的依赖项：

```sh
make embedded
```

如果您的开发环境不支持 Makefile ，您需要手动执行其中的命令。

## 安装依赖

依赖项可能会随着开发进程被不定期地更新。如果您在更新后遇到了之前不曾遇到的构建或运行时问题，您可以尝试再次安装依赖。

您可以使用这样的命令来安装依赖：

```sh
pnpm i
```

特别地，如果您只想安装锁定文件中的版本并避免更新 `pnpm-lock.yaml` 文件，您可以指定 `--frozen-lockfile` 选项。这个选项在您遇到意料之外的问题，或是要确保结果稳定（例如在构建流水线中）时可能会有所帮助。

## 运行开发环境

您可以通过这样的命令来运行开发环境：

```sh
pnpm tauri dev
```

这个命令会自动开启前端开发环境，并构建一个开发环境下的 tauri 的客户端。等待进度条执行完成后，调试环境的窗口即会自动弹出。

::: details 进程报错退出，无法启动？

您可以尝试使用这样的命令来收集 Tauri 的环境信息：

```sh
pnpm tauri info
```

您应当会获得类似如下的结果：

```sh
[✔] Environment
    - OS: Windows 10.0.26100 x86_64 (X64)
    ✔ WebView2: 135.0.3179.98
    ✔ MSVC:
        - Visual Studio Community 2022
        - Visual Studio 生成工具 2019
    ✔ rustc: 1.85.0 (4d91de4e4 2025-02-17)
    ✔ cargo: 1.85.0 (d73d2caf9 2024-12-31)
    ✔ rustup: 1.28.1 (f9edccde0 2025-03-05)
    ✔ Rust toolchain: stable-x86_64-pc-windows-msvc (default)
    - node: 22.11.0
    - pnpm: 10.10.0
    - npm: 10.9.0

[-] Packages
    - tauri 🦀: 2.5.1
    - tauri-build 🦀: 2.2.0
    - wry 🦀: 0.51.2
    - tao 🦀: 0.33.0
    - @tauri-apps/api : 2.5.0
    - @tauri-apps/cli : 2.5.0

[-] Plugins
    - tauri-plugin-clipboard-manager 🦀: 2.2.2
    - @tauri-apps/plugin-clipboard-manager : 2.2.2
    - tauri-plugin-updater 🦀: 2.7.1
    - @tauri-apps/plugin-updater : 2.7.1
    - tauri-plugin-shell 🦀: 2.2.1
    - @tauri-apps/plugin-shell : 2.2.1
    - tauri-plugin-fs 🦀: 2.2.1
    - @tauri-apps/plugin-fs : 2.2.1
    - tauri-plugin-process 🦀: 2.2.1
    - @tauri-apps/plugin-process : 2.2.1
    - tauri-plugin-dialog 🦀: 2.2.1
    - @tauri-apps/plugin-dialog : 2.2.1

[-] App
    - build-type: bundle
    - CSP: default-src 'self'; style-src 'unsafe-inline' 'self'; img-src 'self' data: asset: http://asset.localhost; connect-src ipc: http://ipc.localhost
    - frontendDist: ../dist
    - devUrl: http://localhost:1420/
    - framework: React
    - bundler: Vite
```

如果其中有任何问题，您可以尝试搜寻对应的解决方案。

:::

## 构建发布版本

您可以通过这样的命令来构建发布版本：

```sh
pnpm tauri build
```

或者使用提供的 Makefile 规则：

```sh
make release
```

Tauri 会先调用 vite 构建前端，再调用 rust 构建后端。但由于缺失签名密钥，您在文件构建完成后无法对其执行签名，会得到形如这样的输出：

```sh
    Finished `release` profile [optimized] target(s) in 1m 58s                                                                                                                                                                                                                           
       Built application at: F:\Candinya\nekops\src-tauri\target\release\nekops.exe
        Info Target: x64
     Running candle for "main.wxs"
     Running light to produce F:\Candinya\nekops\src-tauri\target\release\bundle\msi\Nekops_0.10.0_x64_en-US.msi
        Info Target: x64
     Running makensis to produce F:\Candinya\nekops\src-tauri\target\release\bundle\nsis\Nekops_0.10.0_x64-setup.exe
    Finished 2 bundles at:
        F:\Candinya\nekops\src-tauri\target\release\bundle\msi\Nekops_0.10.0_x64_en-US.msi
        F:\Candinya\nekops\src-tauri\target\release\bundle\nsis\Nekops_0.10.0_x64-setup.exe

A public key has been found, but no private key. Make sure to set `TAURI_SIGNING_PRIVATE_KEY` environment variable.
       Error A public key has been found, but no private key. Make sure to set `TAURI_SIGNING_PRIVATE_KEY` environment variable.
 ELIFECYCLE  Command failed with exit code 1.
make: *** [Makefile:17: release] Error 1
```

请不用担心，这是正常的情况。您可以在项目的 src-tauri/target/release/bundle 目录下找到构建得到的结果。
