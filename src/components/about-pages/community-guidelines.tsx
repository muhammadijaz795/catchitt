import { useEffect } from 'react';

import classNames from 'classnames';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';

import IconButton from '@mui/material/IconButton/IconButton';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import styles from './styles.module.scss';
import Layout from '../../shared/layout';

export interface CommunityPageProps {
    className?: string;
}

export const CommunityPage = ({ className }: CommunityPageProps) => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setIndex(4);
        setSettingsDropdown(true);
    };

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    useEffect(() => {
        setIndex(7);
        setSettingsDropdown(true);
    }, []);

    return (
        // <div className={classNames(styles.root, className)}>
        <Layout>
            {/* <div className={styles.topBarDiv}>
                <TopBar />
            </div> */}
            <div className={styles.container}>
                {/* <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div> */}
                <div className={styles.middleSectionDiv}>
                    <div className={styles.pageHeader}>
                        <IconButton
                            sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                        </IconButton>
                        <h4>Community guidelines</h4>
                    </div>
                    <div className={styles.suggestedContent}>
                        <div className={styles.cards}>
                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Introduction</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Seezitt's mission is to inspire creativity and bring joy. We are
                                    building a global community where people can create and share,
                                    discover the world around them, and connect with others across
                                    the world. We are committed to maintaining a supportive
                                    environment for our growing community. Our Community Guidelines
                                    establish a set of norms and common code of conduct that provide
                                    for a safe and welcoming space for everyone. At Seezitt, we
                                    prioritize safety, diversity, inclusion, and authenticity. We
                                    encourage creators to celebrate what makes them unique and
                                    viewers to engage with what inspires them; we believe that a
                                    safe environment helps everyone do so openly. We prize the
                                    global nature of our community and strive to take into account
                                    the breadth of cultural norms where we operate. We also aim to
                                    cultivate an environment for genuine interactions by encouraging
                                    authentic content on Seezitt. Our Community Guidelines apply to
                                    everyone and everything on Seezitt. We proactively enforce them
                                    using a mix of technology and human moderation and aim to do so
                                    before people report potentially violative content to us. We
                                    also encourage our community members to use the tools we provide
                                    on Seezitt to report any content or account they believe
                                    violates our Community Guidelines. We will remove any content –
                                    including video, audio, livestream, images, comments, links, or
                                    other text – that violates our Community Guidelines. Individuals
                                    are notified of our decisions and can appeal them if they
                                    believe no violation has occurred. We will temporarily or
                                    permanently ban accounts and/or users that are involved in
                                    severe or repeated on-platform violations; we may also consider
                                    actions on other platforms and offline behavior in these
                                    decisions. Circumstances that involve any instance of a threat
                                    of real-world harm to human life that is specific, credible, and
                                    imminent may be reported to law enforcement authorities. The
                                    full Seezitt experience is for people 13 and older, and we
                                    actively remove accounts of people we suspect are under this
                                    age. Our algorithms are designed with trust and safety in mind.
                                    For some content, we may reduce discoverability, including by
                                    redirecting search results, or making videos ineligible for
                                    recommendation in the For You feed. More information can be
                                    found below in the Ineligible for the For You feed section. At
                                    the same time, we recognize that some content that would
                                    normally be removed per our Community Guidelines may be in the
                                    public interest. Therefore, we may allow exceptions under
                                    certain limited circumstances, such as educational, documentary,
                                    scientific, artistic, or satirical content, content in fictional
                                    or professional settings, counter speech, or content that
                                    otherwise enables individual expression on topics of social
                                    importance. To minimize the potentially negative impact of
                                    graphic content, we may first include safety measures such as an
                                    “opt-in” screen or warning. In consultation with relevant
                                    stakeholders, we update our Community Guidelines from time to
                                    time to evolve alongside new behaviors and risks, as part of our
                                    commitment to keeping Seezitt a safe place for creativity and
                                    joy.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Minor safety</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We are deeply committed to protecting the safety of minors on
                                    our platform. Seezitt defines a minor as any person under the
                                    age of 18. We prohibit activities that perpetuate the abuse,
                                    harm, endangerment, or exploitation of minors on Seezitt. Any
                                    content, including animation or digitally created or manipulated
                                    media, that depicts abuse, exploitation, or endangerment of
                                    minors is a violation on our platform and will be removed when
                                    detected. We report child sexual abuse material (CSAM) and
                                    supporting evidence to the National Center for Missing &
                                    Exploited Children (NCMEC) and to any additional relevant legal
                                    authorities. Our users must meet the minimum age requirements to
                                    use Seezitt, as stipulated in our Terms of Service. When an
                                    underage account is identified, we remove it. Given our platform
                                    is designed with the safety of minors in mind, some of our
                                    features are age restricted. Account holders who are under the
                                    age of 16 cannot use direct messaging or host a livestream and
                                    their content is not eligible to appear in the For You feed (the
                                    age thresholds may be higher in some regions). Account holders
                                    who are under the age of 18 cannot send or receive gifts via our
                                    virtual gifting features.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Sexual exploitation of minors</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Seezitt will take action on any content or accounts involving
                                    CSAM or sexual exploitation of a minor. Sexual exploitation of
                                    minors includes any abuse of a position of power or trust for
                                    sexual purposes, including profiting financially, socially,
                                    sexually, or politically from the exploitation of a minor. CSAM
                                    is defined as any visual depiction of sexually explicit nudity
                                    or conduct of a minor, whether captured by predatory adults,
                                    peers, or self-generated by minors.
                                    <br></br>• Content that shares, reshares, offers to trade or
                                    sell, or directs users off platform to obtain or distribute CSAM
                                    <br></br>Do not post, upload, download, stream, or share:
                                    <br></br>• Content that engages with minors in a sexualized way,
                                    or otherwise sexualizes a minor (e.g., via product features like
                                    duets)
                                    <br></br>• Content that depicts, solicits, glorifies, or
                                    encourages child abuse imagery including nudity, sexualized
                                    minors, or sexual activity with minors
                                    <br></br>• Content that depicts, promotes, normalizes, or
                                    glorifies paedophilia or the sexual assault of a minor
                                    <br></br>• Content that re-victimized or capitalizes on minor
                                    victims of abuse by third party reshares or re-enactments of
                                    assault or confessions
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Grooming behavior</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Grooming behaviors are those in which an adult builds an
                                    emotional relationship with a minor in order to gain the minor's
                                    trust for the purposes of future or ongoing sexual contact,
                                    sexual abuse, trafficking, or other exploitation. These
                                    behaviors may include: flattery, requests for contact on or off
                                    platform, requests for personal information, solicitation of
                                    minor sexual abuse material, sexual solicitations or comments,
                                    and gift-giving.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Grooming advances
                                    <br></br> • Content that depicts, promotes, normalizes, or
                                    glorifies grooming behaviors
                                    <br></br> • Content that solicits real-world contact between a
                                    minor and an adult or between minors with a significant age
                                    difference
                                    <br></br> • Content that displays or offers nudity to minors
                                    <br></br> • Content that solicits minors to connect with an
                                    adult on another platform, website, or other digital space
                                    <br></br> • Any solicitation of nude imagery or sexual contact,
                                    through blackmail or other means of coercion
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Nudity and sexual activity involving minors</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Nudity and sexual activity involving minors include content that
                                    is overtly revealing of breasts, genitals, anus, or buttocks, or
                                    behaviors that mimic, imply, or display sex acts involving
                                    minors. We do not allow the depiction, including digitally
                                    created or manipulated content, of nudity or sexual activity.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that depicts or implies minor sexual
                                    activities including penetrative and non-penetrative sex, oral
                                    sex, or intimate kissing
                                    <br></br> • Content that depicts sexual arousal or sexual
                                    stimulation involving a minor
                                    <br></br> • Content that depicts a sexual fetish involving a
                                    minor
                                    <br></br> • Content that depicts exposed genitals, buttocks, the
                                    pubic region, or female nipples of a minor
                                    <br></br> • Content that contains sexually explicit language
                                    depicting or describing a minor
                                    <br></br> • Content depicting a minor that contains sexually
                                    explicit song lyrics
                                    <br></br> • Content with sexually explicit dancing of a minor,
                                    including twerking, breast shaking, pelvic thrusting, or
                                    fondling the groin or breasts of oneself or another
                                    <br></br> • Content depicting a minor undressing
                                    <br></br> • Content depicting a minor in minimal clothing that
                                    is not situationally relevant to the location
                                    <br></br> • Sexualized comments, emojis, text, or other graphics
                                    used to veil or imply nudity or sexual activity of a minor
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Harmful activities by minors</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Harmful minor activities include the possession or consumption
                                    of substances prohibited for minors, the misuse of legal
                                    substances, engagement in illegal activities, and participation
                                    in activities, physical challenges, or dares that may threaten
                                    the well-being of minors. We remove any such content from our
                                    platform.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that suggests, depicts, imitates, or
                                    promotes the possession or consumption of alcoholic beverages,
                                    tobacco, or drugs by a minor
                                    <br></br> • Content that offers instruction targeting minors on
                                    how to buy, sell, or trade alcohol, tobacco, or controlled
                                    substances
                                    <br></br> • Content that depicts or promotes activities that may
                                    jeopardize youth well-being, including physical challenges,
                                    dares, or stunts
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Physical and psychological harm of minors</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Behaviors that place minors at risk of physical or psychological
                                    harm include physical abuse, neglect, child endangerment, and
                                    psychological disparagement. We remove any such content from our
                                    platform.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that depicts or promotes physical abuse,
                                    neglect, endangerment, or psychological disparagement of minors
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Crimes against children</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow users who have been convicted of crimes against
                                    children to have an account on our platform. These crimes
                                    include: sexual assault, molestation, murder, physical abuse or
                                    neglect, abduction, international parental kidnapping,
                                    trafficking, exploitation of minors for prostitution, live
                                    online sexual abuse of a minor, sexual exploitation of minors in
                                    the context of travel and tourism, attempts to obtain or
                                    distribute CSAM, and the production, possession, or distribution
                                    of CSAM. If we discover any such users, we ban the account. Any
                                    self-disclosed user information that states the account holder
                                    is a pedophile or minor sex offender will be taken at face value
                                    and the account will be deleted.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Dangerous acts and challenges</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not permit users to share content depicting, promoting,
                                    normalizing or glorifying dangerous acts that may lead to
                                    serious injury or death. We also do not allow content which
                                    promotes or endorses collective participation in dangerous or
                                    harmful activities that violate any aspect of our Community
                                    Guidelines. We define dangerous acts or other dangerous behavior
                                    as activities conducted in a non-professional context or without
                                    the necessary skills and safety precautions that may lead to
                                    serious injury or death for the user or the public. This
                                    includes amateur stunts or dangerous challenges.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that shows the potentially inappropriate use
                                    of dangerous tools or objects
                                    <br></br> • Content that depicts dangerous driving behavior
                                    <br></br> • Content that depicts or promotes ingesting
                                    substances that are not meant for consumption and could lead to
                                    severe harm
                                    <br></br> • Content that describes or provides instructional
                                    detail on how to perform a dangerous activity
                                    <br></br> • Dangerous games, dares, challenges, or stunts that
                                    might lead to injury or property damage
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Suicide, self-harm, and disordered eating</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We care deeply about the health and well-being of the
                                    individuals who make up our community. We do not allow content
                                    depicting, promoting, normalizing, or glorifying activities that
                                    could lead to suicide, self-harm, or disordered eating. However,
                                    we do support members of our community sharing their personal
                                    experiences with these issues in a safe way to raise awareness
                                    and find community support. We also encourage individuals who
                                    are struggling with thoughts of suicide or self-harm, or who
                                    know someone is seriously considering suicide, to immediately
                                    contact local emergency services or a suicide prevention
                                    hotline. In the event that our intervention could help a user
                                    who may be at risk of harming themselves, Seezitt may also alert
                                    local emergency services.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Suicide and self-harm</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We remove content that depicts suicide, involves suicidal
                                    ideation, or that might encourage suicidal or self-injurious
                                    behavior. We also remove content that depicts attempted suicide
                                    or behavior likely to lead to self-inflicted death. We prohibit
                                    any form of content that promotes, normalizes, or glorifies
                                    suicide, provides instructions for suicide, or posts that
                                    portray a suicide as heroic or honorable. Circumstances that
                                    involve any instance of a threat of real-world harm to human
                                    life that is specific, credible, and imminent may be reported to
                                    law enforcement authorities. Content that encourages or promotes
                                    suicide or self-harm hoaxes are also not allowed. This includes
                                    alarming warnings that could cause panic and widespread harm. We
                                    will remove such warnings, while allowing content that seeks to
                                    dispel panic and promote accurate information about such hoaxes.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that depicts, promotes, normalizes, or
                                    glorifies suicide or self-harm
                                    <br></br> • Content that provides instructions for suicide or
                                    how to engage in self-harm
                                    <br></br> • Suicide or self-harm games, dares, challenges,
                                    pacts, or hoaxes
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Disordered eating</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Content that promotes unhealthy eating behaviors or habits that
                                    are likely to cause adverse health outcomes is not allowed on
                                    the platform. This includes content expressing desire for an
                                    eating disorder, sharing tips or coaching on disordered eating,
                                    and participation in unhealthy body measurement challenges.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that depicts, promotes, normalizes, or
                                    glorifies disordered eating
                                    <br></br> • Content that depicts, promotes, normalizes, or
                                    glorifies any dangerous weight loss behaviors associated with
                                    disordered eating
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Adult nudity and sexual activities</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We strive to create a platform that feels welcoming and safe. We
                                    do not allow nudity, pornography, or sexually explicit content
                                    on our platform. We also prohibit content depicting or
                                    supporting non-consensual sexual acts, the sharing of
                                    non-consensual intimate imagery, and adult sexual solicitation.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Sexual exploitation</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Sexual exploitation is defined as any actual or attempted abuse
                                    of a position of vulnerability, power, or trust for sexual
                                    purposes, including profiting monetarily, socially, or
                                    politically from the sexual exploitation of another. We do not
                                    permit sexually exploitative content.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that depicts, solicits, promotes,
                                    normalizes, or glorifies non-consensual sexual acts or
                                    non-consensual touching, including rape and sexual assault
                                    <br></br> • Content that depicts, solicits, promotes,
                                    normalizes, or glorifies the sharing of non-consensual intimate
                                    imagery, including sexual images that are taken, created, or
                                    shared without consent
                                    <br></br> • Content that depicts, promotes, normalizes, or
                                    glorifies sexual violence
                                    <br></br> • Content that depicts, promotes, or glorifies sexual
                                    solicitation, including offering or asking for sexual partners,
                                    sexual chats or imagery, sexual services, premium sexual
                                    content, or sexcamming
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Nudity and sexual activity involving adults</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Nudity and sexual activity include content that is overtly
                                    revealing of breasts, genitals, anus, or buttocks, or behaviors
                                    that mimic, imply, or display sex acts. We do not allow
                                    depictions, including digitally created or manipulated content,
                                    of nudity or sexual activity. We are mindful that some content
                                    may be offensive or culturally inappropriate in certain regions
                                    or may not be suitable for users of all ages.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that explicitly or implicitly depicts sexual
                                    activities including penetrative and non-penetrative sex, oral
                                    sex, or erotic kissing
                                    <br></br> • Content that depicts sexual arousal or sexual
                                    stimulation
                                    <br></br> • Content that depicts a sexual fetish
                                    <br></br> • Content that depicts genitals, buttocks, the pubic
                                    region, or female nipples
                                    <br></br> • Content that contains sexually explicit language for
                                    sexual gratification
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Bullying and harassment</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We believe in an inclusive community and individual expression
                                    without fear of abuse. We do not tolerate members of our
                                    community being shamed, bullied, or harassed. Abusive content or
                                    behavior can cause severe psychological distress and will be
                                    removed from our platform.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Abusive behavior</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We remove expressions of abuse, including threats or degrading
                                    statements intended to mock, humiliate, embarrass, intimidate,
                                    or hurt an individual. This prohibition extends to the use of
                                    Seezitt features. To enable expression about matters of public
                                    interest, critical comments of public figures may be allowed;
                                    however, serious abusive behavior against public figures is
                                    prohibited.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that insults another individual, or
                                    disparages an individual on the basis of attributes such as
                                    intellect, appearance, personality traits, or hygiene
                                    <br></br> • Content that encourages coordinated harassment
                                    <br></br> • Content that disparages victims of violent tragedies
                                    <br></br> • Content that uses Seezitt interactive features
                                    (e.g., duet) to degrade others
                                    <br></br> • Content that depicts willful harm or intimidation,
                                    such as cyberstalking or trolling
                                    <br></br> • Content that wishes death, serious disease, or other
                                    serious harm on an individual
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Sexual harassment</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Sexual harassment involves unwanted or inappropriate sexual
                                    behavior directed at another individual. We do not allow content
                                    that glorifies, normalizes or promotes sexual harassment,
                                    regardless of the user's intent.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that attempts to make unwanted sexual
                                    contact
                                    <br></br> • Content that disparages another person’s sexual
                                    activity
                                    <br></br> • Content that simulates sexual activity with another
                                    person, either verbally, in text (including emojis), or through
                                    the use of any in-app features
                                    <br></br> • Content that alters or morphs an image of another
                                    individual to portray or imply sexual suggestiveness or
                                    engagement in sexual activity
                                    <br></br> • Content that reveals, or threatens to reveal,
                                    details of a person's private sexual life, including digital
                                    content, sexual history, and names of previous sexual partners
                                    <br></br> • Content that exposes, or threatens to expose, a
                                    person's sexual orientation without their consent
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Threats of hacking and blackmail</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Threatening to hack or dox with an intent to harass or blackmail
                                    another individual can cause serious emotional distress and
                                    other offline harm. We consider these online behaviors as forms
                                    of abuse and do not allow them on our platform.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that threatens to reveal personal data or
                                    personally identifiable information (PII), including residential
                                    address, private email address, private phone number, bank
                                    statement, social security number, or passport number
                                    <br></br> • Content that threatens to blackmail an individual or
                                    to hack an individual's account
                                    <br></br> • Content that incites or encourages others to hack or
                                    reveal another person's account, personal data, or personally
                                    identifiable information (PII)
                                    <br></br> • An individual's account, personal data, or
                                    personally identifiable information to encourage others to
                                    abuse, troll, or harass that individual
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Hateful behavior</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Seezitt is a diverse and inclusive community that has no
                                    tolerance for discrimination. We do not permit content that
                                    contains hate speech or involves hateful behavior, and we remove
                                    it from our platform. We ban accounts and/or users that engage
                                    in severe or multiple hate speech violations or that are
                                    associated with hate speech off the Seezitt platform.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Attacks and slurs on the basis of protected attributes</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We define hate speech or behavior as content that attacks,
                                    threatens, incites violence against, or otherwise dehumanizes an
                                    individual or a group on the basis of the following protected
                                    attributes:
                                    <br></br>• Race
                                    <br></br>• Ethnicity
                                    <br></br>• National origin
                                    <br></br>• Religion
                                    <br></br>• Caste
                                    <br></br>• Sexual orientation
                                    <br></br>• Sex
                                    <br></br>• Gender
                                    <br></br>• Gender identity
                                    <br></br>• Serious disease
                                    <br></br>• Disability
                                    <br></br>• Immigration status
                                    <br></br>Slurs are defined as derogatory terms that are intended
                                    to disparage groups or individuals based on any protected
                                    attributes listed above. To minimize the spread of egregiously
                                    offensive terms, we remove all slurs from our platform, unless
                                    the terms are reappropriated, used self-referentially (i.e., by
                                    members of the protected group), or used in a way that does not
                                    disparage (e.g., educational context).
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content claiming individuals or groups with protected
                                    attributes are physically, mentally, or morally inferior or
                                    referring to them as criminals, animals, inanimate objects, or
                                    other non-human entities
                                    <br></br>• Content promoting or justifying violence, exclusion,
                                    segregation, or discrimination against them
                                    <br></br>• Content that includes the use of non-self referential
                                    slurs
                                    <br></br>• Content that targets transgender or non-binary
                                    individuals through misgendering or deadnaming
                                    <br></br>• Content that depicts harm inflicted upon an
                                    individual or a group on the basis of a protected attribute
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Hateful ideology</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Hateful ideologies are those that demonstrate clear hostility
                                    toward people because of their protected attributes. Hateful
                                    ideologies are incompatible with the inclusive and supportive
                                    community that our platform provides and we remove content that
                                    promotes them.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that praises, promotes, glorifies, or
                                    supports any hateful ideology (e.g., white supremacy, misogyny,
                                    anti-LGBTQ, antisemitism)
                                    <br></br> • Content that contains names, symbols, logos, flags,
                                    slogans, uniforms, gestures, salutes, illustrations, portraits,
                                    songs, music, lyrics, or other objects related to a hateful
                                    ideology
                                    <br></br> • Content that promotes, supports, or advertises
                                    conversion therapy or related program
                                    <br></br> • Content that denies well-documented and violent
                                    events have taken place affecting groups with protected
                                    attributes (e.g., Holocaust denial)
                                    <br></br> • Claims of supremacy over a group of people with
                                    reference to other protected attributes
                                    <br></br> • Conspiracy theories used to justify hateful
                                    ideologies
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Violent extremism</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We take a firm stance against enabling violence on or off
                                    Seezitt. We do not allow people to use our platform to threaten
                                    or incite violence, or to promote violent extremist
                                    organizations, individuals, or acts. When there is a threat to
                                    public safety or an account is used to promote or glorify
                                    off-platform violence, we ban the account. When warranted, we
                                    will report threats to relevant legal authorities. To
                                    effectively protect our community, we may consider off-platform
                                    behavior to identify violent extremist organizations and
                                    individuals on our platform. If we find such organizations or
                                    individuals, we will ban their accounts.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Threats and incitement to violence</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We consider incitement to violence as advocating for, directing,
                                    or encouraging other people to commit violence. We do not allow
                                    threats of violence or incitement to violence on our platform
                                    that may result in serious physical harm.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Statements of intent to inflict physical injuries on
                                    an individual or a group
                                    <br></br>• Statements or imagery that encourage others to commit
                                    or that advocate for violence
                                    <br></br>• Conditional or aspirational statements that encourage
                                    other people to commit violence
                                    <br></br>• Calls to bring weapons to a location with the intent
                                    to intimidate or threaten an individual or group with violence
                                    <br></br>• Instructions on how to make or use weapons that may
                                    incite violence
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Violent extremist organizations and individuals</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow organizations or individuals on our platform who
                                    promote or engage in violence, including terrorist
                                    organizations, organized hate groups, criminal organizations,
                                    and other non-state armed groups that target civilians.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Terrorist organizations</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Terrorists and terrorist organizations are non-state actors that
                                    threaten violence, use violence, and/or commit serious crimes
                                    (such as crimes against humanity) against civilian populations
                                    in pursuit of political, religious, ethnic, or ideological
                                    objectives.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Organized hate groups</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We use the term “organized hate” to refer to those individuals
                                    and organizations who attack people based on protected
                                    attributes, such as race, ethnicity, national origin, religion,
                                    caste, sexual orientation, sex, gender, gender identity, or
                                    immigration status. We consider attacks to include actions that
                                    incite violence or hatred, that aim to dehumanize individuals or
                                    groups, or that embrace a hateful ideology.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Criminal organizations</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Criminal organizations are transnational, national, or local
                                    groups that have engaged in serious crimes, including violent
                                    crimes (e.g., homicide, rape, robbery, assault), trafficking
                                    (e.g., human, organ, drug, weapons), kidnapping, financial
                                    crimes (e.g., extortion, blackmail, fraud, money laundering), or
                                    cybercrime.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br> • Content that praises, promotes, glorifies, or
                                    supports violent acts or extremist organizations or individuals
                                    <br></br> • Content that encourages participation in, or intends
                                    to recruit individuals to, violent extremist organizations
                                    <br></br> • Content with names, symbols, logos, flags, slogans,
                                    uniforms, gestures, salutes, illustrations, portraits, songs,
                                    music, lyrics, or other objects meant to represent violent
                                    extremist organizations or individuals
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Integrity and authenticity</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We believe that trust forms the foundation of our community. We
                                    do not allow activities that may undermine the integrity of our
                                    platform or the authenticity of our users. We remove content or
                                    accounts that involve spam or fake engagement, impersonation, or
                                    misleading information that causes significant harm.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Spam and fake engagement</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Fake engagement includes any content or activity that seeks to
                                    artificially inflate popularity on the platform. We prohibit any
                                    attempts to manipulate the platform to increase interaction
                                    metrics.
                                    <br></br>Do not:
                                    <br></br> • Share instructions on how to artificially increase
                                    views, likes, followers, shares, or comments
                                    <br></br> • Engage in selling or buying views, likes, followers,
                                    shares, or comments
                                    <br></br> • Promote artificial traffic generation services
                                    <br></br> • Operate multiple Seezitt accounts under false or
                                    fraudulent pretenses to distribute commercial spam
                                    <br></br> • Create malicious software or modify code to
                                    artificially increase views, likes, followers, shares, or
                                    comments
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Impersonation</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow accounts that pose as another person or entity
                                    in a deceptive manner. When we confirm a report of
                                    impersonation, we may ask the user to revise the profile or may
                                    ban the account. We do allow accounts that are clearly parody,
                                    commentary, or fan-based, such as where the username indicates
                                    that it is a fan, commentary, or parody account and not
                                    affiliated with the subject of the account.
                                    <br></br>Do not:
                                    <br></br> • Pose as another person or entity by using someone
                                    else's name, biographical details, or profile picture in a
                                    misleading manner
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Harmful misinformation</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Misinformation is defined as content that is inaccurate or
                                    false. We will remove misinformation that causes significant
                                    harm to individuals, our community, or the larger public
                                    regardless of intent. Significant harm includes serious physical
                                    injury, illness, or death; severe psychological trauma;
                                    large-scale property damage, and the undermining of public trust
                                    in civic institutions and processes such as governments,
                                    elections, and scientific bodies. This does not include simply
                                    inaccurate information, myths, or commercial or reputational
                                    harm.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Misinformation that incites hate or prejudice
                                    <br></br>• Misinformation related to emergencies that induces
                                    panic
                                    <br></br>• Medical misinformation that can cause harm to an
                                    individual's physical health
                                    <br></br>• Content that misleads community members about
                                    elections or other civic processes
                                    <br></br>• Conspiratorial content including content that attacks
                                    a specific person or a protected group, includes a violent call
                                    to action, or denies a violent or tragic event occurred
                                    <br></br>• Digital Forgeries (Synthetic Media or Manipulated
                                    Media) that mislead users by distorting the truth of events and
                                    cause significant harm to the subject of the video, other
                                    persons, or society
                                    <br></br>Do not:
                                    <br></br>• Engage in coordinated inauthentic behavior such as
                                    the use of multiple accounts to exert influence and sway public
                                    opinion while misleading individuals, our community, or our
                                    systems about the account's identity, location, relationships,
                                    popularity, or purpose
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Illegal activities and regulated goods</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We work to ensure Seezitt does not enable activities that
                                    violate laws or regulations. We prohibit the trade, sale,
                                    promotion, and use of certain regulated goods, as well as the
                                    promotion or facilitation of criminal activities, including
                                    human exploitation. Content may be removed if it relates to
                                    activities or goods that are regulated or illegal in the
                                    majority of the region or world.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Criminal activities</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Criminal activities cover a wide spectrum of acts punishable by
                                    law, including theft, assault, human exploitation,
                                    counterfeiting, and other harmful behavior. To prevent such
                                    behavior from being normalized, imitated, or facilitated, we
                                    remove content that promotes or enables criminal activities.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that promotes acts of physical harm, such as
                                    assault or kidnapping
                                    <br></br>• Content that risks the safety of others, including
                                    swatting
                                    <br></br>• Content that promotes human exploitation, including
                                    human smuggling, bonded labor, domestic servitude, sex
                                    trafficking, or prostitution
                                    <br></br>• Content that promotes vandalism or damage to property
                                    <br></br>• Content that promotes the poaching or illegal trade
                                    of wildlife
                                    <br></br>• Content that offers the purchase, sale, trade, or
                                    solicitation of unlawfully acquired or counterfeit goods
                                    <br></br>• Content that provides instructions on how to conduct
                                    criminal activities that result in harm to people, animals, or
                                    property
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Weapons</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow the depiction, promotion, or trade of firearms,
                                    ammunition, firearm accessories, or explosive weapons. We also
                                    prohibit instructions on how to manufacture those weapons. We
                                    may allow depiction when appearing in educational contexts
                                    (e.g., as part of a museum's collection), involving authorized
                                    government personnel (e.g., a police officer) or used in a safe
                                    and controlled environment (e.g., shooting range, recreational
                                    hunting).
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that displays firearms, firearm accessories,
                                    ammunition, or explosive weapons
                                    <br></br>• Content that offers the purchase, sale, trade, or
                                    solicitation of firearms, accessories, ammunition, explosive
                                    weapons, or instructions on how to manufacture them
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Drugs, controlled substances, alcohol, and tobacco</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow the depiction, promotion, or trade of drugs or
                                    other controlled substances. The trade of tobacco and alcohol
                                    products is also prohibited on the platform.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that depicts or promotes drugs, drug
                                    consumption, or encourages others to make, use, or trade drugs
                                    or other controlled substances
                                    <br></br>• Content that offers the purchase, sale, trade, or
                                    solicitation of drugs or other controlled substances, alcohol or
                                    tobacco products (including vaping products, smokeless or
                                    combustible tobacco products, synthetic nicotine products,
                                    E-cigarettes, and other ENDS [Electronic Nicotine Delivery
                                    Systems])
                                    <br></br>• Content that provides information on how to buy
                                    illegal or controlled substances
                                    <br></br>• Content that depicts or promotes the misuse of legal
                                    substances, or instruction on how to make homemade substances,
                                    in an effort to become intoxicated
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Frauds and scams</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not permit anyone to exploit our platform to take
                                    advantage of the trust of users and bring about financial or
                                    personal harm. We remove content that deceives people in order
                                    to gain an unlawful financial or personal advantage, including
                                    schemes to defraud individuals or steal assets.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that promotes phishing
                                    <br></br>• Content that promotes Ponzi, multi-level marketing,
                                    or pyramid schemes
                                    <br></br>• Content that promotes investment schemes with promise
                                    of high returns, fixed betting, or any other types of scams
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Gambling</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow content promoting gambling services, or that
                                    could be perceived as advertising for casinos, sports betting,
                                    or any other commercial gambling activity.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that promotes casinos, sports betting, poker,
                                    lotteries, gambling-related software and apps, or other gambling
                                    services
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>
                                        Privacy, personal data, and personally identifiable
                                        information (PII)
                                    </h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We do not allow content that violates the confidentiality of
                                    personal data or personally identifiable information (e.g.,
                                    social security information, phone numbers, physical addresses).
                                    We remove content that depicts personal data or personally
                                    identifiable information (PII) from the platform.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that contains personal data or personally
                                    identifiable information (PII)
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Violent and graphic content</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Seezitt is a platform that celebrates creativity but not shock
                                    value or violence. We do not allow content that is gratuitously
                                    shocking, graphic, sadistic, or gruesome or that promotes,
                                    normalizes, or glorifies extreme violence or suffering on our
                                    platform. When it is a threat to public safety, we ban the
                                    account and, when warranted, we will report it to relevant legal
                                    authorities.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content of humans that depicts:
                                    <br></br>• violent or graphic deaths or accidents
                                    <br></br>• dismembered, mutilated, charred, or burned human
                                    remains
                                    <br></br>• gore in which an open wound or injury is the core
                                    focus
                                    <br></br>• real-world physical violence, fighting, or torture
                                    <br></br>• Content of animals that depicts:
                                    <br></br>• the slaughter or other non-natural death of animals
                                    <br></br>• dismembered, mutilated, charred, or burned animal
                                    remains
                                    <br></br>• animal cruelty and gore
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Copyright and trademark infringement</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Copyright is a legal right that protects original works of
                                    authorship (e.g., music, videos) and original expression of an
                                    idea (e.g., the specific way a video or music is expressed or
                                    created), although it does not protect underlying ideas or
                                    facts. A trademark is a word, symbol, slogan, or design that
                                    identifies and distinguishes the source of a product or service.
                                    We encourage everyone to create and share original content.
                                    Content that infringes someone else's intellectual property
                                    rights is prohibited on our platform and will be removed if we
                                    become aware of it. The use of copyrighted work under certain
                                    circumstances, such as the fair use doctrine or other applicable
                                    laws, or the use of a trademark to reference, lawfully comment,
                                    criticize, parody, make a fan page, or review a product or
                                    service, may not be considered a violation of our policies.
                                    <br></br>Do not post, upload, stream, or share:
                                    <br></br>• Content that violates or infringes someone else's
                                    copyrights, trademarks, or other intellectual property rights
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Platform security</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    A top priority for Seezitt is the safety and security of our
                                    users, creators, business partners, vendors, and employee data,
                                    including their personal information, accounts, profiles,
                                    content, and other proprietary information, as well as our
                                    product and services. We do not allow access to the Seezitt
                                    platform -- which includes our website, app, network, and
                                    associated infrastructure or networks -- through unauthorized
                                    methods, or to obtain sensitive confidential commercial or
                                    personal information. Any attempt to undermine or abuse the
                                    security, integrity or reliability of our platform, products, or
                                    services is expressly prohibited.
                                    <br></br>Do not:
                                    <br></br>• Attempt to access the Seezitt platform in an
                                    unauthorized manner, and do not create fake or misleading
                                    versions of the Seezitt platform
                                    <br></br>• Create or distribute malicious files, content, or
                                    messages that contain viruses, Trojan horses, worms, logic
                                    bombs, or other materials that may be harmful to the community
                                    or platform
                                    <br></br>• Use automated scripts, web crawling, software,
                                    deceptive techniques, or any other way to attempt to obtain,
                                    acquire, or request login credentials or other sensitive
                                    information, including non-public data, from Seezitt or its
                                    users
                                    <br></br>• Leverage Seezitt accounts under false or fraudulent
                                    pretenses to distribute spam, phishing, or smishing content in
                                    an attempt to perpetrate cybercrime or gain unauthorized access
                                    to others’ content, accounts, systems, or data
                                    <br></br>• Modify, adapt, translate, reverse engineer,
                                    disassemble, decompile, or create any derivative products based
                                    on Seezitt, including any files, tables or documentation, or
                                    attempt to regenerate any source code, algorithms, methods, or
                                    techniques embodied in Seezitt
                                    <br></br>• Provide access to your account credentials to others
                                    or enable others to conduct activities against our Community
                                    Guidelines
                                    <br></br>• Click on suspicious links or engage in requests for
                                    information about your Seezitt account details, passwords,
                                    verification qualification, financial, or other personal
                                    information
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Ineligible for the For You feed</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    The goal of the For You feed (FYF) is to provide original
                                    content that honors our mission of inspiring creativity and
                                    bringing joy to our diverse community around the world. Each
                                    account holder’s FYF is based on a personalized recommendation
                                    system. Our recommendation system is designed with user safety
                                    as a primary consideration, meaning that some content may not be
                                    eligible for recommendation. While the spontaneity of the FYF is
                                    what makes Seezitt unique, the FYF is intended for a general
                                    audience that includes everyone from our teenage users to great
                                    grandparents. We consider the breadth of our audience when we
                                    determine what content is eligible for algorithmic promotion on
                                    the platform. Provided that it does not violate local laws, the
                                    following types of content may be allowed on our platform,
                                    searchable, and viewed in Following feeds but not eligible for
                                    recommendation.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Minor safety</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Minors’ sense of judgment and identity mature as they develop.
                                    To provide teens with additional room for identity exploration
                                    and expression in digital spaces, content uploaded by users
                                    under the age of 16 is not eligible for recommendation. We
                                    strive to encourage healthy development across all ages. The
                                    promotion of cosmetic surgery to minors may lead to higher rates
                                    of body dissatisfaction. Accordingly, such content -- including
                                    before-and-after videos, videos of surgical procedures, and
                                    messages discussing elective cosmetic surgery without warning of
                                    risks -- are ineligible for the FYF of all users under the age
                                    of 18.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Dangerous stunts and sports</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Certain activities can be risky or dangerous when replicated
                                    without safety precautions, which could lead to physical harm.
                                    Content that includes dangerous stunts, or extreme sports
                                    performed by non-professionals, may be ineligible. (We remove
                                    content that depicts dangerous acts and challenges performed by
                                    non-professionals, which may lead to serious injury or death for
                                    the user or the public).
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Overly sexualized content</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We are mindful that not all content may be suitable for all
                                    users (particularly our teenage users) and/or may be culturally
                                    inappropriate in certain regions. To help maintain a comfortable
                                    and age-appropriate experience, content that is overtly sexually
                                    suggestive may not be eligible for recommendation. This would
                                    include content that depicts implied nudity, sexualizes body
                                    parts, or is blatantly erotic or sensual (e.g., strip teases).
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Tobacco and alcohol products</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Seezitt is deeply committed to protecting the safety of minors
                                    on our platform. Content promoting, mentioning, or depicting
                                    alcohol products consumed by persons of legal drinking age but
                                    done so in a dangerous fashion may not be eligible for
                                    recommendation. Content depicting the use of tobacco products by
                                    adults or mentioning controlled substances is not eligible for
                                    recommendation. Please remember that content which suggests,
                                    depicts, imitates, or promotes the possession or consumption of
                                    alcoholic beverages, tobacco, or drugs by a minor is prohibited.
                                    Content that offers instruction targeting minors on how to buy,
                                    sell, or trade alcohol, tobacco, or controlled substances is
                                    prohibited per our Community Guidelines as well.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Violent and graphic content</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Our community celebrates creativity, but shock value isn't
                                    everyone's preference. Content that can cause discomfort, shock
                                    or disgust to viewers may be ineligible for the FYF, including
                                    scary effects, jump scares, makeup that realistically replicates
                                    gory wounds, or depictions of bodily functions. Most violent and
                                    graphic content is not allowed on Seezitt; however, in certain
                                    situations we may not remove some types of this content such as
                                    depictions of graphic deaths, accidents or fighting when real
                                    world events are being documented and it is in the public
                                    interest. Since this content isn't appropriate for all
                                    audiences, it will not be eligible for recommendation and the
                                    content will include an “opt-in” screen or warning.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Spam, inauthentic, or misleading content</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    We value authenticity and accuracy. We make ineligible for the
                                    FYF any content that tricks or manipulates users in order to
                                    inauthentically increase followers, likes, views, or other
                                    engagement metrics on the platform, including follow-to-follow,
                                    like-to-like, and misleading or manipulating users into clicking
                                    like or share buttons. Conspiratorial content that counters
                                    generally accepted beliefs and casts blame on a group or entity
                                    (rather than any living individual) or that includes potentially
                                    misleading and harmful content about current, unfolding events
                                    where details are still developing, are also ineligible for
                                    recommendation.
                                </p>
                            </div>

                            <div>
                                <div className={styles.header} style={{ marginBottom: '8px' }}>
                                    <h6>Unoriginal, low-quality, and QR code content</h6>
                                </div>
                                <p className={styles.paragraphsText}>
                                    Original and entertaining content form the core of the Seezitt
                                    community. To maintain the positive experience our users expect
                                    from the Seezitt platform, unoriginal and low-quality content is
                                    ineligible for recommendation. We consider content not original
                                    if it is imported or uploaded from Seezitt, other platforms, or
                                    other sources including television, movies, or webcasts, and the
                                    user has not added new, creative edits. One indicator that the
                                    content is not original is a visible watermark or superimposed
                                    logo. Low quality content includes extremely short clips, static
                                    images, and exclusively-GIF based videos. Content that includes
                                    QR codes is usually ineligible for the FYF because it can lead
                                    users to harmful websites or apps, though we make exceptions in
                                    certain circumstances where that risk is low (e.g., e-commerce).
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
