import settingsIcon from '../svg-components/settings-icon.svg';
import ViewItem from './ViewItem';

const ViewsModal = ({
    content,
    handleOverlayClick,
    viewItemClickHandler,
    darkTheme,
}: {
    content: { viewerAvatar: string; viewerName: string; relationWithViewer: string }[];
    handleOverlayClick: () => void;
    viewItemClickHandler: (index: number) => void;
    darkTheme: boolean;
}) => {
    const handleModalClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
    };
    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div
                onClick={handleModalClick}
                className={`relative w-[40.188rem] h-[43.625rem] ${darkTheme?'bg-dark':'bg-white'} p-8 rounded-lg shadow-lg overflow-auto`}
            >
                <img
                    className="h-8 w-8 object-contain cursor-pointer absolute top-8 right-8"
                    src={settingsIcon}
                    alt="settings-icon"
                />
                <span className="font-semibold text-xl" >Profile Views</span>
                <p className="font-normal text-sm text-custom-color-999 w-[25rem] text-center mx-auto mt-4">
                    People who viewed your profile in the past 30 days will appear here . Only you
                    can see this .
                </p>
                <div className="mt-6">
                    {content?.length === 0 && (
                        <div className="flex flex-col justify-center items-center mt-12">
                            <p className='font-medium text-base'>Loading...</p>
                        </div>
                    )}
                    {content?.map((viewItem, index) => (
                        <ViewItem
                            key={index}
                            viewerAvatar={viewItem?.viewerAvatar}
                            viewerName={viewItem?.viewerName}
                            relationWithViewer={viewItem?.relationWithViewer}
                            viewItemClickHandler={viewItemClickHandler}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewsModal;
