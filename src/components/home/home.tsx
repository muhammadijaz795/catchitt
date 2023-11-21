import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Post } from '../post/post';
import { BookmarkItem, Post as PostType } from '../post/postTypes';
import { fetchInJSON } from '../reusables/fetchInJSON';
import useDebounce from '../reusables/useDebounce';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import styles from './home.module.scss';
import searchIcon from '../../assets/Search.svg'
import muteIcon from '../../assets/muteIcon.svg'
export interface HomeProps {
	className?: string;
}

export const Home = ({ className }: HomeProps) => {
	let avatarUrl = '';
	const { onePost } = useParams()
	const navigator = useNavigate()
	const API_KEY = process.env.VITE_API_URL;

	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const { selectedTab, setTab } = useAuthStore();

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
	console.log("page", token)

	useEffect(() => {
		if (onePost || location.pathname !== '/home')
			handleFetchOnePost(onePost as string)
		else
			dHandleFetchPosts([]);
		dHandleFetchUserBookmarks([]);
		handleFetchProfileInfo();
	}, []);

	const handleFetchPosts = useCallback(async (page?: number) => {
		try {
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
			console.log(res, "res1212");
			if (page != 1)
				setPostData((prev: []) => [...prev, ...res.data]);
			else
				setPostData([...res.data]);
		} catch (error) {
			console.log(error);
		}

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
			`/profile/collection?page=1`,
			{
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			},
			(res: any) => {
				setBookmarksData(res.data.data as BookmarkItem[]);
				console.log('bookmarks ftch', res);
			}
		);
	}, []);
	const dHandleFetchUserBookmarks = useDebounce(handleFetchUserBookmarks)

	const handleFetchFollowingPosts = async (page = 1) => {
		if (onePost) {
			setPostData([]);
		}

		if (!isLoggedIn) {
			navigator('/suggestedAccounts');
		} else {
			const response = await fetch(
				`${API_KEY}${endPoint}/?page=${page}&followingsuggestions=1`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.ok) {
				try {
					const responseData = await response.json();

					if (Array.isArray(responseData.data)) {
						if (page !== 1) {
							setPostData((prev: any) => [...prev, ...responseData.data]);
						} else {
							setPostData([...responseData.data]);
						}
					} else {
						// Handle the case where responseData.data is not an array
						console.error('Received non-iterable data:', responseData.data);
						// You can setPostData to an empty array or handle it differently based on your needs.
						setPostData([]);
					}
				} catch (error) {
					console.error('Error parsing JSON response:', error);
					// Handle JSON parsing error, e.g., setPostData to an empty array or show an error message.
					setPostData([]);
				}
			} else {
				// Handle non-OK response, e.g., show an error message or retry the request.
				console.error('Non-OK response:', response.status);
				// Handle the error as needed.
			}
		}
	};

	const dHandleFetchFollowingPosts = useDebounce(handleFetchFollowingPosts);


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
	//infinite scroll
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
	////////////////////////////////////////// end of infinite scroll 
	const isBookmarked = useCallback((mediaId: string) => {
		if (bookmarksData.length > 0)
			return bookmarksData?.find(e => e.mediaId === mediaId) ? true : false
		else
			return false;
	}, [])
	const containerRef = useRef(null);
	const mobileTabs:string[] = [
        'Following',
        'Suggested',
        'Live',
    ]
    const [activeMobileTab, setActiveMobileTab] = useState<string>(mobileTabs[0])

	return (
		<div className={classNames(styles.root, className)}>
			<div className={styles.webView}>
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
							selectedIndex={selectedTab}
							className={styles.viewSwitchersDiv}
							onTabChange={async (selectedTab) => {
								setPostData([])
								page.current = 1
								setTab(selectedTab)
								tab.current = selectedTab
								if (onePost) {
									navigator({ pathname: '/home' }, { replace: true })
								}
								if (selectedTab === 0) {
									if (!isLoggedIn) {
										// navigator('/auth')
										navigator({ pathname: '/suggested-accounts' }, { replace: true })
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
										<div className={styles.center}><h6>Loading...</h6></div>
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
										<div className={styles.center}><h6>Loading..</h6></div>
								)
						}
						{
							paginating && postData.length > 0 &&
							(
								<div className={styles.paginationload}><h6>Loading...</h6></div>
							)
						}
					</div>
				</div>
			</div>
			<div className={styles.mobileView}>
				<div className={styles.postHeader}>
					<div className={styles.tabs}>
						{
							mobileTabs.map((item: string) => (
								<p
									style={{ color: activeMobileTab === item ? '#FFFFFF' : '#C1C6D0' }}
									key={item} onClick={() => setActiveMobileTab(item)} className={styles.tab}>{item}</p>
							))
						}
					</div>
					<div className={styles.tabIcons}>
						<img src={searchIcon} alt='Search' />
						<img src={muteIcon} alt='Search' />
					</div>
				</div>
				{
					isLoggedIn
						?
						(
							postData.length > 0 && bookmarksData.length > 0 ?
								<div className={styles.containerA}>
									{
										postData.map((p: PostType, i: number) => (
											<div className={styles.section}>
												<Post
													key={i}
													post={p}
													startedIds={startedIds}
													endedIds={endedIds}
													profileAvatar={profileData.avatar}
													isBookmarked={isBookmarked(p.mediaId)}
												/>
											</div>
										))
									}
								</div>
								:
								<div className={styles.center}><h6>Loading...</h6></div>
						)
						:
						(
							postData.length > 0 ?
								<div className={styles.containerA}>
									{
										postData.map((p: PostType, i: number) => (
											<div className={styles.section}>
												<Post
													key={i}
													post={p}
													startedIds={startedIds}
													endedIds={endedIds}
													profileAvatar={profileData.avatar}
													isBookmarked={isBookmarked(p.mediaId)}
												/>
											</div>

										))
									}
								</div>
								:
								<div className={styles.center}><h6>Loading..</h6></div>
						)
				}
				{
							paginating && postData.length > 0 &&
							(
								<div className={styles.paginationload}><h6>Loading...</h6></div>
							)
						}
			</div>
		</div >
	)
}