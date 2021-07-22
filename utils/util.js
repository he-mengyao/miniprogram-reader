export default {
    checkLogin({
        key,
        next,
        item
    }) {
        let user = wx.getStorageSync(key)
        if (user) {
            next(item)
        } else {
            wx.showModal({
                cancelText: '取消',
                confirmText: '确定',
                title: '检测到您未登录',
                content: '是否立即跳转到登录页面',
                success: res => {
                    if (res.confirm) {
                        console.log('确定')
                    } else if (res.cancel) {
                        console.log('取消')
                    }
                }
            })
        }
    },
    saveHistory({
        key,
        data,
        attr
    }) {
        // let name = username + key + 'History' // 名字规范
        let name = key + 'History'
        let history = wx.getStorageSync(name)
        if (history) {
            // 如果存在
            let arr = wx.getStorageSync(name)
            if (typeof data === 'string') {
                arr= arr.filter(item=>{
                    return item[attr] !== data
                })
                let obj = {
                    [attr]: data
                }
                arr.unshift(obj)
            } else {
                arr = arr.filter(i => {
                    return i[attr] !== data[attr]
                })
                arr.unshift(data)
            }
            wx.setStorageSync(name, arr)

        } else {
            // 第一次存储
            let arr = []
            if (typeof data === 'string') {
                let obj = {
                    [attr]: data
                }
                arr.unshift(obj)
            } else {
                arr.unshift(data)
            }
            wx.setStorageSync(name, arr)
        }
    },
    getHistory({
        key
    }) {
        // let name = username + key + 'History'
        let name = key + 'History'
        let arr = wx.getStorageSync(name)
        if (arr) return arr
        else return null
    }
}