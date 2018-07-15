import {getVoteInfo, globalData} from "../../common/global";

export function getImageWidth() {
    return globalData.sysInfo.windowWidth - 20 * 2 * (globalData.sysInfo.windowWidth / 750);
}

export function mapItem(item) {
    if (item.image != null) {
        item.image.r_width = getImageWidth();
        item.image.r_height = item.image.r_width * item.image.height / item.image.width
    }
    item.voteType = getVoteInfo(item.id);
    return item;
}

export function imagePreview(e) {
    wx.previewImage({
        current: e.target.dataset.item.image.url_list[0].url,
        urls: [e.target.dataset.item.image.url_list[0].url],
    })
}
