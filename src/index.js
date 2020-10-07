module.exports = function check(str, bracketsConfig) {
    let o = Object.fromEntries(bracketsConfig);
    let stack = [];
    for (let i = 0; i < str.length; ++i) {
        if (stack[stack.length - 1] === str[i]) {
            stack.pop();
        } else if (o[str[i]]) {
            stack.push(o[str[i]]);
        } else {
            return false;
        }
    }
    return !stack.length;
}