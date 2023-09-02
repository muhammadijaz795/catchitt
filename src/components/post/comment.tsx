import classNames from 'classnames';
import styles from './post.module.scss';
import { useRef, useState, memo } from 'react';
import Button from '@mui/material/Button';
import profileIcon from '../../assets/profileIcon.png';
import InputField from '../reusables/InputField';
import { differenceInHours, differenceInDays, differenceInWeeks, format } from 'date-fns';
import { Comment as CommentType } from './postTypes'

import { CommentLike } from './svg-components/CommentLike';
import { ArrowDown } from './svg-components/ArrowDown';

const Comment: React.FC<{ comment: CommentType, handleReply: Function, handleLikeComment: Function }> = memo(({ comment, handleReply, handleLikeComment }) => {

	const [isReplyOpen, setIsReplyOpen] = useState(false)
	const [isRepliesShown, setIsRepliesShown] = useState(false)
	const [replyMessage, setReplyMessage] = useState('')
	const bottomDivRef = useRef<HTMLDivElement | null>(null)

	function formatTimeAgo(date: any) {
		const now = new Date();
		const daysDifference = differenceInDays(now, date);
		const weeksDifference = differenceInWeeks(now, date);
		const hoursDifference = differenceInHours(now, date);

		if (weeksDifference >= 4) {
			return format(date, 'dd-MM-yyyy');
		} else if (weeksDifference >= 1) {
			return `${weeksDifference}w`;
		} else if (daysDifference >= 1) {
			return `${daysDifference}d`;
		} else if (hoursDifference >= 1) {
			return `${hoursDifference}h`;
		} else {
			const minutesDifference = Math.floor(((now as unknown as number) - date) / (1000 * 60)); // Calculate minutes
			return `${minutesDifference}m`;
		}
	}

	type ReplyType = {
		createdTime: number;
		reply: string;
		likes: number;
		id: number;
		user: {
			avatar: string;
			name: string;
		}
	}

	const Reply = ({ reply }: { reply: ReplyType }) => {

		return (
			<div className={styles.commentRepliesDiv} key={reply.id}>
				<div
					className={styles.repliesDropdown}
				>
					<div className={styles.userInfoCommentDiv}>
						<div className={styles.userInfoCommentFrame}>
							<img
								src={reply.user.avatar || profileIcon}
								alt={reply.user.name}
								className={styles.avatarImgCircleComment}
							/>
							<h4 className={styles.userNameTextComment}>
								{reply.user.name}
								<span className={styles.timeText}>
									{formatTimeAgo(new Date(reply.createdTime))}
								</span>
							</h4>
						</div>
						{/* <div className={styles.userCommmentLikesDiv}>
							<Button onClick={() => handleLikeComment([`${comment.id}/${reply.id}`])}>
								<CommentLike />
							</Button>
							{reply.likes}
						</div> */}
					</div>
					<div
						className={styles.commentDiv}>
						{reply.reply}
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className={styles.userInfoCommentDiv} key={comment.id}>
				<div className={styles.userInfoCommentFrame}>
					<img
						src={comment.user.avatar || profileIcon}
						alt={comment.user.name}
						className={styles.avatarImgCircleComment}
					/>
					<h4 className={styles.userNameTextComment}>
						{comment.user.name}
						<span className={styles.timeText}>
							{formatTimeAgo(new Date(comment.createdTime))}
						</span>
					</h4>
					{/* <p>{formatTimeAgo(new Date(comment.createdTime))}</p> */}
				</div>
				<div className={styles.userCommmentLikesDiv}>
					<Button onClick={() => handleLikeComment([comment.id])}>
						{comment.isLiked ? <CommentLike liked={true} /> : <CommentLike />}
						{comment.likes}
					</Button>
				</div>
			</div>
			<div ref={bottomDivRef} className={styles.commentDiv}>
				{comment.comment}
				<Button
					sx={{
						textDecoration: 'none',
						textTransform: 'none',
						color: '#848484',
						alignSelf: 'start',
						padding: '8px 0px 0px 0px',
						minWidth: '0',
					}}
					onClick={() => setIsReplyOpen(prev => !prev)}
				>
					Reply
				</Button>
				<div >
					{isReplyOpen && (
						<div
							style={{ paddingTop: '10px', paddingBottom: '10px', }}>
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									let didDebounce = await handleReply([replyMessage, comment.id]);
									if (comment.replies.length > 5 && !isRepliesShown) {
										setIsRepliesShown(true)
									}
									setTimeout(() => {
										bottomDivRef?.current?.scrollIntoView({
											behavior: 'smooth', // You can adjust the scrolling behavior
											block: 'end',       // Scroll to the bottom of the element
										});
									}, 100)
									if (!didDebounce)
										setReplyMessage('');
								}}
							>
								<InputField
									placeholder="Message..."
									type={''}
									value={replyMessage}
									onChange={(e: any) => { setReplyMessage(e.target.value) }}
								/>
							</form>
						</div>
					)}
				</div>
				{
					comment.replies.slice(0, 5).map((r, i) => <Reply reply={r} key={i} />)
				}
				{
					isRepliesShown && (comment.replies.slice(5).map((r, i) => <Reply reply={r} key={i} />))
				}
				{
					comment.replies.length > 5 && (
						<div className={styles.commentRepliesDiv}>
							<div>
								<Button
									sx={{
										textDecoration: 'none',
										textTransform: 'none',
										color: '#848484',
										alignSelf: 'start',
										padding: '8px 0px 0px 0px',
										margin: '0px 0px 15px 0px',
										minWidth: '0',
									}}
									onClick={() => {
										setIsRepliesShown(prev => !prev)
									}}>
									<div style={{ marginRight: '5px' }}>
										{`View ${isRepliesShown ? 'less' : 'more'} (${comment.replies.length - 5})`}
									</div>
									<ArrowDown />
								</Button>
							</div>
						</div>)}
			</div>
		</>
	)
})

export { Comment }