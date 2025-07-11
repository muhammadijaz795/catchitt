import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import IconButton from '@mui/material/IconButton/IconButton';
import Layout from '../../shared/layout';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

export interface CommunityPageProps {
    className?: string;
}

export const CommunityPage = ({ className }: CommunityPageProps) => {
    const { setIndex, setSettingsDropdown } = useAuthStore();
    const navigate = useNavigate();
    const { t: translate } = useTranslation();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setIndex(4);
        setSettingsDropdown(true);
    };

    useEffect(() => {
        setIndex(7);
        setSettingsDropdown(true);
    }, []);

    const [darkTheme, setdarkTheme] = useState('');
    useEffect(() => {
        var themeColor = window.localStorage.getItem('theme');
        if (themeColor == 'dark') {
            setdarkTheme(styles.darkTheme);

        }
    });

    return (
        <Layout>
            <div className={styles.container}>
                <div className={` ${styles.middleSectionDiv} ${darkTheme} `}>
                    <div className={`${styles.pageHeader} w-full p-3`}>
                        <IconButton
                            sx={{ margin: '0px', alignSelf: 'center', display: 'flex', gap: '1rem', justifyContent: 'start' }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                        <h4 className={darkTheme!==''?'text-white':'text-black'}>{translate('Community guidelines')}</h4>
                        </IconButton>
                    </div>
                    <div className={` ${styles.suggestedContent} `}>
                        <div className={styles.cards}>
                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Introduction')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>{translate('CommunityGuidelinesIntroductionText')}</p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Minor safety')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>{translate('MinorSafetyText')}</p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Sexual exploitation of minors')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('SexualExploitationOfMinorsText')}
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>{translate('Content that shares, reshares, offers to trade or sell, or directs users off platform to obtain or distribute CSAM')}</li>
                                        <li>{translate('Content that engages with minors in a sexualized way, or otherwise sexualizes a minor (e.g., via product features like duets)')}</li>
                                        <li>{translate('Content that depicts, solicits, glorifies, or encourages child abuse imagery including nudity, sexualized minors, or sexual activity with minors')}</li>
                                        <li>{translate('Content that depicts, promotes, normalizes, or glorifies paedophilia or the sexual assault of a minor')}</li>
                                        <li>{translate('Content that re-victimized or capitalizes on minor victims of abuse by third party reshares or re-enactments of assault or confessions')}</li>
                                    </ul>
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Grooming behavior')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('GroomingBehaviorText')}
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>{translate('Grooming advances')}</li>
                                        <li>{translate('Content that depicts, promotes, normalizes, or glorifies grooming behaviors')}</li>
                                        <li>{translate('Content that solicits real-world contact between a minor and an adult or between minors with a significant age difference')}</li>
                                        <li>{translate('Content that displays or offers nudity to minors')}</li>
                                        <li>{translate('Content that solicits minors to connect with an adult on another platform, website, or other digital space')}</li>
                                        <li>{translate('Any solicitation of nude imagery or sexual contact, through blackmail or other means of coercion')}</li>
                                    </ul>
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Nudity and sexual activity involving minors')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('Nudity and sexual activity involving minors include content that is overtly revealing of breasts, genitals, anus, or buttocks, or behaviors that mimic, imply, or display sex acts involving minors. We do not allow the depiction, including digitally created or manipulated content, of nudity or sexual activity.')}
                                    <ul style={{ listStyleType: 'disc' }}>
                                        <li>{translate('Content that depicts or implies minor sexual activities including penetrative and non-penetrative sex, oral sex, or intimate kissing')}</li>
                                        <li>{translate('Content that depicts sexual arousal or sexual stimulation involving a minor')}</li>
                                        <li>{translate('Content that depicts a sexual fetish involving a minor')}</li>
                                        <li>{translate('Content that depicts exposed genitals, buttocks, the pubic region, or female nipples of a minor')}</li>
                                        <li>{translate('Content that contains sexually explicit language depicting or describing a minor')}</li>
                                        <li>{translate('Content depicting a minor that contains sexually explicit song lyrics')}</li>
                                        <li>{translate('Content with sexually explicit dancing of a minor, including twerking, breast shaking, pelvic thrusting, or fondling the groin or breasts of oneself or another')}</li>
                                        <li>{translate('Content depicting a minor undressing')}</li>
                                        <li>{translate('Content depicting a minor in minimal clothing that is not situationally relevant to the location')}</li>
                                        <li>{translate('Sexualized comments, emojis, text, or other graphics used to veil or imply nudity or sexual activity of a minor')}</li>
                                    </ul>
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Harmful activities by minors')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('HarmfulActivitiesByMinorsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Physical and psychological harm of minors')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('PhysicalAndPsychologicalHarmOfMinorsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Crimes against children')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('CrimesAgainstChildrenText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Dangerous acts and challenges')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('DangerousActsAndChallenges') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Suicide, self-harm, and disordered eating')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('SuicideSelf-harmAndDisorderedEatingText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Suicide and self-harm')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('SuicideAndSelf-harmText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Disordered eating')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('DisorderedEatingText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Adult nudity and sexual activities')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('AdultNudityAndSexualActivitiesText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Sexual exploitation')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('SexualExploitationText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Nudity and sexual activity involving adults')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('NudityAndSexualActivityInvolvingAdultsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Bullying and harassment')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('BullyingAndHarassmentText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Abusive behavior')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('AbusiveBehaviorText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Sexual harassment')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('SexualHarassmentText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Threats of hacking and blackmail')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('ThreatsOfHackingAndBlackmailText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Hateful behavior')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('HatefulBehaviorText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Attacks and slurs on the basis of protected attributes')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('AttacksAndSlursOnTheBasisOfProtectedAttributesText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Hateful ideology')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('HatefulIdeologyText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Violent extremism')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('ViolentExtremismText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Threats and incitement to violence')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('ThreatsAndIncitementToViolenceText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Violent extremist organizations and individuals')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('ViolentExtremistOrganizationsAndIndividualsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Terrorist organizations')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('TerroristOrganizationsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Organized hate groups')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('OrganizedHateGroupsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Criminal organizations')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('CriminalOrganizationsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Integrity and authenticity')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('IntegrityAndAuthenticityText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Spam and fake engagement')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('SpamAndFakeEngagementText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Impersonation')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('ImpersonationText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Harmful misinformation')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('HarmfulMisinformationText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Illegal activities and regulated goods')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('IllegalActivitiesAndRegulatedGoodsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Criminal activities')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('CriminalActivitiesText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Weapons')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('WeaponsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Drugs, controlled substances, alcohol, and tobacco')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('DrugsControlledSubstancesAlcoholAndTobaccoText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Frauds and scams')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('FraudsAndScamsText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Gambling')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('GamblingText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>
                                        {translate('Privacy, personal data, and personally identifiable information (PII)')}
                                    </h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('PrivacyPersonalDataAndPIIText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Violent and graphic content')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('ViolentAndGraphicContentText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Copyright and trademark infringement')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('CopyrightAndTrademarkInfringement') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Platform security')}</h6>
                                </div>
                                <p className={styles.paragraphsText} dangerouslySetInnerHTML={{ __html: translate('PlatformSecurityText') }}></p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Ineligible for the For You feed')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('IneligibleForTheForYouFeedText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Dangerous stunts and sports')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('DangerousStuntsAndSportsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Overly sexualized content')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('OverlySexualizedContentText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Tobacco and alcohol products')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('TobaccoAndAlcoholProductsText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Spam, inauthentic, or misleading content')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('SpamInauthenticOrMisleadingContentText')}
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>{translate('Unoriginal, low-quality, and QR code content')}</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    {translate('UnoriginalLow-qualityAndQRCodeContentText')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CommunityPage;
