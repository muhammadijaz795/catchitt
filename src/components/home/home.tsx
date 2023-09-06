import classNames from 'classnames';
import styles from './home.module.scss';
import { TopBar } from '../top-bar/top-bar';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { Post } from '../post/post';
import { useAuthStore } from '../../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, useLayoutEffect, memo } from 'react';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import { fetchInJSON } from '../reusables/fetchInJSON';
import { BookmarkItem, Post as PostType } from '../post/postTypes';
import { useParams } from 'react-router-dom'
// import { getCache, replaceCache } from '../../store/cachedBookmarks';
import useDebounce from '../reusables/useDebounce';

export interface HomeProps {
	className?: string;
}

export const Home = ({ className }: HomeProps) => {
	let avatarUrl = '';
	const { onePost } = useParams()
	const navigator = useNavigate()
	const API_KEY = process.env.VITE_API_URL;

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const [paginating, setPaginating] = useState(false)
	const [postData, setPostData] = useState<any>([]);
	const [bookmarksData, setBookmarksData] = useState<BookmarkItem[]>([]);
	const [profileData, setProfileData] = useState<any>([])
	const endPoint = '/media-content/videos/feed';
	const token = useAuthStore((state) => state.token);
	const startedIds = useRef(new Set(''));
	const endedIds = useRef(new Set(''));
	const tab = useRef(1);
	const page = useRef(1)
	console.log("page", page.current)

	useEffect(() => {
		if (onePost || location.pathname !== '/home')
			handleFetchOnePost(onePost as string)
		else
			dHandleFetchPosts([]);
		dHandleFetchUserBookmarks([]);
		handleFetchProfileInfo();
	}, []);

	const handleFetchPosts = useCallback(async (page?: number) => {
		if (onePost) {
			setPostData([])
		}

		let link = isLoggedIn ?
			`/media-content/videos/feed?page=${page ? page : 1}`
			: `/media-content/public/videos/feed?page=${page ? page : 1}`

		const res = await fetchInJSON(
			link,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		console.log(res);
		if (page != 1)
			setPostData((prev: []) => [...prev, ...res.data]);
		else
			setPostData([...res.data]);

	}, []);
	const dHandleFetchPosts = useDebounce(handleFetchPosts)

	const handleFetchOnePost = async (myMediaId: string) => {
		await fetchInJSON(
			`/media-content/videos/${myMediaId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
			(res: any) => setPostData([res.data])
		)
	}

	const handleFetchUserBookmarks = useCallback(async () => {
		if (!isLoggedIn) { return }
		await fetchInJSON(
			`/profile/collection`,
			{
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			},
			(res: any) => {
				setBookmarksData(res.data.data as BookmarkItem[]);
				console.log('bookmarks ftch', res);
				// if (res.data.data.length > 0 && Array.from(getCache()).length === 0) {
				// 	replaceCache(res.data.data.map((e: any) => e.mediaId))
				// }
			}
		);
	}, []);
	const dHandleFetchUserBookmarks = useDebounce(handleFetchUserBookmarks)

	const handleFetchFollowingPosts = async (page?: number) => {
		if (onePost) {
			setPostData([])
		}
		if (!isLoggedIn) { navigator('/auth') }
		else {
			const response = await fetchInJSON(
				`${endPoint}/?page=${page ? page : 1}&followingsuggestions=1`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const followingData = (response as any).data as []; // Extract the data from the response
			if (page != 1) {
				setPostData((prev: []) => [...prev, ...followingData]);
			} else {
				setPostData([...followingData]);
			}
		}
		// Update the state with the fetched data
	};
	const dHandleFetchFollowingPosts = useDebounce(handleFetchFollowingPosts)

	const handleFetchProfileInfo = async () => {
		if (!isLoggedIn) { return }
		try {
			const response = await fetch(`${API_KEY}/profile`, {
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			});

			if (response.ok) {
				const responseData = await response.json();
				setProfileData(responseData.data)
			} else {
				console.log('fetched profile data: ');
				console.log(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	function handleScroll(e: any) {
		e.preventDefault()
		const windowHeight = window.innerHeight;
		const documentHeight = document.querySelector('#root > div')?.scrollHeight as number;
		const scrollPosition = e.target.scrollTop;
		const threshold = 200;

		if ((windowHeight + scrollPosition >= documentHeight - threshold) && !onePost) {
			dPaginate([])
		}
	}

	const paginate = async () => {
		setPaginating(true)
		page.current++
		if (tab.current == 0) {
			await dHandleFetchFollowingPosts(page.current);
		} else {
			await dHandleFetchPosts([page.current]);
		}
		setPaginating(false)
	}
	const dPaginate = useDebounce(paginate, 4)

	useEffect(() => {
		document.querySelector('#root > div')?.addEventListener('scroll', handleScroll)
		return () => { document.querySelector('#root > div')?.removeEventListener('scroll', handleScroll) }
	}, [])

	const isBookmarked = useCallback((mediaId: string) => {
		if (bookmarksData.length > 0)
			return bookmarksData?.find(e => e.mediaId === mediaId) ? true : false
		else
			return false;
	}, [])

	return (
		<div className={classNames(styles.root, className)}>
			<div className={styles.topBarDiv}>
				<TopBar />
			</div>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<div className={styles.sideNavDiv}>
						<SideNavBar selectedIndex={0} />
					</div>
					<div className={styles.suggestedActivityDiv}>
						<SuggestedActivity showActivity={true} showSuggestedContent={true} />
					</div>
				</div>
				<div className={styles.middleSectionDiv}>
					<ViewSwitchers
						className={styles.viewSwitchersDiv}
						onTabChange={async (i) => {
							setPostData([])
							page.current = 1
							tab.current = i
							if (onePost) {
								navigator({ pathname: '/home' }, { replace: true })
							}
							if (i === 0) {
								if (!isLoggedIn) {
									navigator('/auth')
								} else {
									await handleFetchFollowingPosts(); // Fetch following posts when "Following" tab is selected
								}
							} else {
								await handleFetchPosts();
							}
							// Handle other tab conditions here if needed
						}}
					/>
					{
						isLoggedIn
							?
							(
								postData.length > 0 && bookmarksData.length > 0 ?
									postData.map((p: PostType, i: number) => (
										<Post
											key={i}
											post={p}
											startedIds={startedIds}
											endedIds={endedIds}
											profileAvatar={profileData.avatar}
											isBookmarked={isBookmarked(p.mediaId)}
										/>
									))
									:
									<div className={styles.center}><h1>..</h1></div>
							)
							:
							(
								postData.length > 0 ?
									postData.map((p: PostType, i: number) => (
										<Post
											key={i}
											post={p}
											startedIds={startedIds}
											endedIds={endedIds}
											profileAvatar={profileData.avatar}
											isBookmarked={false}
										/>
									))
									:
									<div className={styles.center}><h1>..</h1></div>
							)
					}
					{
						paginating && postData.length > 0 &&
						(
							<div className={styles.paginationload}><h1>..</h1></div>
						)
					}
				</div>
			</div>
		</div>
	)
}