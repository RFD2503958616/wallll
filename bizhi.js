// Quantumult X 脚本：拦截 Laggy Wallpaper 图片 API
// 功能：提取 App Store 中的图片 URL，并输出到日志

const $ = $substore; // Quantumult X 提供的环境变量

// 1. 解析 API 返回的 JSON 数据
let body = JSON.parse($response.body);

// 2. 检查是否有截图或预览图数据
if (body.data && body.data.attributes) {
const appData = body.data.attributes;
const screenshotUrls = appData.screenshotUrls || [];
const previewUrls = appData.previews || [];

// 3. 合并所有图片 URL（截图 + 预览）
const allImageUrls = [...screenshotUrls];
previewUrls.forEach(preview => {
if (preview.url) allImageUrls.push(preview.url);
});

// 4. 去重并过滤无效 URL
const uniqueUrls = [...new Set(allImageUrls)].filter(url =>
url.startsWith("http") && (url.includes(".jpg") || url.includes(".png") || url.includes(".webp"))
);

// 5. 输出到 Quantumult X 日志
if (uniqueUrls.length > 0) {
console.log("✅ 找到 Laggy Wallpaper 图片 URL：");
uniqueUrls.forEach((url, index) => {
console.log(`${index + 1}. ${url}`);
});

// 6. 可选：自动触发下载（需配合外部工具）
// 这里只是输出 URL，实际下载可用 Python 脚本处理
$done({body: JSON.stringify(body)});
} else {
console.log("️ 未找到图片 URL");
$done({body: JSON.stringify(body)});
}
} else {
console.log("️ API 返回数据格式不符");
$done({body: JSON.stringify(body)});
}
