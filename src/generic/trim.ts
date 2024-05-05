export const trim = (str: string, chars: string[]) => {
    let start = 0;
    let end = str.length - 1;
    for (let i=0; i<str.length; i++) {
        if (chars.includes(str[i])) {
            start++;
        } else {
            break;
        }
    }
    
    for (let i = str.length - 1; i >= start; i--) {
        if (chars.includes(str[i])) {
            end--;
        } else {
            break;
        }
    }

    return str.slice(start, end + 1);
}