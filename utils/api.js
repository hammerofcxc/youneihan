const user1 = {
  name: "喒你家玻璃",
  avatar_url: "http://mpic.spriteapp.cn/profile/large/2016/09/29/57ec70bf1adcb_mini.jpg",

}
const best_comment1 = {
  content : "哈哈哈 我是神评1",
  user: user1,
  commentVoteType : 1,
  like_count: 11
}
const user2 = {
  name: "局长夫人的妹妹",
  avatar_url: "http://mpic.spriteapp.cn/profile/large/2016/11/28/583c4ea1f3eb6_mini.jpg",

}
const best_comment2 = {
  content: "哈哈哈 我是神评2",
  user: user2,
  commentVoteType: 0,
  like_count: 22
}
const user3 = {
  name: "我有了一个男朋友ヽ、",
  avatar_url: "http://mpic.spriteapp.cn/profile/large/2016/07/26/57974925b34a6_mini.jpg",

}
const best_comment3 = {
  content: "哈哈哈 我是神评3",
  user: user3,
  commentVoteType: 1,
  like_count: 33
}
const user4 = {
  name: "原生君",
  avatar_url: "http://mpic.spriteapp.cn/profile/large/2016/09/22/57e3d9083f5e3_mini.jpg",

}
const best_comment4 = {
  content: "哈哈哈 我是神评4",
  user: user4,
  commentVoteType: 1,
  like_count: 44
}
const user5 = {
  name: "马小梅",
  avatar_url: "http://mpic.spriteapp.cn/profile/large/2018/02/24/5a90448611639_mini.jpg",

}
const best_comment5 = {
  content: "哈哈哈 我是神评5",
  user: user5,
  commentVoteType: 1,
  like_count: 55
}





const imageurl1 = []

imageurl1[0] = {
  url: "https://wx3.sinaimg.cn/mw690/6f57a017gy1ft80u1smbqg203p05khdw.gif"
}

const image1 = {
  url_list : imageurl1,
  r_width : null,
  r_height : null,
  width : 800,
  height : 800
}
const tab1 = {
  id: 1,
  media_type: 0,
  content: "搬砖只是我的表面工作~",
  user: user1,
  image: image1,
  voteType: 1,
  like_count: 32,
  dislike_count: 23,
  comment_count: 54,
  best_comment : best_comment1
};


const imageurl2 = []

imageurl2[0] = {
  url: "http://wimg.spriteapp.cn/ugc/2018/04/25/5adff12e2e581.gif"
}

const image2 = {
  url_list: imageurl2,
  r_width : null,
  r_height: null,
  width: 800,
  height: 600
}
const tab2 = {
  id: 2,
  image: null,
  media_type: 0,
  content: "后面沉不下去怪我腿短喽？",
  user: user2,
  image: image2,
  voteType: 1,
  like_count: 32,
  dislike_count: 23,
  comment_count: 54,
  best_comment : best_comment2
};

const tab3 = {
  id: 3,
  image: null,
  media_type: 0,
  content: "悟空和唐僧一起上某卫视非诚勿扰,悟空上台,24盏灯全灭。理由:1.没房没车只有一根破棍. 2.保镖职业危险.3.动不动打妖精,对女生不温柔. 4.坐过牢,曾被压五指山下500年。唐僧上台，哗!灯全亮。 理由:1.公务员； 2.皇上兄弟，后台最硬 3.精通梵文等外语 4.长得帅 5.最关键一点：有宝马！",
  user: user3,
  image: null,
  voteType: 1,
  like_count: 32,
  dislike_count: 23,
  comment_count: 54,
  best_comment : best_comment3
};


const tab4 = {
  id: 4,
  image: null,
  media_type: 0,
  content: "一天夜里，老婆不在家，只剩小姨子和我在客厅，我在看电视，突然小姨子从洗澡间出来，我顿时被她性感的身材和身上散发出的香味给迷住了，她对我使了个媚眼，然后扬长走向她的房间，可气的是门还半掩着！随后一张纸条飞了出来！我立马跑过去捡起纸条一看，上面写着:“姐夫，96、94264、234、64、226 ！” 他哥的！我平时最恨这种鸟语！立马撕了纸条继续看电视！你们懂意思吗",
  user: user4,
  image: null,
  voteType: 1,
  like_count: 32,
  dislike_count: 23,
  comment_count: 54,
  best_comment : best_comment4
};


const tab5 = {
  id: 5,
  image: null,
  media_type: 0,
  content: "有次地震一个室友还在午睡。我们叫醒他说地震了，他立马就下床跑出去了。我们很奇怪，经过了好几次地震了这种小震他这么激动干嘛。过一会儿回来室友叹气说：哎， 还以为能看到没穿衣服跑出来的学妹",
  user: user5,
  image: null,
  voteType: 1,
  like_count: 32,
  dislike_count: 23,
  comment_count: 54,
  best_comment : best_comment5
};

export const res1 = [tab1, tab2, tab3, tab4, tab5];
export const res2 = [tab4, tab5, tab3];
const res3 = [tab1, tab2];

export const ress = [res1, res2, res3];

