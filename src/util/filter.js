/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    if (!str) return ''
    var now = new Date(str)
    const year = now.getFullYear();
    const month = now.getMonth() + 1;  // 月份从0开始，所以要加1
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export const toString=(data)=> {
    return JSON.stringify(data)
}

export const tojson=(data)=> {
    return JSON.parse(data)
}