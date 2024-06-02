import { useEffect } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../suggested-activity/suggested-activity';
import { TopBar } from '../top-bar/top-bar';

import IconButton from '@mui/material/IconButton/IconButton';
import { LeftArrow } from '../push-notifications-page/svg-components/LeftArrow';
import styles from './styles.module.scss';

export interface PrivacyPageProps {
    className?: string;
}

export const PrivacyPage = ({ className }: PrivacyPageProps) => {
    const { selectedIndex, setIndex, isLoggedIn, setSettingsDropdown } = useAuthStore();
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/settings/account'); // Navigate back to the previous page
        setIndex(4);
        setSettingsDropdown(true);
    };

    useEffect(() => {
        setIndex(7);
        setSettingsDropdown(true);
    }, []);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.topBarDiv}>
                <TopBar />
            </div>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.sideNavDiv}>
                        <SideNavBar selectedIndex={selectedIndex} settingsDropdownState={true} />
                    </div>
                    <div className={styles.suggestedActivityDiv}>
                        <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                    </div>
                </div>
                <div className={styles.middleSectionDiv}>
                    <div className={styles.pageHeader}>
                        <IconButton
                            sx={{ margin: '0px', padding: '0px', alignSelf: 'center' }}
                            onClick={handleGoBack}
                        >
                            <LeftArrow />
                        </IconButton>
                        <h4>Privacy Policy</h4>
                    </div>
                    <div className={styles.suggestedContent}>
                        <div className={styles.cards}>
                            <div>
                                <div>
                                    <h4>Privacy Policy</h4>
                                </div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Last updated: Jun 06, 2023
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        This Privacy Policy describes Our policies and procedures on
                                        the collection, use and disclosure of Your information when
                                        You use the Service and tells You about Your privacy rights
                                        and how the law protects You.
                                    </p>

                                    <p className={styles.paragraphsText}>
                                        We use Your Personal data to provide and improve the
                                        Service. By using the Service, You agree to the collection
                                        and use of information in accordance with this Privacy
                                        Policy.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h6>Interpretation and Definitions</h6>
                            </div>

                            <div>
                                <h6> Interpretation</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The words of which the initial letter is capitalized have
                                        meanings defined under the following conditions. The
                                        following definitions shall have the same meaning regardless
                                        of whether they appear in singular or in plural.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6> Definitions</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        For the purposes of this Privacy Policy:
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Account means a unique account created for You to access our
                                        Service or parts of our Service.
                                        <br></br>
                                        Affiliate means an entity that controls, is controlled by or
                                        is under common control with a party, where "control" means
                                        ownership of 50% or more of the shares, equity interest or
                                        other securities entitled to vote for election of directors
                                        or other managing authority.
                                        <br></br>
                                        Application means the software program provided by the
                                        Company downloaded by You on any electronic device, named
                                        SeezItt
                                        <br></br>
                                        Business, for the purpose of the CCPA (California Consumer
                                        Privacy Act), refers to the Company as the legal entity that
                                        collects Consumers' personal information and determines the
                                        purposes and means of the processing of Consumers' personal
                                        information, or on behalf of which such information is
                                        collected and that alone, or jointly with others, determines
                                        the purposes and means of the processing of consumers'
                                        personal information, that does business in the State of
                                        California.
                                        <br></br>
                                        Company (referred to as either "the Company", "We", "Us" or
                                        "Our" in this Agreement) refers to Posh Enterprise Inc, 305
                                        Vineyard Town Center #325 Morgan Hill, CA 95037 USA. For the
                                        purpose of the GDPR, the Company is the Data Controller.
                                        <br></br>
                                        Consumer, for the purpose of the CCPA (California Consumer
                                        Privacy Act), means a natural person who is a California
                                        resident. A resident, as defined in the law, includes (1)
                                        every individual who is in the USA for other than a
                                        temporary or transitory purpose, and (2) every individual
                                        who is domiciled in the USA who is outside the USA for a
                                        temporary or transitory purpose.<br></br>
                                        Country refers to: California, United States Data
                                        Controller, for the purposes of the GDPR (General Data
                                        Protection Regulation), refers to the Company as the legal
                                        person which alone or jointly with others determines the
                                        purposes and means of the processing of Personal Data.
                                        <br></br>
                                        Device means any device that can access the Service such as
                                        a computer, a cellphone or a digital tablet.<br></br>
                                        Do Not Track (DNT) is a concept that has been promoted by US
                                        regulatory authorities, in particular the U.S. Federal Trade
                                        Commission (FTC), for the Internet industry to develop and
                                        implement a mechanism for allowing internet users to control
                                        the tracking of their online activities across websites.
                                        <br></br>
                                        Personal Data is any information that relates to an
                                        identified or identifiable individual. For the purposes of
                                        GDPR, Personal Data means any information relating to You
                                        such as a name, an identification number, location data,
                                        online identifier or to one or more factors specific to the
                                        physical, physiological, genetic, mental, economic, cultural
                                        or social identity. For the purposes of the CCPA, Personal
                                        Data means any information that identifies, relates to,
                                        describes or is capable of being associated with, or could
                                        reasonably be linked, directly or indirectly, with You.
                                        <br></br>
                                        Sale, for the purpose of the CCPA (California Consumer
                                        Privacy Act), means selling, renting, releasing, disclosing,
                                        disseminating, making available, transferring, or otherwise
                                        communicating orally, in writing, or by electronic or other
                                        means, a Consumer's personal information to another business
                                        or a third party for monetary or other valuable
                                        consideration.
                                        <br></br>
                                        Service refers to the Application.<br></br>
                                        Service Provider means any natural or legal person who
                                        processes the data on behalf of the Company. It refers to
                                        third-party companies or individuals employed by the Company
                                        to facilitate the Service, to provide the Service on behalf
                                        of the Company, to perform services related to the Service
                                        or to assist the Company in analyzing how the Service is
                                        used. For the purpose of the GDPR, Service Providers are
                                        considered Data Processors.<br></br>
                                        Usage Data refers to data collected automatically, either
                                        generated by the use of the Service or from the Service
                                        infrastructure itself (for example, the duration of a page
                                        visit).<br></br>
                                        You means the individual accessing or using the Service, or
                                        the company, or other legal entity on behalf of which such
                                        individual is accessing or using the Service, as applicable.
                                        Under GDPR (General Data Protection Regulation), You can be
                                        referred to as the Data Subject or as the User as you are
                                        the individual using the Service.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Collecting and Using Your Personal Data</h6>
                            </div>

                            <div className={styles.header}>
                                <h6> Types of Data Collected </h6>
                            </div>

                            <div className={styles.header}>
                                <h6> Personal Data </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        While using Our Service, We may ask You to provide Us with
                                        certain personally identifiable information that can be used
                                        to contact or identify You. Personally identifiable
                                        information may include, but is not limited to:
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}> Email address</p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        First name and last name
                                    </p>
                                    <p className={styles.paragraphsText}> Phone number</p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Address, State, Province, ZIP/Postal code, City
                                    </p>
                                    <p className={styles.paragraphsText}> Usage Data</p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Usage Data </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Usage Data is collected automatically when using the
                                        Service.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Usage Data may include information such as Your Device's
                                        Internet Protocol address (e.g. IP address), browser type,
                                        browser version, the pages of our Service that You visit,
                                        the time and date of Your visit, the time spent on those
                                        pages, unique device identifiers and other diagnostic data.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        When You access the Service by or through a mobile device,
                                        We may collect certain information automatically, including,
                                        but not limited to, the type of mobile device You use, Your
                                        mobile device unique ID, the IP address of Your mobile
                                        device, Your mobile operating system, the type of mobile
                                        Internet browser You use, unique device identifiers and
                                        other diagnostic data.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may also collect information that Your browser sends
                                        whenever You visit our Service or when You access the
                                        Service by or through a mobile device.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6> Information Collected while Using the Application </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>TrueDepth API</p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Our app make use of automatically collected information
                                        using the device camera and the TrueDepth API provided by
                                        Apple. The only use of this information is to track the
                                        user’s head and face so that the user can control the AR
                                        experience and the selfie filters by moving their device and
                                        their head. None of the information collected by the
                                        TrueDepth API ever leaves the user's device nor is it
                                        persistently stored on the device.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        While using Our Application, in order to provide features of
                                        Our Application, We may collect, with Your prior permission:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Information regarding your location
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We use this information to provide features of Our Service,
                                        to improve and customize Our Service. The information may be
                                        uploaded to the Company's servers and/or a Service
                                        Provider's server or it may be simply stored on Your device.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You can enable or disable access to this information at any
                                        time, through Your Device settings.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Use of Your Personal Data </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The Company may use Personal Data for the following
                                        purposes:
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        To provide and maintain our Service , including to monitor
                                        the usage of our Service.
                                        <br></br>
                                        To manage Your Account: to manage Your registration as a
                                        user of the Service. The Personal Data You provide can give
                                        You access to different functionalities of the Service that
                                        are available to You as a registered user.
                                        <br></br>
                                        For the performance of a contract: the development,
                                        compliance and undertaking of the purchase contract for the
                                        products, items or services You have purchased or of any
                                        other contract with Us through the Service.
                                        <br></br>
                                        To contact You: To contact You by email, telephone calls,
                                        SMS, or other equivalent forms of electronic communication,
                                        such as a mobile application's push notifications regarding
                                        updates or informative communications related to the
                                        functionalities, products or contracted services, including
                                        the security updates, when necessary or reasonable for their
                                        implementation.
                                        <br></br>
                                        To provide You with news, special offers and general
                                        information about other goods, services and events which we
                                        offer that are similar to those that you have already
                                        purchased or enquired about unless You have opted not to
                                        receive such information.<br></br>
                                        To manage Your requests: To attend and manage Your requests
                                        to Us.
                                        <br></br>
                                        For business transfers: We may use Your information to
                                        evaluate or conduct a merger, divestiture, restructuring,
                                        reorganization, dissolution, or other sale or transfer of
                                        some or all of Our assets, whether as a going concern or as
                                        part of bankruptcy, liquidation, or similar proceeding, in
                                        which Personal Data held by Us about our Service users is
                                        among the assets transferred.<br></br>
                                        For other purposes: We may use Your information for other
                                        purposes, such as data analysis, identifying usage trends,
                                        determining the effectiveness of our promotional campaigns
                                        and to evaluate and improve our Service, products, services,
                                        marketing and your experience.<br></br>
                                        We may share Your personal information in the following
                                        situations:
                                        <ul>
                                            <p>
                                                With Service Providers: We may share Your personal
                                                information with Service Providers to monitor and
                                                analyze the use of our Service, to show
                                                advertisements to You to help support and maintain
                                                Our Service, to contact You.{' '}
                                            </p>
                                            <br></br>

                                            <p>
                                                For business transfers: We may share or transfer
                                                Your personal information in connection with, or
                                                during negotiations of, any merger, sale of Company
                                                assets, financing, or acquisition of all or a
                                                portion of Our business to another company.
                                            </p>
                                            <br></br>
                                            <p>
                                                With Affiliates: We may share Your information with
                                                Our affiliates, in which case we will require those
                                                affiliates to honor this Privacy Policy. Affiliates
                                                include Our parent company and any other
                                                subsidiaries, joint venture partners or other
                                                companies that We control or that are under common
                                                control with Us.
                                            </p>
                                            <br></br>
                                            <p>
                                                With business partners: We may share Your
                                                information with Our business partners to offer You
                                                certain products, services or promotions.
                                            </p>
                                            <br></br>
                                            <p>
                                                With other users: when You share personal
                                                information or otherwise interact in the public
                                                areas with other users, such information may be
                                                viewed by all users and may be publicly distributed
                                                outside.
                                            </p>
                                            <br></br>
                                            <p>
                                                {' '}
                                                With Your consent: We may disclose Your personal
                                                information for any other purpose with Your consent.
                                            </p>
                                            <br></br>
                                        </ul>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Retention of Your Personal Data </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The Company will retain Your Personal Data only for as long
                                        as is necessary for the purposes set out in this Privacy
                                        Policy. We will retain and use Your Personal Data to the
                                        extent necessary to comply with our legal obligations (for
                                        example, if we are required to retain your data to comply
                                        with applicable laws), resolve disputes, and enforce our
                                        legal agreements and policies.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The Company will also retain Usage Data for internal
                                        analysis purposes. Usage Data is generally retained for a
                                        shorter period of time, except when this data is used to
                                        strengthen the security or to improve the functionality of
                                        Our Service, or We are legally obligated to retain this data
                                        for longer time periods.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6> Transfer of Your Personal Data</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Your information, including Personal Data, is processed at
                                        the Company's operating offices and in any other places
                                        where the parties involved in the processing are located. It
                                        means that this information may be transferred to — and
                                        maintained on — computers located outside of Your state,
                                        province, country or other governmental jurisdiction where
                                        the data protection laws may differ than those from Your
                                        jurisdiction
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Your consent to this Privacy Policy followed by Your
                                        submission of such information represents Your agreement to
                                        that transfer.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The Company will take all steps reasonably necessary to
                                        ensure that Your data is treated securely and in accordance
                                        with this Privacy Policy and no transfer of Your Personal
                                        Data will take place to an organization or a country unless
                                        there are adequate controls in place including the security
                                        of Your data and other personal information.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Disclosure of Your Personal Data </h6>
                            </div>

                            <div className={styles.header}>
                                <h6>Business Transactions </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If the Company is involved in a merger, acquisition or asset
                                        sale, Your Personal Data may be transferred. We will provide
                                        notice before Your Personal Data is transferred and becomes
                                        subject to a different Privacy Policy.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Law enforcement </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Under certain circumstances, the Company may be required to
                                        disclose Your Personal Data if required to do so by law or
                                        in response to valid requests by public authorities (e.g. a
                                        court or a government agency).
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Other legal requirements </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The Company may disclose Your Personal Data in the good
                                        faith belief that such action is necessary to:
                                    </p>
                                    <ul>
                                        <p>
                                            <p className={styles.paragraphsText}>
                                                Comply with a legal obligation
                                            </p>
                                        </p>

                                        <p>
                                            <p className={styles.paragraphsText}>
                                                Protect and defend the rights or property of the
                                                Company
                                            </p>
                                        </p>

                                        <p>
                                            <p className={styles.paragraphsText}>
                                                Prevent or investigate possible wrongdoing in
                                                connection with the Service
                                            </p>
                                        </p>
                                        <p>
                                            <p className={styles.paragraphsText}>
                                                Protect the personal safety of Users of the Service
                                                or the public
                                            </p>
                                        </p>
                                        <p>
                                            <p className={styles.paragraphsText}>
                                                Protect against legal liability
                                            </p>
                                        </p>
                                    </ul>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Security of Your Personal Data</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The security of Your Personal Data is important to Us, but
                                        remember that no method of transmission over the Internet,
                                        or method of electronic storage is 100% secure. While We
                                        strive to use commercially acceptable means to protect Your
                                        Personal Data, We cannot guarantee its absolute security.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>
                                    {' '}
                                    Detailed Information on the Processing of Your Personal Data
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        The Service Providers We use may have access to Your
                                        Personal Data. These third-party vendors collect, store,
                                        use, process and transfer information about Your activity on
                                        Our Service in accordance with their Privacy Policies.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Advertising</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        We may use Service Providers to show advertisements to You
                                        to help support and maintain Our Service.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Google AdSense & DoubleClick Cookie</h6>
                            </div>
                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Google, as a third party vendor, uses cookies to serve ads
                                        on our Service. Google's use of the DoubleClick cookie
                                        enables it and its partners to serve ads to our users based
                                        on their visit to our Service or other websites on the
                                        Internet. You may opt out of the use of the DoubleClick
                                        Cookie for interest-based advertising by visiting the Google
                                        Ads Settings web page: <br></br>
                                        <a
                                            className="break"
                                            href="http://www.google.com/ads/preferences/"
                                        >
                                            http://www.google.com/ads/preferences/
                                        </a>
                                        <br></br>
                                        AdMob by Google
                                        <br></br>
                                        AdMob by Google is provided by Google Inc. You can opt-out
                                        from the AdMob by Google service by following the
                                        instructions described by Google:
                                        <a
                                            className="break"
                                            href="https://support.google.com/ads/answer/2662922?hl=en"
                                        >
                                            https://support.google.com/ads/answer/2662922?hl=en
                                        </a>
                                        For more information on how Google uses the collected
                                        information, please visit the "How Google uses data when you
                                        use our partners' sites or app" page:
                                        <a
                                            className="break"
                                            href="https://policies.google.com/technologies/partner-sites"
                                        >
                                            https://policies.google.com/technologies/partner-sites{' '}
                                        </a>
                                        or visit the Privacy Policy of Google:
                                        <a
                                            className="break"
                                            href="https://policies.google.com/privacy"
                                        >
                                            https://policies.google.com/privacy{' '}
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> GDPR Privacy</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Legal Basis for Processing Personal Data under GDPR
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may process Personal Data under the following conditions:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    {' '}
                                    <p className={styles.paragraphsText}>
                                        Consent: You have given Your consent for processing Personal
                                        Data for one or more specific purposes.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Performance of a contract: Provision of Personal Data is
                                        necessary for the performance of an agreement with You
                                        and/or for any pre-contractual obligations thereof.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Legal obligations: Processing Personal Data is necessary for
                                        compliance with a legal obligation to which the Company is
                                        subject.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Vital interests: Processing Personal Data is necessary in
                                        order to protect Your vital interests or of another natural
                                        person.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Public interests: Processing Personal Data is related to a
                                        task that is carried out in the public interest or in the
                                        exercise of official authority vested in the Company.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Legitimate interests: Processing Personal Data is necessary
                                        for the purposes of the legitimate interests pursued by the
                                        Company.
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        In any case, the Company will gladly help to clarify the
                                        specific legal basis that applies to the processing, and in
                                        particular whether the provision of Personal Data is a
                                        statutory or contractual requirement, or a requirement
                                        necessary to enter into a contract.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Your Rights under the GDPR</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        The Company undertakes to respect the confidentiality of
                                        Your Personal Data and to guarantee You can exercise Your
                                        rights.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You have the right under this Privacy Policy, and by law if
                                        You are within the EU, to:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Request access to Your Personal Data. The right to access,
                                        update or delete the information We have on You. Whenever
                                        made possible, you can access, update or request deletion of
                                        Your Personal Data directly within Your account settings
                                        section. If you are unable to perform these actions
                                        yourself, please contact Us to assist You. This also enables
                                        You to receive a copy of the Personal Data We hold about
                                        You.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Request correction of the Personal Data that We hold about
                                        You. You have the right to have any incomplete or inaccurate
                                        information We hold about You corrected.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Object to processing of Your Personal Data. This right
                                        exists where We are relying on a legitimate interest as the
                                        legal basis for Our processing and there is something about
                                        Your particular situation, which makes You want to object to
                                        our processing of Your Personal Data on this ground. You
                                        also have the right to object where We are processing Your
                                        Personal Data for direct marketing purposes.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Request erasure of Your Personal Data. You have the right to
                                        ask Us to delete or remove Personal Data when there is no
                                        good reason for Us to continue processing it.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Request the transfer of Your Personal Data. We will provide
                                        to You, or to a third-party You have chosen, Your Personal
                                        Data in a structured, commonly used, machine-readable
                                        format. Please note that this right only applies to
                                        automated information which You initially provided consent
                                        for Us to use or where We used the information to perform a
                                        contract with You.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Withdraw Your consent. You have the right to withdraw Your
                                        consent on using your Personal Data. If You withdraw Your
                                        consent, We may not be able to provide You with access to
                                        certain specific functionalities of the Service.
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <h6>Exercising of Your GDPR Data Protection Rights </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You may exercise Your rights of access, rectification,
                                        cancellation and opposition by contacting Us. Please note
                                        that we may ask You to verify Your identity before
                                        responding to such requests. If You make a request, We will
                                        try our best to respond to You as soon as possible.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You have the right to complain to a Data Protection
                                        Authority about Our collection and use of Your Personal
                                        Data. For more information, if You are in the European
                                        Economic Area (EEA), please contact Your local data
                                        protection authority in the EEA.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>CCPA Privacy</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        This privacy notice section for California residents
                                        supplements the information contained in Our Privacy Policy
                                        and it applies solely to all visitors, users, and others who
                                        reside in the State of California.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Categories of Personal Information Collected </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We collect information that identifies, relates to,
                                        describes, references, is capable of being associated with,
                                        or could reasonably be linked, directly or indirectly, with
                                        a particular Consumer or Device. The following is a list of
                                        categories of personal information which we may collect or
                                        may have been collected from California residents within the
                                        last twelve (12) months.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Please note that the categories and examples provided in the
                                        list below are those defined in the CCPA. This does not mean
                                        that all examples of that category of personal information
                                        were in fact collected by Us, but reflects our good faith
                                        belief to the best of our knowledge that some of that
                                        information from the applicable category may be and may have
                                        been collected. For example, certain categories of personal
                                        information would only be collected if You provided such
                                        personal information directly to Us.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Category A: Identifiers.
                                        <br></br>
                                        Examples: A real name, alias, postal address, unique
                                        personal identifier, online identifier, Internet Protocol
                                        address, email address, account name, driver's license
                                        number, passport number, or other similar identifiers.
                                        Collected: Yes.<br></br>
                                        Category B: Personal information categories listed in the
                                        California Customer Records statute (Cal. Civ. Code §
                                        1798.80(e)).
                                        <br></br>
                                        Examples: A name, signature, Social Security number,
                                        physical characteristics or description, address, telephone
                                        number, passport number, driver's license or state
                                        identification card number, insurance policy number,
                                        education, employment, employment history, bank account
                                        number, credit card number, debit card number, or any other
                                        financial information, medical information, or health
                                        insurance information. Some personal information included in
                                        this category may overlap with other categories. Collected:
                                        Yes.<br></br>
                                        Category C: Protected classification characteristics under
                                        California or federal law.
                                        <br></br>
                                        Examples: Age (40 years or older), race, color, ancestry,
                                        national origin, citizenship, religion or creed, marital
                                        status, medical condition, physical or mental disability,
                                        sex (including gender, gender identity, gender expression,
                                        pregnancy or childbirth and related medical conditions),
                                        sexual orientation, veteran or military status, genetic
                                        information (including familial genetic information).
                                        Collected: No.<br></br>
                                        Category D: Commercial information.
                                        <br></br>
                                        Examples: Records and history of products or services
                                        purchased or considered. Collected: No.<br></br>
                                        Category E: Biometric information.
                                        <br></br>
                                        Examples: Genetic, physiological, behavioral, and biological
                                        characteristics, or activity patterns used to extract a
                                        template or other identifier or identifying information,
                                        such as, fingerprints, faceprints, and voiceprints, iris or
                                        retina scans, keystroke, gait, or other physical patterns,
                                        and sleep, health, or exercise data. Collected: No.<br></br>
                                        Category F: Internet or other similar network activity.
                                        <br></br>
                                        Examples: Interaction with our Service or advertisement.
                                        Collected: Yes.<br></br>
                                        Category G: Geolocation data.
                                        <br></br>
                                        Examples: Approximate physical location. Collected: Yes.
                                        <br></br>
                                        Category H: Sensory data.
                                        <br></br>
                                        Examples: Audio, electronic, visual, thermal, olfactory, or
                                        similar information. Collected: No.<br></br>
                                        Category I: Professional or employment-related information.
                                        <br></br>
                                        Examples: Current or past job history or performance
                                        evaluations. Collected: No.<br></br>
                                        Category J: Non-public education information (per the Family
                                        Educational Rights and Privacy Act (20 U.S.C. Section 1232g,
                                        34 C.F.R. Part 99)).
                                        <br></br>
                                        Examples: Education records directly related to a student
                                        maintained by an educational institution or party acting on
                                        its behalf, such as grades, transcripts, class lists,
                                        student schedules, student identification codes, student
                                        financial information, or student disciplinary records.
                                        Collected: No.
                                        <br></br>
                                        Category K: Inferences drawn from other personal
                                        information.
                                        <br></br>
                                        Examples: Profile reflecting a person's preferences,
                                        characteristics, psychological trends, predispositions,
                                        behavior, attitudes, intelligence, abilities, and aptitudes.
                                        Collected: No.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Under CCPA, personal information does not include:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Publicly available information from government records
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Deidentified or aggregated consumer information
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Information excluded from the CCPA's scope, such as:{' '}
                                    </p>
                                </p>
                            </ul>
                            <div>
                                <ul>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Health or medical information covered by the Health
                                            Insurance Portability and Accountability Act of 1996
                                            (HIPAA) and the California Confidentiality of Medical
                                            Information Act (CMIA) or clinical trial data
                                        </p>
                                    </p>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Personal Information covered by certain sector-specific
                                            privacy laws, including the Fair Credit Reporting Act
                                            (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California
                                            Financial Information Privacy Act (FIPA), and the
                                            Driver's Privacy Protection Act of 1994
                                        </p>
                                    </p>
                                </ul>
                            </div>

                            <div className={styles.header}>
                                <h6>Sources of Personal Information </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We obtain the categories of personal information listed
                                        above from the following categories of sources:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Directly from You. For example, from the forms You complete
                                        on our Service, preferences You express or provide through
                                        our Service.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Indirectly from You. For example, from observing Your
                                        activity on our Service.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Automatically from You. For example, through cookies We or
                                        our Service Providers set on Your Device as You navigate
                                        through our Service.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        From Service Providers. For example, third-party vendors to
                                        provide advertising on our Service, or other third-party
                                        vendors that We use to provide the Service to You.
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <h6>
                                    Use of Personal Information for Business Purposes or Commercial
                                    Purposes{' '}
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may use or disclose personal information We collect for
                                        "business purposes" or "commercial purposes" (as defined
                                        under the CCPA), which may include the following examples:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        To operate our Service and provide You with our Service.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        To provide You with support and to respond to Your
                                        inquiries, including to investigate and address Your
                                        concerns and monitor and improve our Service.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        To fulfill or meet the reason You provided the information.
                                        For example, if You share Your contact information to ask a
                                        question about our Service, We will use that personal
                                        information to respond to Your inquiry.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        To respond to law enforcement requests and as required by
                                        applicable law, court order, or governmental regulations
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        As described to You when collecting Your personal
                                        information or as otherwise set forth in the CCPA.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        For internal administrative and auditing purposes.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        To detect security incidents and protect against malicious,
                                        deceptive, fraudulent or illegal activity, including, when
                                        necessary, to prosecute those responsible for such
                                        activities.
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Please note that the examples provided above are
                                        illustrative and not intended to be exhaustive. For more
                                        details on how we use this information, please refer to the
                                        "Use of Your Personal Data" section.<br></br>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If We decide to collect additional categories of personal
                                        information or use the personal information We collected for
                                        materially different, unrelated, or incompatible purposes We
                                        will update this Privacy Policy.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6>
                                    Disclosure of Personal Information for Business Purposes or
                                    Commercial Purposes{' '}
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may use or disclose and may have used or disclosed in the
                                        last twelve (12) months the following categories of personal
                                        information for business or commercial purposes:
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>Category A: Identifiers</p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category B: Personal information categories listed in the
                                        California Customer
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Records statute (Cal. Civ. Code § 1798.80(e))
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category F: Internet or other similar network activity
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category G: Geolocation data
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Please note that the categories listed above are those
                                        defined in the CCPA. This does not mean that all examples of
                                        that category of personal information were in fact
                                        disclosed, but reflects our good faith belief to the best of
                                        our knowledge that some of that information from the
                                        applicable category may be and may have been disclosed.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        When We disclose personal information for a business purpose
                                        or a commercial purpose, We enter a contract that describes
                                        the purpose and requires the recipient to both keep that
                                        personal information confidential and not use it for any
                                        purpose except performing the contract.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Sale of Personal Information</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        As defined in the CCPA, "sell" and "sale" mean selling,
                                        renting, releasing, disclosing, disseminating, making
                                        available, transferring, or otherwise communicating orally,
                                        in writing, or by electronic or other means, a consumer's
                                        personal information by the business to a third party for
                                        valuable consideration. This means that We may have received
                                        some kind of benefit in return for sharing personal
                                        information, but not necessarily a monetary benefit.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Please note that the categories listed below are those
                                        defined in the CCPA. This does not mean that all examples of
                                        that category of personal information were in fact sold, but
                                        reflects our good faith belief to the best of our knowledge
                                        that some of that information from the applicable category
                                        may be and may have been shared for value in return.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may sell and may have sold in the last twelve (12) months
                                        the following categories of personal information:
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>Category A: Identifiers</p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category B: Personal information categories listed in the
                                        California Customer
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Records statute (Cal. Civ. Code § 1798.80(e))
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category F: Internet or other similar network activity
                                    </p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Category G: Geolocation data
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Share of Personal Information </h6>
                            </div>

                            <div>
                                <p className={styles.paragraphsText}>
                                    We may share Your personal information identified in the above
                                    categories with the following categories of third parties:
                                </p>
                            </div>

                            <div>
                                <p className={styles.paragraphsText}>Service Providers</p>
                                <p className={styles.paragraphsText}> Our affiliates</p>
                                <p className={styles.paragraphsText}> Our business partners</p>
                                <p className={styles.paragraphsText}>
                                    {' '}
                                    Third party vendors to whom You or Your agents authorize Us to
                                    disclose Your
                                </p>
                                <p className={styles.paragraphsText}>
                                    personal information in connection with products or services We
                                    provide to You
                                </p>
                            </div>

                            <div className={styles.header}>
                                <h6>
                                    {' '}
                                    Sale of Personal Information of Minors Under 16 Years of Age
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We do not knowingly collect personal information from minors
                                        under the age of 16 through our Service, although certain
                                        third party websites that we link to may do so. These
                                        third-party websites have their own terms of use and privacy
                                        policies and we encourage parents and legal guardians to
                                        monitor their children's Internet usage and instruct their
                                        children to never provide information on other websites
                                        without their permission.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We do not sell the personal information of Consumers We
                                        actually know are less than 16 years of age, unless We
                                        receive affirmative authorization (the "right to opt-in")
                                        from either the Consumer who is between 13 and 16 years of
                                        age, or the parent or guardian of a Consumer less than 13
                                        years of age. Consumers who opt-in to the sale of personal
                                        information may opt-out of future sales at any time. To
                                        exercise the right to opt-out, You (or Your authorized
                                        representative) may submit a request to Us by contacting Us.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If You have reason to believe that a child under the age of
                                        13 (or 16) has provided Us with personal information, please
                                        contact Us with sufficient detail to enable Us to delete
                                        that information.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Your Rights under the CCPA </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        The CCPA provides California residents with specific rights
                                        regarding their personal information. If You are a resident
                                        of California, You have the following rights:
                                    </p>
                                </div>
                            </div>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        The right to notice. You have the right to be notified which
                                        categories of Personal Data are being collected and the
                                        purposes for which the Personal Data is being used.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        The right to request. Under CCPA, You have the right to
                                        request that We disclose information to You about Our
                                        collection, use, sale, disclosure for business purposes and
                                        share of personal information. Once We receive and confirm
                                        Your request, We will disclose to You:{' '}
                                    </p>
                                </p>
                            </ul>

                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        The categories of personal information We collected about
                                        You
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        The categories of sources for the personal information We
                                        collected about You
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Our business or commercial purpose for collecting or selling
                                        that personal information
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        The categories of third parties with whom We share that
                                        personal information
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        The specific pieces of personal information We collected
                                        about You
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        If we sold Your personal information or disclosed Your
                                        personal information for a business purpose, We will
                                        disclose to You:{' '}
                                    </p>
                                </p>
                                <ul>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            {' '}
                                            The categories of personal information categories sold
                                        </p>
                                    </p>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            {' '}
                                            The categories of personal information categories
                                            disclosed
                                        </p>
                                    </p>
                                </ul>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        The right to say no to the sale of Personal Data (opt-out).
                                        You have the right to direct Us to not sell Your personal
                                        information. To submit an opt-out request please contact Us.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        The right to delete Personal Data. You have the right to
                                        request the deletion of Your Personal Data, subject to
                                        certain exceptions. Once We receive and confirm Your
                                        request, We will delete (and direct Our Service Providers to
                                        delete) Your personal information from our records, unless
                                        an exception applies. We may deny Your deletion request if
                                        retaining the information is necessary for Us or Our Service
                                        Providers to:{' '}
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Complete the transaction for which We collected the personal
                                        information, provide a good or service that You requested,
                                        take actions reasonably anticipated within the context of
                                        our ongoing business relationship with You, or otherwise
                                        perform our contract with You.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Detect security incidents, protect against malicious,
                                        deceptive, fraudulent, or illegal activity, or prosecute
                                        those responsible for such activities.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Debug products to identify and repair errors that impair
                                        existing intended functionality.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Exercise free speech, ensure the right of another consumer
                                        to exercise their free speech rights, or exercise another
                                        right provided for by law.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Comply with the California Electronic Communications Privacy
                                        Act (Cal. Penal Code § 1546 et. seq.).
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Engage in public or peer-reviewed scientific, historical, or
                                        statistical research in the public interest that adheres to
                                        all other applicable ethics and privacy laws, when the
                                        information's deletion may likely render impossible or
                                        seriously impair the research's achievement, if You
                                        previously provided informed consent.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Enable solely internal uses that are reasonably aligned with
                                        consumer expectations based on Your relationship with Us.
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        {' '}
                                        Comply with a legal obligation.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Make other internal and lawful uses of that information that
                                        are compatible with the context in which You provided it.
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        The right not to be discriminated against. You have the
                                        right not to be discriminated against for exercising any of
                                        Your consumer's rights, including by:{' '}
                                    </p>
                                </p>
                                <ul>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Denying goods or services to You
                                        </p>
                                    </p>

                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Charging different prices or rates for goods or
                                            services, including the use of discounts or other
                                            benefits or imposing penalties
                                        </p>
                                    </p>

                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Providing a different level or quality of goods or
                                            services to You
                                        </p>
                                    </p>
                                    <p>
                                        <p className={styles.paragraphsText}>
                                            Suggesting that You will receive a different price or
                                            rate for goods or services or a different level or
                                            quality of goods or services
                                        </p>
                                    </p>
                                </ul>
                            </ul>

                            <div className={styles.header}>
                                <h6>Exercising Your CCPA Data Protection Rights </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        In order to exercise any of Your rights under the CCPA, and
                                        if You are a California resident, You can contact Us:
                                    </p>
                                </div>
                            </div>
                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        By email: info@seezitt.com
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Only You, or a person registered with the California
                                        Secretary of State that You authorize to act on Your behalf,
                                        may make a verifiable request related to Your personal
                                        information.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Your request to Us must:
                                    </p>
                                </div>
                            </div>
                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Provide sufficient information that allows Us to reasonably
                                        verify You are the person about whom We collected personal
                                        information or an authorized representative
                                    </p>
                                </p>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        Describe Your request with sufficient detail that allows Us
                                        to properly understand, evaluate, and respond to it We
                                        cannot respond to Your request or provide You with the
                                        required information if we cannot:
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        Verify Your identity or authority to make the request
                                    </p>
                                </p>

                                <p>
                                    <p className={styles.paragraphsText}>
                                        And confirm that the personal information relates to You
                                    </p>
                                </p>
                            </ul>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We will disclose and deliver the required information free
                                        of charge within 45 days of receiving Your verifiable
                                        request. The time period to provide the required information
                                        may be extended once by an additional 45 days when
                                        reasonably necessary and with prior notice.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Any disclosures We provide will only cover the 12-month
                                        period preceding the verifiable request's receipt.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        For data portability requests, We will select a format to
                                        provide Your personal information that is readily usable and
                                        should allow You to transmit the information from one entity
                                        to another entity without hindrance.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Do Not Sell My Personal Information</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You have the right to opt-out of the sale of Your personal
                                        information. Once We receive and confirm a verifiable
                                        consumer request from You, we will stop selling Your
                                        personal information. To exercise Your right to opt-out,
                                        please contact Us.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>
                                    {' '}
                                    "Do Not Track" Policy as Required by California Online Privacy
                                    Protection Act (CalOPPA)
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Our Service does not respond to Do Not Track signals.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        However, some third party websites do keep track of Your
                                        browsing activities. If You are visiting such websites, You
                                        can set Your preferences in Your web browser to inform
                                        websites that You do not want to be tracked. You can enable
                                        or disable DNT by visiting the preferences or settings page
                                        of Your web browser.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Children's Privacy</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Our Service does not address anyone under the age of 13. We
                                        do not knowingly collect personally identifiable information
                                        from anyone under the age of 13. If You are a parent or
                                        guardian and You are aware that Your child has provided Us
                                        with Personal Data, please contact Us. If We become aware
                                        that We have collected Personal Data from anyone under the
                                        age of 13 without verification of parental consent, We take
                                        steps to remove that information from Our servers.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If We need to rely on consent as a legal basis for
                                        processing Your information and Your country requires
                                        consent from a parent, We may require Your parent's consent
                                        before We collect and use that information.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>
                                    Your California Privacy Rights (California's Shine the Light
                                    law)
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Under California Civil Code Section 1798 (California's Shine
                                        the Light law), California residents with an established
                                        business relationship with us can request information once a
                                        year about sharing their Personal Data with third parties
                                        for the third parties' direct marketing purposes.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If you'd like to request more information under the
                                        California Shine the Light law, and if You are a California
                                        resident, You can contact Us using the contact information
                                        provided below.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>
                                    {' '}
                                    California Privacy Rights for Minor Users (California Business
                                    and Professions Code Section 22581)
                                </h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        California Business and Professions Code Section 22581
                                        allows California residents under the age of 18 who are
                                        registered users of online sites, services or applications
                                        to request and obtain removal of content or information they
                                        have publicly posted.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        To request removal of such data, and if You are a California
                                        resident, You can contact Us using the contact information
                                        provided below, and include the email address associated
                                        with Your account.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Be aware that Your request does not guarantee complete or
                                        comprehensive removal of content or information posted
                                        online and that the law may not permit or require removal in
                                        certain circumstances.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6>Links to Other Websites</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        Our Service may contain links to other websites that are not
                                        operated by Us. If You click on a third party link, You will
                                        be directed to that third party's site. We strongly advise
                                        You to review the Privacy Policy of every site You visit.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We have no control over and assume no responsibility for the
                                        content, privacy policies or practices of any third party
                                        sites or services.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Changes to this Privacy Policy</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We may update Our Privacy Policy from time to time. We will
                                        notify You of any changes by posting the new Privacy Policy
                                        on this page.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        We will let You know via email and/or a prominent notice on
                                        Our Service, prior to the change becoming effective and
                                        update the "Last updated" date at the top of this Privacy
                                        Policy.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        You are advised to review this Privacy Policy periodically
                                        for any changes. Changes to this Privacy Policy are
                                        effective when they are posted on this page.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.header}>
                                <h6> Contact Us</h6>
                            </div>

                            <div>
                                <div>
                                    <p className={styles.paragraphsText}>
                                        If you have any questions about this Privacy Policy, You can
                                        contact us:
                                    </p>
                                </div>
                            </div>
                            <ul>
                                <p>
                                    <p className={styles.paragraphsText}>
                                        By email: info@seezitt.com
                                    </p>
                                </p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
