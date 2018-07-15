import { getCommentVoteInfo } from "../../common/global";

export function mapCommentItem(commentItem) {
    commentItem.commentVoteType = getCommentVoteInfo(commentItem.id);
    return commentItem
}