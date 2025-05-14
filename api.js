// API处理Farcaster框架的交易请求
// 这个文件需要上传到Vercel或类似的服务部署

// 导入必要的模块
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 配置常量
const PORT = process.env.PORT || 3000;
const WALLET_ADDRESS = '0x6d711689E273a7C1962772381d8968bf37802Db8';
const CONTRACT_ADDRESS = '0x0000000002ba96C69b95E32CAAB8fc38bAB8B3F8';
const CALL_DATA = '0x1e83409a0000000000000000000000006d711689E273a7C1962772381d8968bf37802Db8';

// 获取交易数据的端点
app.post('/api/get-tx', async (req, res) => {
  try {
    // 从请求中获取用户的地址
    const { untrustedData } = req.body;
    const userAddress = untrustedData?.address;
    
    console.log('User requesting transaction with address:', userAddress);
    
    // 构建交易数据
    const txData = {
      chainId: 'eip155:8453', // Base网络ID
      method: 'eth_sendTransaction',
      params: {
        abi: [], // 简单交易不需要ABI
        to: CONTRACT_ADDRESS,
        data: CALL_DATA,
        value: '0', // 无需发送ETH
      },
    };
    
    // 返回交易数据
    res.status(200).json(txData);
  } catch (error) {
    console.error('Error generating transaction data:', error);
    res.status(500).json({ 
      message: '生成交易数据时发生错误',
      error: error.message 
    });
  }
});

// 处理交易完成后的回调
app.post('/api/callback', async (req, res) => {
  try {
    const { untrustedData } = req.body;
    const transactionId = untrustedData?.transactionId;
    
    console.log('Transaction completed with hash:', transactionId);
    
    // 返回一个新的Frame，显示交易完成
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://i.imgur.com/success.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          <meta property="og:image" content="https://i.imgur.com/success.png" />
          <meta property="fc:frame:button:1" content="查看交易" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="https://basescan.org/tx/${transactionId}" />
        </head>
        <body>
          <p>交易已完成!</p>
        </body>
      </html>
    `;
    
    res.status(200).send(htmlResponse);
  } catch (error) {
    console.error('Error handling callback:', error);
    res.status(500).json({ 
      message: '处理回调时发生错误',
      error: error.message 
    });
  }
});

// 为帧验证提供一个简单的GET端点
app.get('/api/get-tx', (req, res) => {
  res.status(200).send('Ready to process transactions');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 