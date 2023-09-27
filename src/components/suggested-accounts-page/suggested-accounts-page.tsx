import classNames from 'classnames';
import { memo, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import useDebounce from '../reusables/useDebounce';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';
import styles from './suggested-accounts-page.module.scss';
// import { DefaultAvatar } from './svg-components/DefaultAvatar';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../assets/defaultProfileIcon.png';
import { ViewSwitchers } from '../view-switchers/view-switchers';
import { LeftArrow } from './svg-components/LeftArrow';

export interface SuggestedAccountsPageProps {
	className?: string;
}

interface Account {
	_id: string;
	avatar: string;
	name: string;
}

export const SuggestedAccountsPage = ({ className }: SuggestedAccountsPageProps) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const token = useAuthStore((state) => state.token);
	const navigator = useNavigate()
	const { selectedTab, setTab } = useAuthStore();

	const [errorMessage, setErrorMessage] = useState('');
	const [accountsData, setAccountsData] = useState<Account[]>([]);
	const page = useRef(1)
	const done = useRef(false)
	const tab = useRef(1);
	const API_KEY = process.env.VITE_API_URL;
	const suggestedEndPoint = '/profile/suggested-users';
	const publicSuggestedEndPoint = '/profile/public/suggested-users';

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate('/home'); // Navigate back to the previous page
	};

	const removeDuplicates = (arr: any[]) => {
		let all = [...accountsData, ...arr]
		let onlyids = all.map(e => e._id)
		let unique = Array.from(new Set(onlyids))
		let sanitized = unique.map(e => all.find(c => e == c._id))
		console.log("only got those: ", sanitized.length)
	}

	const handleFetchSuggestedAccounts = async () => {
		if (done.current) {
			return
		}
		const link = isLoggedIn ? `${API_KEY}${suggestedEndPoint}?page=${page.current}` :
			`${API_KEY}${publicSuggestedEndPoint}?page=${page.current}`
		try {

			const response = await fetch(link, {
				method: 'GET',
				headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
			});

			if (response.ok) {
				const responseData = await response.json();
				// if (responseData.data.data.length == 0) {
				// 	done.current = true
				// 	return
				// }
				page.current++

				removeDuplicates([...responseData.data.data])
				setAccountsData(prev => {
					let all = [...prev, ...responseData.data.data]
					let onlyids = all.map(e => e._id)
					let unique = Array.from(new Set(onlyids))
					let sanitized = unique.map(e => all.find(c => e == c._id))
					return [...sanitized]
				});
			} else {
				const errorResponseData = await response.json();
				const errorMessageFromServer = errorResponseData.message; // Assuming the error message is returned in a 'message' field
				setErrorMessage(errorMessageFromServer);
			}
		} catch (error) {
			// console.error(error);
			console.log(errorMessage);
		}
	};
	const dHandleFetchSuggestedAccounts = useDebounce(handleFetchSuggestedAccounts)

	if (accountsData.length <= 10) {
		dHandleFetchSuggestedAccounts([])
	}

	const handleBottomPage = (e: any) => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.querySelector('#root > div')?.scrollHeight as number;
		const scrollPosition = e.target.scrollTop;
		const threshold = 10;

		if ((windowHeight + scrollPosition >= documentHeight - threshold)) {
			dHandleFetchSuggestedAccounts([])
		}
	}

	useEffect(() => {
		document.body.children[0].children[0].addEventListener('scroll', handleBottomPage)
		return () => { document.body.children[0].children[0].removeEventListener('scroll', handleBottomPage) }
	}, [])

	useEffect(() => {
		page.current = 1
		done.current = false
		dHandleFetchSuggestedAccounts([]);
	}, []);

	// if (!isLoggedIn) {
	// 	return <Navigate to="/auth" />;
	// }

	console.log("accounts", accountsData.length)

	const SuggestedAccount = memo(({ account }: { account: Account }) => {

		const [isFollowed, setIsFollowed] = useState(false)
		const [followLoading, setFollowLoading] = useState(false)

		const handleFollowClick = async (account: Account) => {
			if (!isLoggedIn) { navigator('/auth') }
			try {
				setFollowLoading(true); // Set loading state before API call
				const res = await fetch(`${API_KEY}/profile/follow/${account._id}/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.ok) {
					setIsFollowed(!isFollowed)
				}
			} catch (error) {
				// Handle error as needed
			} finally {
				// await handleFetchSuggestedAccounts();
				setFollowLoading(false); // Set loading state back to false after API call
			}
		};

		const handleFollowBtnClicked = async (
			event: React.MouseEvent<HTMLElement>,
			account: Account
		) => {
			console.log("followed", account._id)
			await handleFollowClick(account);
		};

		return (
			<div key={account._id} className={styles.accountCardDiv}>
				<div className={styles.userInfoFrame}>
					{account.avatar === '' ? (
						<img
							src={defaultProfileIcon}
							alt={account.name}
							className={styles.avatarImgCircle}
						/>
					) : (
						<img
							src={account.avatar}
							alt={account.name}
							className={styles.avatarImgCircle}
						/>
					)}
					<h4 className={styles.userNameText}>{account.name}</h4>
				</div>
				<div className={styles.followBtnDiv}>
					<button
						className={
							isFollowed ? styles.followBtn : styles.followingBtn
						}
						onClick={(event) => handleFollowBtnClicked(event, account)}
					>
						{
							followLoading
								? '...'
								:
								isFollowed
									? 'Followed'
									: 'Follow'
						}
					</button>
				</div>
			</div>
		)
	}, (prev, next) => prev.account._id == next.account._id)

	return (
		<div className={classNames(styles.root, className)}>
			<div className={styles.topBarDiv}>
				<TopBar />
			</div>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<div className={styles.sideNavDiv}>
						<SideNavBar selectedIndex={null} />
					</div>
					<div className={styles.suggestedActivityDiv}>
						<SuggestedActivity showActivity={true} />
					</div>
				</div>
				<div className={styles.middleSectionDiv}>
					{!isLoggedIn ? <div className={styles.viewSwitchersDiv}>
						<ViewSwitchers selectedIndex={selectedTab} onTabChange={async (selectedTab) => {
							page.current = 1
							tab.current = selectedTab
							setTab(selectedTab)
							if (selectedTab === 1) {
								navigator({ pathname: '/home' }, { replace: true })
							}
						}} />
					</div> :
						<div className={styles.pageHeader}>
							<IconButton sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
								onClick={handleGoBack}
							>
								<LeftArrow />
							</IconButton>
							<h4>Suggested accounts</h4>
						</div>
					}

					<div className={styles.gridContainer}>
						{accountsData.map((account, i) => (
							<SuggestedAccount key={i} account={account} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
