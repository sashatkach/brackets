module.exports = function check(str, bracketsConfig) {
    let stack = [];
    let last = [];
    let countGap = 0;
    if (str.length % 2 === 1) {
        return false;
    }
    for (let j = 0; j < bracketsConfig.length; ++j) {
        if (bracketsConfig[j][0] === bracketsConfig[j][1]) {
            let innerState = false;
            for (let i = 0; i < str.length; ++i) {
                if (str[i] !== bracketsConfig[j][0] && !innerState) {
                    innerState = true
                } else if (str[i] === bracketsConfig[j][0] && innerState) {
                    countGap++
                } else if (innerState && str[i] !== bracketsConfig[j][0]) {
                    innerState = false;
                }
            }
            if (countGap % 2 !== 0) {
                return false;
            }
            str = str.split(bracketsConfig[j][0]).join('');
            countGap = 0;
        }
    }

    for (let i = 0; i < str.length; ++i) {
        let j = 0;
        while (j < bracketsConfig.length && str[i] !== bracketsConfig[j++][0]) {}
        if (str[i] === bracketsConfig[j - 1][0]) {
            stack.push(str[i]);
            last.push(j - 1);
        }
        j = 0;

        while (j < bracketsConfig.length && str[i] !== bracketsConfig[j++][1]) {}
        if (str[i] === bracketsConfig[j - 1][1]) {
            if (last.length) {
                if (last[last.length - 1] !== j - 1) {
                    return false;
                }
                stack.pop();
                last.pop();
            }
        }
    }
    return !stack.length;
}