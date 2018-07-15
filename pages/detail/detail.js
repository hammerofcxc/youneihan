import {mapCommentItem} from '../../templates/msg_comment/msg_comment';
import {mapItem, imagePreview} from '../../templates/msg_cell/msg_cell'
import {getBaseItemUrl, getItemCommentUrl} from "../../common/const";
import {hideToast, showLoading, setVoteInfo, setCommentVoteInfo} from "../../common/global";
import { res1, res2 } from "../../utils/api";

let id = null;
const pageConf = {
    data: {
        item: null,
        hotCommentList: [],
        newCommentList: [],
        url: getBaseItemUrl(),
        url_comment: null,
    },

    onShareAppMessage: function () {
        return {
            title: '爆笑内涵--新鲜优质的搞笑内容让你的生活更精彩：）',
            path: '/pages/detail/detail?id=' + id,
        }
    },

    onLoad(params) {
        console.log(params);
        showLoading();
        this.refreshData(params);
    },

    refreshData: function (params) {
        id = params['id'];
        const that = this;
        wx.request({
            'url': that.data.url + id,
            'success': function (res) {
                that.setData({
                    item: mapItem(res.data.data),
                    url_comment: getItemCommentUrl(id)
                });
                that.refreshComment(true);
                hideToast();
            },
            'fail': function (err) {
                console.log(err.errMsg);
                that.setData({
                  item: mapItem(res1[id-1]),
                  url_comment: getItemCommentUrl(id)
                });
                that.refreshComment(true);
                hideToast();
                hideToast();
            }
        })
    },

    onReachBottom() {
        if (this.data.url_comment != null) {
            this.refreshComment(false);
        }
    },

    refreshComment: function (isReset) {
        const that = this;
        wx.request({
            'url': that.data.url_comment,
            'success': function (res) {
                let newItems = res.data.data.results.new;
                let hotItems = res.data.data.results.hot;
                if (hotItems.length != 0) {
                    hotItems = hotItems.map(mapCommentItem);
                }
                if (newItems.length != 0) {
                    newItems = newItems.map(mapCommentItem);
                }
                if (!isReset) {
                    newItems = that.data.newCommentList.concat(newItems);
                    hotItems = that.data.hotCommentList.concat(hotItems);
                }
                that.setData({
                    hotCommentList: hotItems,
                    newCommentList: newItems,
                    url_comment: res.data.data.next
                });
                hideToast();
            },
            'fail': function (v) {
              let newItems = res1;
              let hotItems = res2;
              if (hotItems.length != 0) {
                hotItems = hotItems.map(mapCommentItem);
              }
              if (newItems.length != 0) {
                newItems = newItems.map(mapCommentItem);
              }
              // if (!isReset) {
              //   newItems = that.data.newCommentList.concat(newItems);
              //   hotItems = that.data.hotCommentList.concat(hotItems);
              // }
              that.setData({
                hotCommentList: hotItems,
                newCommentList: newItems,
                url_comment: null
              });
                hideToast();
            }
        });
    },

    voteUpTap(e) {
        const that = this;
        const item = e.currentTarget.dataset.item;
        if (item.voteType == -1) {
            item.voteType = 1;
        }
        setVoteInfo(item.id, item.voteType);
        that.setData({
            item: item
        });
    },

    voteDownTap(e) {
        const that = this;
        const item = e.currentTarget.dataset.item;
        if (item.voteType == -1) {
            item.voteType = 0;
        }
        setVoteInfo(item.id, item.voteType);
        that.setData({
            item: item
        });
    },

    commentLoveTap: function (e) {
        const that = this;
        const item = e.currentTarget.dataset.item;
        if (item.commentVoteType == -1) {
            item.commentVoteType = 1;
            for (let i = 0; i < that.data.hotCommentList.length; i++) {
                if (that.data.hotCommentList[i].id == item.id) {
                    that.updateHotComment(that, item);
                    return;
                }
            }
            that.updateNewComment(that, item);
        }
    },

    updateHotComment: function (that, item) {
        let i = 0;
        setCommentVoteInfo(item.id, item.commentVoteType);
        while (that.data.hotCommentList[i].id != item.id) {
            i++;
        }
        that.data.hotCommentList.splice(i, 1, item)
        that.setData({
            hotCommentList: that.data.hotCommentList
        });
    },

    updateNewComment: function (that, item) {
        let i = 0;
        setCommentVoteInfo(item.id, item.commentVoteType);
        while (that.data.newCommentList[i].id != item.id) {
            i++;
        }
        that.data.newCommentList.splice(i, 1, item)
        that.setData({
            newCommentList: that.data.newCommentList
        });
    },

    imagePreview: imagePreview,
};

Page(pageConf);
