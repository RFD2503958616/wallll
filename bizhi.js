// Quantumult X 脚本：稳定获取 App Store 高清壁纸
// 更新时间：2024 年 6 月
// 功能：提取所有高清壁纸 URL 并输出日志

const $ = $substore;

try {
// 1. 解析 API 返回的 JSON 数据
let body = JSON.parse($response.body);

// 2. 检查数据结构
if (!body.data?.attributes) {
console.log(" 错误：API 返回数据格式异常");
$done({body: $response.body});
return;
}

// 3. 提取所有图片 URL（截图 + 预览）
const attrs = body.data.attributes;
const imageUrls = [
...(attrs.screenshotUrls || []),
...(attrs.previews?.map(preview => preview.url) || [])
].filter(url => url && /\.(jpg|png|webp)$/i.test(url));

// 4. 输出结果到 Quantumult X 日志
if (imageUrls.length > 0) {
console.log("✅ 成功获取高清壁纸 URL：");
imageUrls.forEach((url, index) => {
console.log(`${index + 1}. ${url.replace(/\?.*$/, "")}`); // 去除 URL 参数
});
} else {
console.log("️ 未找到有效图片 URL");
}

// 5. 返回原始数据（避免破坏 API 结构）
$done({body: $response.body});

} catch (e) {
console.log(` 脚本运行错误：${e.message}`);
$done({body: $response.body});
}
