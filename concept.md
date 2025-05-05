# 概念

## 数据层级

### 工作区 <Badge type="info" text="Workspace" />

工作区是 Nekops 中最高的数据层级。

一个工作区代表当前工作的完整环境，包括以下内容：

1. 工作区专有的配置
   1. 工作区的标识符
   2. 工作区的名字
   3. 工作区的数据目录
   4. 工作区专用的 SSH 私钥
2. 加密配置
3. 服务器数据
4. 代码片段数据
5. 已知的服务器公钥（仅当使用集成 SSH 客户端时）

其中，工作区专有的配置仅存储在设备上，不会参与同步。其他数据则会存储进入工作区的数据目录，方便您使用同步工具进行管理。

### 服务器 <Badge type="info" text="Server" />

服务器是 Nekops 操作发生的基础对象。

一个服务器包含以下内容：

1. 基础信息
2. 产品详情
3. 硬件设施
4. 网络结构
5. 外部访问

对于我自己的需求来说，我希望它能尽可能包含更多的详细信息，以方便在需要的时候整理和分析。这也就是为什么它有如此多的输入内容，即便有些看起来并没有直接用处。但如果您不需要这么多内容，您可以仅输入您需要的部分——至少输入一个唯一标识符，其他都是可选的。

1. **基础信息** 是应用向的元数据，主要作用是区分不同的服务器以及方便管理，并不涉及到服务器本身的属性。
2. **产品详情** 是和服务器的产品相关的一些信息，包含提供商信息、流量限制、地理位置，是服务器本身的抽象属性。
3. **硬件设施** 是服务器的硬件参数，因为我使用到最频繁的是 CPU 内存 硬盘 这三个参数，所以这里也就着重于记录这些。如果有其他的参数，例如 GPU 等附加组件，我会将它们写到基础信息里的备注中去。
4. **网络结构** 是服务器具体的网络参数，以公网和私网作为划分。公网指的是可以公开访问到的 IP 地址，而私网——顾名思义，就是不能公开访问的那些。私网未必要局限于提供商配置的私有网段，如果您像我一样有配置自有的私有网络，那么您当然也可以将这个网络信息加入到此处。
5. **外部访问** 是用于访问服务器的协议接口。由于这个项目设计的目的是为了管理基于 Linux 的服务器（我用的一般都是 Debian 系统），所以在通常访问处只设置了 SSH 参数的位置，而不支持其他的协议例如 RDP 之类。在紧急访问处设置的则是一些当通常访问失效时用于救援使用的参数，用于在意外发生（例如引导丢失或系统故障）时执行救援工作使用。

### 代码片段 <Badge type="info" text="Snippet" />

代码片段是一种简短的代码块，用于存储一些可能会多次反复使用的命令（支持多行），本身不具有复杂的概念。

## 文件结构

### 全局设置

全局设置为每台设备（更确切地说，是每个操作系统用户）独有的设置，其保存在您的用户 `文档/Nekops/settings.json` 文件中。这个文件为 JSON 格式，使用了美化输出，应当是人类可读的样式。

这个文件中包含了您的通用设置、自定义设置，并包含了所有的工作区专有的配置，以及当前活动的工作区。一般情况下您并不需要调整这个文件，但如果当某些版本出现大改动需要您手动介入处理时，请参考相关版本的更新日志。

::: details 一个全局设置文件的样例 (v0.10.0)

```json
{
  "workspaces": [
    {
      "id": "debug",
      "name": "Debug Only",
      "data_dir": "F:\\Candinya\\nekops\\nekops_data\\debug",
      "ssh_private_key": ""
    },
    {
      "id": "debug2",
      "name": "Debug 2",
      "data_dir": "F:\\Candinya\\nekops\\nekops_data\\debug",
      "ssh_private_key": "C:\\Users\\Candinya\\.ssh\\id_ed25519"
    },
    {
      "id": "nyawork",
      "name": "Nyawork",
      "data_dir": "D:\\Nyawork\\nekops",
      "ssh_private_key": ""
    }
  ],
  "current_workspace_id": "nyawork",
  "default_ssh_action": "start",
  "default_ssh_client": "embedded",
  "check_update_at_startup": false,
  "customize": {
    "font_family": {
      "common": "",
      "monospace": "",
      "headings": ""
    },
    "shell": {
      "background_color": "#000000E6",
      "background_image": "",
      "foreground_color": "#ffffff",
      "font_family": "'Fira Code'",
      "font_size": 16
    }
  }
}
```

:::

### 工作区的数据目录

对于每一个工作区，您应当为其指定一个便于备份或同步的数据目录。这个数据目录可能包含以下文件：

```
│   known_hosts      已知的服务器公钥（仅当使用集成 SSH 客户端时）
│   public.key       加密使用的公钥（仅当加密开启时）
│   servers.json     服务器数据索引（有序）
│   snippets.json    代码片段数据（有序）
│
└───servers
        [id...].json 服务器的配置内容
```

