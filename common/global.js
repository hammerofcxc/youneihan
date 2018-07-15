/**
 * Created by steven-yan on 17/3/6.
 */
import {getPutWxUserInfoUrl} from "./const";
import {getWxLoginUrl} from "./const";
import {TokenStorageKey, TokenHeaderKey} from "./const";

export const globalData = {
    userInfo: null,
    sysInfo: null,
    token: null,
    voteInfo: {},
    commentVoteInfo: {},
};

//加载全局数据
export function loadGlobalData() {
    getSysInfo(sysInfo=>{
        console.log(sysInfo)
    });
    // getUserInfo(userInfo=>{
    //     console.log(userInfo);
    // })
    // getToken(token=>{
    //     console.log(token)
    // });
}

//成功提示
export function showSuccess(title = "成功啦", duration = 10000) {
    wx.showToast({
        title: title,
        icon: 'success',
        duration: (duration <= 0) ? 10000 : duration
    });
}
//loading提示
export function showLoading(title = "请稍后", duration = 10000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: (duration <= 0) ? 10000 : duration
    });
}

export function showToast(title = "请输入标题", duration = 3000) {
    wx.showToast({
        title: title,
        duration: (duration <= 0) ? 3000 : duration
    });
}

//隐藏提示框
export function hideToast() {
    wx.hideToast();
}

export function getSysInfo(cb) {
    if (globalData.sysInfo) {
        typeof cb == "function" && cb(globalData.sysInfo);
    } else {
        wx.getSystemInfo({
            success: res => {
                globalData.sysInfo = res;
                typeof cb == "function" && cb(globalData.sysInfo);
            }
        })
    }
}

export function getUserInfo(cb) {
    if (globalData.userInfo) {
        typeof cb == "function" && cb(globalData.userInfo)
    } else {
        wx.login({
            success: loginResp => {
                wx.getUserInfo({
                    success: resp => {
                        globalData.userInfo = resp.userInfo;
                        resp.code = loginResp.code;
                        typeof cb == "function" && cb(globalData.userInfo);
                        getToken(token => {
                            wx.request({
                                url: getPutWxUserInfoUrl(),
                                method: 'put',
                                header: {AUTHORIZATION: token},
                                data: resp,
                                success: (resp) => {
                                    console.log(resp)
                                },
                                fail: (err) => {
                                    console.log(err)
                                }
                            });
                        });
                    },
                    fail: err => {
                        console.log(err)
                    }
                });
            },
            fail: err => {
                console.log(err)
            }
        });
    }
}

export function getToken(cb) {
    // login
    if (globalData.token) {
        cb(globalData.token);
    } else {
        wx.getStorage({
            key: TokenStorageKey,
            success: res => {
                globalData.token = res.data;
                cb(globalData.token);
            },
            fail: err => {
                wx.login({
                    success: res => {
                        wx.request({
                            url: getWxLoginUrl(),
                            data: { code: res.code },
                            success: (res) => {
                                if (res.statusCode == 200) {
                                    globalData.token = res.data.token;
                                    cb(globalData.token);
                                    wx.setStorageSync(TokenStorageKey, globalData.token);
                                } else {
                                    console.log(res);
                                }
                            },
                            fail: (err) => {
                                console.log(err.errMsg);
                            }
                        });
                    },
                    fail: err => {
                        console.log(err.errMsg);
                    }
                });
                console.log(err.errMsg);
            }
        });
    }
}

export function getVoteInfo(item_id) {
    if (item_id in globalData.voteInfo) {
        return globalData.voteInfo[item_id]
    } else {
        return -1
    }
}

export function setVoteInfo(item_id, isVoteUp) {
    globalData.voteInfo[item_id] = isVoteUp
}

export function getCommentVoteInfo(comment_id) {
    if (comment_id in globalData.commentVoteInfo) {
        return globalData.commentVoteInfo[comment_id]
    } else {
        return -1
    }
}

export function setCommentVoteInfo(comment_id, isVoteUp) {
    globalData.commentVoteInfo[comment_id] = isVoteUp
}
