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

export const Home = memo(({ className }: HomeProps) => {
	let avatarUrl = '';
	const { onePost } = useParams()
	const navigator = useNavigate()

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const [paginating, setPaginating] = useState(false)
	const [postData, setPostData] = useState<any>([]);
	const [bookmarksData, setBookmarksData] = useState<BookmarkItem[]>([]);
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
			handleFetchPosts();
		handleFetchUserBookmarks();
		handleFetchProfileInfo();
	}, []);



	const handleFetchPosts = useCallback(async (page?: number) => {
		if (onePost) {
			setPostData([])
		}
		if (isLoggedIn) {
			const res = await fetchInJSON(
				`${endPoint}/?page=${page ? page : 1}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (page != 1)
				setPostData((prev: []) => [...prev, ...res.data]);
			else
				setPostData([...res.data]);
		} else {
			const res = await fetchInJSON(
				`/media-content/public/videos/feed/?page=${page ? page : 1}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (page != 1)
				setPostData((prev: []) => [...prev, ...res.data]);
			else
				setPostData([...res.data]);
		}
		// if (page != 1)
		// 	setPostData((prev: []) => [...prev, ...res.data]);
		// else
		// 	setPostData([...res.data]);

	}, []);

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
		await fetchInJSON(
			`/profile/collection`,
			{
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			},
			(res: any) => {
				setBookmarksData(res.data.data as BookmarkItem[]);

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

	const handleFetchProfileInfo = useCallback(async () => {
		try {
			const response = await fetchInJSON(`/profile`, {
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			});

			if (response.ok) {
				const responseData = await response.json();
				const { avatar } = responseData.data; // Extract token value from data object
				avatarUrl = avatar;
			} else {
				console.log(response);
			}
		} catch (error) {
			console.error(error);
		}
	}, [])

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
			await handleFetchFollowingPosts(page.current);
		} else {
			await handleFetchPosts(page.current);
		}
		setPaginating(false)
	}
	const dPaginate = useDebounce(paginate, 4)

	useEffect(() => {
		document.querySelector('#root > div')?.addEventListener('scroll', handleScroll)
		return () => { document.querySelector('#root > div')?.removeEventListener('scroll', handleScroll) }
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
						postData.length > 0 ?
							postData.map((p: PostType, i: number) => (
								<Post
									key={i}
									post={p}
									startedIds={startedIds}
									endedIds={endedIds}
									avatar={avatarUrl}
									refetchBookmarks={dHandleFetchUserBookmarks}
									isBookmarked={bookmarksData.find(e => e.mediaId == p.mediaId) ? true : false}
								/>
							))
							:
							<div className={styles.center}><h1>..</h1></div>
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
	);
}, (prev, next) => prev.className == next.className);
