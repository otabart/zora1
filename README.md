# Zora空投领取 - Farcaster Frame

这是一个使用Farcaster Frame让Warpcast用户能够从内置钱包中领取Zora空投的解决方案。

## 解决方案原理

Warpcast内置钱包无法连接到外部网站，但可以通过Farcaster Frames在Warpcast内部与智能合约进行交互。这个解决方案:

1. 创建了一个Farcaster Frame页面，可以在Warpcast内访问
2. 使用Frame的TX(交易)按钮功能，允许用户直接从Warpcast内部钱包发起交易
3. 通过API服务器处理交易请求并返回适当的交易数据

## 使用方法

### 用户使用说明

1. 在Warpcast中，找到包含此Frame的帖子(cast)
2. 点击"Claim Zora Airdrop"按钮
3. 确认交易详情
4. 交易成功后可以查看交易哈希

### 开发者部署说明

1. 将代码部署到Vercel或类似服务:
   ```
   git clone 你的仓库URL
   cd zora-claim-api
   npm install
   vercel
   ```

2. 更新`index.html`中的target URL，指向你部署的API:
   ```html
   <meta property="fc:frame:button:1:target" content="https://你的域名/api/get-tx" />
   ```

3. 将`index.html`作为静态页面部署

## 技术细节

- `index.html`: Farcaster Frame定义
- `api.js`: Express服务器处理交易请求
- API端点:
  - `POST /api/get-tx`: 生成交易数据
  - `POST /api/callback`: 处理交易完成回调
  - `GET /api/get-tx`: 简单检查端点

## 注意事项

- 此解决方案专门为地址`0x6d711689E273a7C1962772381d8968bf37802Db8`设计
- 交互的合约是`0x0000000002ba96C69b95E32CAAB8fc38bAB8B3F8`(Zora空投合约)
- 使用的调用数据是`0x1e83409a0000000000000000000000006d711689E273a7C1962772381d8968bf37802Db8` 