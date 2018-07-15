import { mapItem, imagePreview } from '../../templates/msg_cell/msg_cell';
import { getHotItemsUrl, getTextItemsUrl, getImageItemsUrl } from "../../common/const";
import { hideToast, showLoading, setVoteInfo, getVoteInfo, setCommentVoteInfo, showToast } from "../../common/global";
import { ress } from "../../utils/api";


const pageConf = {
    data: {
        toView: null,
        swiperHeight: "0",
        curTabIndex: 0,
        curMode: "豪",
        swiperList: [],
    },

    onShareAppMessage: function () {
        return {
            title: '爆笑内涵--新鲜优质的搞笑内容让你的生活更精彩：）',
            path: '/pages/msg/msg'
        }
    },

    //生命周期函数-监听页面初次渲染完毕
    onReady() {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    swiperHeight: (res.windowHeight - 37)
                });
            }
        });
    },

    initData() {
        const swiperList = [];
        const tabTitles = ["热门", "段子", "图片"];
        const tabUrls = [getHotItemsUrl(), getTextItemsUrl(), getImageItemsUrl(),];
        for (let i = 0; i < tabTitles.length; i++) {
            const tab = {};
            tab.title = tabTitles[i];
            tab.url = tabUrls[i];
            tab.dataList = [];
            swiperList.push(tab);
        }
        this.setData({
            swiperList: swiperList
        });
    },

    onLoad(params) {
        let that = this;
        that.initData();
        wx.getNetworkType({
            success: function (res) {
                if (res.networkType == "none") {
                    showToast("没有网哦 ●'◡'●", -1);
                } else if (res.networkType != "wifi") {
                    that.data.curTabIndex = 1;
                    that.data.curMode = "省";
                    that.setData({
                        curMode: that.data.curMode,
                    });
                    that.realChange(that.data.curTabIndex);
                } else {
                    that.realChange(that.data.curTabIndex);
                }
            }
        })
    },

    switchTab(e) {
        if (this.data.curTabIndex == e.currentTarget.dataset.idx) {
            this.refreshNewData();
        }
        if (this.data.curMode == "豪") {
            this.realChange(e.currentTarget.dataset.idx);
        } else if (this.data.curTabIndex != e.currentTarget.dataset.idx) {
            showToast("请点击左下角切换到土豪模式", 2000);
        }
    },

    bindChange(e) {
        if (this.data.curMode == "省" &&
            (e.detail.current == 0 || e.detail.current == 2)) {
            showToast("请点击左下角切换到土豪模式", 2000);
            this.realChange(1);
        } else {
            this.realChange(e.detail.current);
        }
    },

    realChange(idx) {
        this.data.curTabIndex = idx;
        this.setData({
            curTabIndex: idx
        });
        //如果需要加载数据
        if (this.getSwiperData(idx).dataList.length == 0) {
            this.refreshData(false, idx);
        }
    },

    //切换模式
    changeMode() {
        if (this.data.curMode == "豪") {
            this.data.curMode = "省";
            this.data.curTabIndex = 1;
            this.realChange(this.data.curTabIndex);
        } else {
            this.data.curMode = "豪";
        }
        this.setData({
            curMode: this.data.curMode,
        });
    },

    //刷新数据
    refreshNewData() {
        this.refreshData(true, this.data.curTabIndex);
        this.scrollToView();
    },

    scrollToView() {
        const id = this.getSwiperData(this.data.curTabIndex).title;
        this.setData({
            toView: id
        })
    },

    //加载更多数据
    loadMoreData() {
        this.refreshData(false, this.data.curTabIndex);
    },

    //设置新数据
    setNewDataWithRes: function (res, isReset, curTabIndex) {
        const itemList = this.getSwiperData(curTabIndex).dataList;
        let items = res.map(mapItem);
        if (!isReset) {
            items = itemList.concat(items)
        }
        this.data.swiperList[curTabIndex].dataList = items;
        this.setData({
            swiperList: this.data.swiperList
        });
    },

    getSwiperData(curTabIndex) {
        return this.data.swiperList[curTabIndex];
    },

    refreshData: function (isReset, curTabIndex) {
        const that = this;
        const url = this.getSwiperData(curTabIndex).url;
        
       
        showLoading();
        wx.request({
            'url': url,
            'success': function (res) {
                that.setNewDataWithRes(res, isReset, curTabIndex);
                hideToast();
            },
            'fail': function (v) {
              that.setNewDataWithRes(ress[curTabIndex], isReset, curTabIndex);
                hideToast();
            }
        });
    },

    updateItem: function (item, curTabIndex) {
        setVoteInfo(item.id, item.voteType);
        const dataList = this.getSwiperData(curTabIndex).dataList;
        let idx = 0;
        while (dataList[idx].id != item.id) {
            idx++;
        }
        dataList.splice(idx, 1, item);
        this.setData({
            swiperList: this.data.swiperList
        });
    },

    voteUpTap(e) {
        const item = e.currentTarget.dataset.item;
        if (item.voteType == -1) {
            item.voteType = 1;
        }
        this.updateItem(item, this.data.curTabIndex);
    },

    voteDownTap(e) {
        const item = e.currentTarget.dataset.item;
        if (item.voteType == -1) {
            item.voteType = 0;
        }
        this.updateItem(item, this.data.curTabIndex);
    },

    commentLoveTap: function (e) {
        const that = this;
        const item = e.currentTarget.dataset.item;
        // if (item.commentVoteType == -1) {
        item.commentVoteType = 1;
        that.updateNewComment(that, item);
        // return;
        //  }
    },

    updateNewComment: function (that, item) {
        let i = 0;
        const dataList = this.getSwiperData(that.data.curTabIndex).dataList;
        setCommentVoteInfo(item.id, item.commentVoteType);
        while (!dataList[i].best_comment || dataList[i].best_comment.id != item.id) {
            i++;
        }
        if (dataList[i].best_comment) {
            dataList[i].best_comment.commentVoteType = item.commentVoteType;
        }
        this.setData({
            swiperList: this.data.swiperList
        });
    },

    imagePreview: imagePreview,
};

Page(pageConf);