import IconButton from '@mui/material/IconButton/IconButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';
import { useAuthStore } from '../../store/authStore';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

export interface TermsAndConditionsPageProps {
    className?: string;
}

export const TermsAndConditionsPage = ({ className }: TermsAndConditionsPageProps) => {
    const { setIndex, setSettingsDropdown } = useAuthStore();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setIndex(4);
        setSettingsDropdown(true);
    };

    useEffect(() => {
        setIndex(9);
        setSettingsDropdown(true);
    }, []);

    const [darkTheme, setdarkTheme] = useState('');
    const { t, i18n } = useTranslation();
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);

        }
    });

    return (
        <Layout>
            <div className={styles.container}>
                <div className={` ${styles.middleSectionDiv}  ${darkTheme} `}>
                    <div className={`${styles.pageHeader} w-full p-3`}>
                        <IconButton
                            sx={{ margin: '0px', alignSelf: 'center', display: 'flex', gap: '1rem', justifyContent: 'start' }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                        <h4 className={darkTheme!==''?'text-white':'text-black'}>{t('termsAndConditionsPage.header.text')}</h4>
                        </IconButton>
                    </div>
                    <div className={styles.suggestedContent}>
                        <div className={styles.cards}>
                            <div>
                                <h4 className={darkTheme!==''?'text-white':'text-black'}>{t('termsAndConditionsPage.header.text')}</h4>
                            </div>
                            <div>
                                <p className={styles.paragraphsText}>
                                    {t('termsAndConditionsPage.lastupdated.text')}
                                </p>
                                <p className={styles.paragraphsText}>
                                    {t('termsAndConditionsPage.readterms.text')}
                                </p>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                    {t('termsAndConditionsPage.interpretation.text')}
                            </div>

                            <div>
                                    {t('termsAndConditionsPage.interpret.text')}
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                    {t('termsAndConditionsPage.wordspara.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6> {t('termsAndConditionsPage.definitionsHeader.text')}</h6> {/* Changed */}
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                    {t('termsAndConditionsPage.definitionsPurpose.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <ul>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.account.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.company.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.country.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.device.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.service.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.termsAndConditions.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.thirdPartySocialMediaService.text')} {/* Changed */}
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.website.text')}{' '}
                                                <a
                                                    href="http://www.Seezitt.com"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    http://www.Seezitt.com
                                                </a>
                                                .
                                            </p>
                                        </li>
                                        <li>
                                            <p className={styles.paragraphsText}>
                                                {t('termsAndConditionsPage.definition.you.text')} {/* Changed */}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h6> {t('termsAndConditionsPage.acknowledgmentHeader.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.acknowledgmentPara1.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.acknowledgmentPara2.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.acknowledgmentPara3.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.acknowledgmentPara4.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.acknowledgmentPara5.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.userAccountsHeader.text')} {/* Changed */}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.userAccountsPara1.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.userAccountsPara2.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.userAccountsPara3.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.userAccountsPara4.text')} {/* Changed */}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeader.text')} {/* Changed */}</h6>
                                <br/>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentPara1.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.contentPara2.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                      {t('termsAndConditionsPage.contentPara3.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.contentPara4.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading1.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph1.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph2.text')}
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph3.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        {t('termsAndConditionsPage.paragraph4.text')}
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        {t('termsAndConditionsPage.paragraph5.text')}
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph6.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph7.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph8.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph9.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph10.text')}
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph11.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading2.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph12.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph13.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph14.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph15.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading3.text')}</h6>
                                <br/>
                            </div>
                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading4.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph16.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph17.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                       {t('termsAndConditionsPage.paragraph18.text')}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h6>
                                    {' '}
                                    {t('termsAndConditionsPage.contentHeading5.text')}
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        {t('termsAndConditionsPage.paragraph19.text')}
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    {' '}
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        {t('termsAndConditionsPage.paragraph20.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        {t('termsAndConditionsPage.paragraph21.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph22.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph23.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph24.text')}
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph25.text')}
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph26.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading6.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph27.text')}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph28.text')}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph29.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading7.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph30.text')}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph31.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading8.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph32.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph33.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph34.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading9.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph35.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph36.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph37.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading10.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph38.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading11.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph39.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading12.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph40.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading13.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph41.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading14.text')}</h6>
                                <br/>
                            </div>
                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading15.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph42.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading16.text')}</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph43.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading17.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph44.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading18.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph45.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph46.text')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>{t('termsAndConditionsPage.contentHeading19.text')}</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph47.text')}
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {t('termsAndConditionsPage.paragraph48.text')} info@SeezItt.com
                                    </p>
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TermsAndConditionsPage;