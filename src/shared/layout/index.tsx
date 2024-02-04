import { useMediaQuery } from '@mui/material';
import { SideNavBar } from '../../components/side-nav-bar/side-nav-bar';
import { SuggestedActivity } from '../../components/suggested-activity/suggested-activity';
import Navbar from '../navbar';
import { TopBar } from '../../components/top-bar/top-bar';

function Layout({ children  }: any) {
    const showSidebar = useMediaQuery('(max-width:1000px)');

    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            {/* <Navbar /> */}
            <TopBar />
            <div style={{ display: 'flex', height: '100%' }}>
                {!showSidebar ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 32,
                            overflow: 'scroll',
                            height: '102%',
                            padding: '40px 40px 40px 40px',
                        }}
                    >
                        <SideNavBar  />
                        <div style={{ background: '#FFF', borderRadius: 16 }}>
                            <SuggestedActivity showActivity={true} showSuggestedContent={true} />
                        </div>
                    </div>
                ) : null}
                <div
                    style={{
                        overflow: 'scroll',
                        height: '102%',
                        // paddingBottom: 40,
                        display: 'block',
                        flex: 1,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