其中， `[id]` 指的是服务器的标识符。

服务器拆分数据索引和具体文件是为了方便同步管理——新增就是新增一条索引和对应文件，删除就是删除一条索引和对应文件。这样分开放置，比起全部合并到同一个 JSON 文件来说，可以获得更佳的性能，以及对基于文本的版本管理工具（例如 git ）更为友好。

而对于代码片段，因为通常代码片段都不会太长（也请尽可能避免使用代码片段功能存储过长的内容），所以将其全部合并到同一个 JSON 文件中能避免产生不必要的文件碎片。

::: details 一个服务器配置内容的样例 (v0.10.0)

```json
{
  "id": "example",
  "name": "样例服务器",
  "comment": "只是一个样例，实际上并不能用。",
  "tags": [
    "example"
  ],
  "color": "#62b6e7",
  "provider": {
    "name": "Nyawork",
    "type": "DS",
    "product": "Example",
    "price": 89.64,
    "paid_annually": true,
    "start_since": ""
  },
  "traffic": {
    "limit": 1,
    "double_rate": true,
    "bandwidth": 2500
  },
  "location": {
    "region": "CN",
    "datacenter": "家里蹲",
    "host_system": "1#16-17",
    "latitude": 1.14,
    "longitude": 5.14
  },
  "hardware": {
    "cpu": {
      "count": 2,
      "manufacturer": "Nyawork",
      "model": "通用处理器",
      "core_count": 4,
      "thread_count": 8,
      "base_frequency": 3.2
    },
    "memory": {
      "generation": 4,
      "ecc": true,
      "size": 64,
      "frequency": 2400
    },
    "disk": [
      {
        "count": 1,
        "type": "SSD",
        "interface": "NVMe",
        "size": 256,
        "size_unit": "GB",
        "model": "通用硬盘"
      },
      {
        "count": 1,
        "type": "HDD",
        "interface": "SATA",
        "size": 4,
        "size_unit": "TB",
        "model": "通用硬盘"
      }
    ]
  },
  "network": {
    "public": [
      {
        "address": "127.0.0.1",
        "cidr_prefix": 32,
        "family": "IPv4",
        "comment": "",
        "alias": "1.public"
      },
      {
        "address": "127.0.0.1",
        "cidr_prefix": 32,
        "family": "IPv4",
        "comment": "",
        "alias": "2.public"
      }
    ],
    "private": [
      {
        "address": "127.0.0.1",
        "cidr_prefix": 32,
        "family": "IPv4",
        "comment": "",
        "alias": "1.private"
      }
    ]
  },
  "access": {
    "regular": {
      "address": "1.private",
      "port": 22,
      "user": "Candinya",
      "is_jump_server": false
    },
    "emergency": {
      "root_password": "",
      "method": "VNC",
      "address": "",
      "username": "",
      "password": "",
      "comment": ""
    }
  }
}
```

:::

## 加密

### 加密内容

在目前 (v0.10.0) 的实现中，以下内容会被加密：

- access.emergency.root_password
- access.emergency.address
- access.emergency.username
- access.emergency.password

这些内容都属于服务器配置中紧急访问的一部分，加密的目的是保护这些敏感数据，避免它们被意外泄露。

而其他的内容，例如服务器的 IP 等，不属于被保护的部分。因此，如果您不希望暴露您的服务器详细信息，请避免与其他人分享您的服务器配置内容。

### 加密算法

为了方便在新增服务器时直接生成配置、只有在需要用到紧急访问功能时才要求用户输入密码解锁，项目使用的是非对称加密的方式：即使用密码生成一对公私钥，加密数据时使用公钥，只有在解密数据时才会使用到私钥。

加密使用的算法库为 [tweetnacl.js] ，使用其实现的 `x25519-xsalsa20-poly1305` 算法执行非对称加密。

用户密钥对使用 [Web Crypto API] 基于 `PBKDF2` 算法派生，使用 `SHA-512` 作为内容摘要算法，迭代次数为 `210000` （参考 [OWASP 的推荐]）。

加密相关的基础操作文件放置在 [src/encrypt] 目录中，相关的文件作用如下：

| 文件          | 作用                                 |
| ------------- | ------------------------------------ |
| config.ts     | 加密相关的配置，包含内建的密钥对和盐 |
| helper.ts     | 一些辅助函数                         |
| keyHandler.ts | 调用 Web Crypto API 的具体实现函数   |
| methods.ts    | 封装后的加解密函数                   |

具体服务器加解密相关的状态管理文件为 [src/slices/encryptionSlice.ts] 。

[tweetnacl.js]: https://tweetnacl.js.org/
[Web Crypto API]: https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API
[OWASP 的推荐]: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2
[src/encrypt]: https://github.com/Candinya/nekops/tree/main/src/encrypt
[src/slices/encryptionSlice.ts]: https://github.com/Candinya/nekops/blob/main/src/slices/encryptionSlice.ts
