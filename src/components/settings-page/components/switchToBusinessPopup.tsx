import classNames from 'classnames';
import styles from './switchToBusinessPopup.module.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal } from '@mui/material';
import InputField from '../../reusables/InputField';
import LeftArrow from '../svg-components/LeftArrow.svg';
import businessAccountIcon from '../svg-components/businessAccountIcon.png';
import congratsIcon from '../svg-components/congratsIcon.svg';
import firstParagraphIcon from '../svg-components/firstParagraphIcon.svg';
import fourthParagraphIcon from '../svg-components/fourthParagraphIcon.svg';
import secondParagraphIcon from '../svg-components/secondParagraphIcon.svg';
import thirdParagraphIcon from '../svg-components/thirdParagraphIcon.svg';
import { useDispatch } from 'react-redux';
import { updateProfileType } from '../../../redux/reducers/auth';

export interface SwitchToBusinessPopupProps {
    className?: string;
    onSubmit?: any;
    handleOpen?: any;
    handleClose?: any;
}

interface User {
    email: string;
    password: string;
}

const defaultUser: User = {
    email: '',
    password: '',
};

interface Category {
    _id: string;
    createdTime: number;
    lastModifiedTime: number;
    isDeleted: boolean;
    name: string;
    isActive: boolean;
    __v: number;
    icon: string;
}

