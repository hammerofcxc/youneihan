/**
 * Created by steven-yan on 17/3/5.
 */

export const DEBUG = false;
export const TokenStorageKey = 'token';
export const TokenHeaderKey = 'AUTHORIZATION';


function getBaseUrl() {
    if (DEBUG) {
        return "http://127.0.0.1:8000/";
        // return "https://192.168.99.100/"
    } else {
        return "https://localeasier.com/";
    }
}

function getBaseUserUrl() {
    return getBaseUrl() + "users/";
}
export function getWxLoginUrl() {
    return getBaseUserUrl() + "wxLogin/";
}
export function getPutWxUserInfoUrl() {
    return getBaseUserUrl() + "wxUserInfo/";
}
export function getBaseItemUrl() {
    return getBaseUrl() + "items/";
}

export function getHotItemsUrl() {
    return getBaseItemUrl() + "hot/";
}

export function getItemCommentUrl(id) {
    return getBaseUrl() + "items/" + id + "/comments/";
}

export function getTextItemsUrl() {
    return getBaseItemUrl() + "text/";
}
export function getImageItemsUrl() {
    return getBaseItemUrl() + "image/";
}
