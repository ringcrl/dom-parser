/**
 * 移除字符串中的换行符、前后空格、多个空格合并为一个
 * @param {string} str 
 */
function pureString(str) {
  return str
    .replace(/[\r|\n]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = pureString;