export const SwitchToBusinessPopup = ({
    className,
    onSubmit,
    handleOpen,
    handleClose,
}: SwitchToBusinessPopupProps) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const email = useAuthStore((state) => state.email);
    const accountType = useAuthStore((state) => state.accountType);

    const [user, setUser] = useState(defaultUser);

    const [firstModalVisible, setFirstModalVisible] = useState(true);
    const [openContentPrefModal, setOpenContentPrefModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [openConfirmationLastModal, setOpenConfirmationLastModal] = useState(false);

    const [currentAccountType, setCurrentAccountType] = useState(accountType);

    const [categoriesData, setCategoriesData] = useState<any>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [profileDataCopy, setProfileDataCopy] = useState<any>([]);

    const MAX_CHOICES = 5;

    const API_KEY = process.env.VITE_API_URL;

    const navigate = useNavigate();

    const onUserChange = <P extends keyof User>(prop: P, value: User[P]) => {
        setUser({ ...user, [prop]: value });
    };

    const handleOpenConfirmationFirstModal = () => {
        setFirstModalVisible(false);
        setOpenContentPrefModal(false);
        setOpenConfirmationModal(true);
    };

    const handleOpenContentPrefModal = () => {
        setFirstModalVisible(false);
        setOpenContentPrefModal(true);
    };

    const handleGoBackTofirstModal = () => {
        setFirstModalVisible(true);
        setOpenConfirmationModal(false);
    };

    const handleCloseContentPrefModal = () => {
        setOpenContentPrefModal(false);
        setSelectedCategories([]);
    };

    const handleCloseConfirmationFirstModal = () => {
        setOpenConfirmationModal(false);
        handleClose();
    };

    const handleOpenConfirmationLastModal = () => {
        setOpenConfirmationModal(false);
        setOpenConfirmationLastModal(true);
    };

    const handleCloseConfirmationLastModal = () => {
        setOpenConfirmationLastModal(false);
        handleClose();
    };

    const handleCheckboxChange = async (category: Category) => {
        if (selectedCategories.includes(category._id)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== category._id));
        } else {
            if (selectedCategories.length > MAX_CHOICES + 1) {
            } else {
                setSelectedCategories([...selectedCategories, category._id]);
            }
        }
    };

    const handleFetchCategoriesNames = async () => {
        try {
            const response = await fetch(`${API_KEY}/media-content/categories`, {
                method: 'GET',
                headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const myData = await response.json();
            setCategoriesData([...myData.data]);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }
    };

    const handleSwitchToBusiness = async (event: React.FormEvent, userEmail?: string | any) => {
        event.preventDefault();
        const categoryIds = selectedCategories.map((category) => category).join(',');
        const payload = categoryIds;

        try {
            const response = await fetch(`${API_KEY}/profile/`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    accountType: 'Business',
                    contactEmail: userEmail,
                    businessCategory: payload,
                }),
            });
            if (response.ok) {
                const responseData = await response.json();
                setCurrentAccountType('Business');
                dispatch(updateProfileType({ type: 'Business' }));
                useAuthStore.setState({
                    accountType: accountType,
                });
                handleOpenConfirmationLastModal();
                // handleCloseModal()
            } else {
                await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isChecked = (category: any) => {
        if (profileDataCopy.includes(category.name)) {
            // Set selected categories only if not already set
            setSelectedCategories([...selectedCategories, category._id]);
            setProfileDataCopy(profileDataCopy.filter((e: any) => e !== category.name));
        }
        // Check if the category is initially checked or currently checked
        return selectedCategories.includes(category._id);
    };

    const handleCloseModal = () => {
        setFirstModalVisible(false);
        handleClose();
    };

    useEffect(() => {}, [currentAccountType]);

    useEffect(() => {
        handleFetchCategoriesNames();
    }, []);

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                {firstModalVisible && (
                    <>
                        <div className={styles.frame}>
                            <div className={styles.contentPrefHeader}>
                                <div
                                    style={{ width: '130px', height: '120px', marginBottom: '5px' }}
                                >
                                    <img src={businessAccountIcon} alt="" />
                                </div>
                                <h4 className={styles.contentPrefModalHeader}>Business</h4>
                                <p className={styles.blueText}>Switch to Business account</p>
                            </div>
                            <div className={styles.cardsDiv}>
                                <div className={styles.cardDiv}>
                                    <img src={firstParagraphIcon} alt="" />
                                    <div className={styles.textDiv}>
                                        <p className={styles.paragraphTitle}>
                                            Learn about your customers
                                        </p>
                                        <p className={styles.paragraphText}>
                                            Get insights on video performance and engagement to help
                                            you create content that converts.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.cardDiv}>
                                    <img src={secondParagraphIcon} alt="" />
                                    <div className={styles.textDiv}>
                                        <p className={styles.paragraphTitle}>
                                            Use royalty-free sounds
                                        </p>
                                        <p className={styles.paragraphText}>
                                            Choose from royalty-free music and sounds available to
                                            brands for commercial purposes .{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.cardDiv}>
                                    <img src={thirdParagraphIcon} alt="" />
                                    <div className={styles.textDiv}>
                                        <p className={styles.paragraphTitle}>Get inspired</p>
                                        <p className={styles.paragraphText}>
                                            Get guidance and inspiration for your content in our
                                            Business Creative Hub .{' '}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.cardDiv}>
                                    <img src={fourthParagraphIcon} alt="" />
                                    <div className={styles.textDiv}>
                                        <p className={styles.paragraphTitle}>
                                            Access Business Suit tools
                                        </p>
                                        <p className={styles.paragraphText}>
                                            Manage your business on Seezltt with post scheduler ,
                                            Auto-messaging ,and more features coming soon !{' '}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    sx={mainModalBtnstyle}
                                    variant="contained"
                                    onClick={handleOpenContentPrefModal}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className={styles.submitDiv} />
                    </>
                )}
                {openContentPrefModal && (
                    <>
                        <Modal
                            open={openContentPrefModal}
                            onClose={handleCloseContentPrefModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={contentPrefModalStyle}>
                                <div className={styles.contentPrefHeader}>
                                    <h4 className={styles.contentPrefModalHeader}>
                                        Business Category
                                    </h4>
                                    <p className={styles.blueText}>Choose Category</p>
                                    <p className={styles.greyText}>
                                        Select the category that best describes your account. This
                                        category won’t be displayed publicly.
                                    </p>
                                </div>
                                <div className={styles.formCards}>
                                    <FormGroup
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {categoriesData.map((category: any) => {
                                            return (
                                                <div className={styles.formCard}>
                                                    <FormControlLabel
                                                        sx={{
                                                            marginRight: 0,
                                                            marginLeft: 0,
                                                        }}
                                                        label={undefined}
                                                        labelPlacement="start"
                                                        onChange={() =>
                                                            handleCheckboxChange(category)
                                                        }
                                                        control={
                                                            <Checkbox
                                                                checked={isChecked(category)}
                                                                sx={{
                                                                    '&.Mui-checked': {
                                                                        color: 'rgb(255, 59, 92)',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                    />
                                                    <img
                                                        src={category.icon}
                                                        alt=""
                                                        style={{ marginRight: '12px' }}
                                                    />
                                                    <p>{category.name}</p>
                                                </div>
                                            );
                                        })}
                                        <Button
                                            variant="contained"
                                            sx={mainModalBtnstyle}
                                            onClick={handleOpenConfirmationFirstModal}
                                            // disabled={notAcceptable}
                                        >
                                            Next
                                        </Button>
                                    </FormGroup>
                                </div>
                            </Box>
                        </Modal>
                    </>
                )}
                {openConfirmationModal && (
                    <>
                        <Modal
                            open={openConfirmationModal}
                            onClose={handleCloseConfirmationFirstModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={mainModalstyle}>
                                <div className={styles.frame}>
                                    <div className={styles.contentPrefHeaderConfirmationModal}>
                                        <div
                                            className={styles.leftArrowImg}
                                            onClick={handleGoBackTofirstModal}
                                        >
                                            <img src={LeftArrow} alt="" />
                                        </div>
                                        <div className={styles.headerTextDiv}>
                                            <h4 className={styles.contentPrefModalHeader}>
                                                Business Email
                                            </h4>
                                            <p className={styles.blueText}>Add your Email</p>
                                            <p
                                                className={styles.greyText}
                                                style={{ width: '380px' }}
                                            >
                                                Add an email to your profile to connect with your
                                                customers directly . You can always change this
                                                later.{' '}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '24px', width: '100%' }}>
                                        <InputField
                                            placeholder="Email address"
                                            type="email"
                                            value={user.email}
                                            onChange={(e: { target: { value: string } }) => {
                                                onUserChange('email', e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.btnsDiv}>
                                    <Button
                                        variant="contained"
                                        sx={mainModalBtnstyle}
                                        onClick={(e: React.FormEvent) =>
                                            handleSwitchToBusiness(e, user.email)
                                        }
                                    >
                                        Next
                                    </Button>
                                    <button
                                        type="reset"
                                        className={styles.cancelBtn}
                                        onClick={handleClose}
                                    >
                                        Skip
                                    </button>
                                </div>
                            </Box>
                        </Modal>
                    </>
                )}
                {openConfirmationLastModal && (
                    <>
                        <Modal
                            open={openConfirmationLastModal}
                            onClose={handleCloseConfirmationLastModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={lastConfirmationModalstyle}>
                                <div className={styles.frame} style={{ marginBottom: '0' }}>
                                    <div
                                        className={styles.finalDeleteConfirmationDiv}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <h4>Business profile created</h4>
                                        <img
                                            src={congratsIcon}
                                            alt=""
                                            style={{ marginTop: '32px' }}
                                        />
                                    </div>
                                    <div>
                                        <h1 className={styles.boldText}>You’re all set</h1>
                                        <p className={styles.blackText}>
                                            Now you can access more tools to better connect with
                                            your customers and grow your business.
                                        </p>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

var mainModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 526,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
};

var mainModalBtnstyle = {
    fontFamily: 'Poppins !important',
    display: 'flex !important',
    width: '478px !important',
    height: '48px !important',
    padding: '0 16px !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    borderRadius: '6px !important',
    background: 'var(--foundation-primary-primary-500, rgb(255, 59, 92)) !important',
    textTransform: 'none !important',
};

var contentPrefModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 526,
    height: 'auto',
    maxHeight: 815,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0px',
    overflowY: 'auto',
    overflowX: 'hidden',
};

var contentPrefModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 526,
    height: 'auto',
    maxHeight: 815,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0px',
    overflowY: 'auto',
    overflowX: 'hidden',
};

var lastConfirmationModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 433,
    height: 'auto',
    minHeight: 259,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 0,
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'center',
};
