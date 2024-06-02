const ViewItem = ({
    viewerAvatar,
    viewerName,
    relationWithViewer,
    viewItemClickHandler,
    index,
}: {
    viewerAvatar: any;
    viewerName: string;
    relationWithViewer: any;
    viewItemClickHandler: (index: number) => void;
    index: number;
}) => {
    return (
        <div className="flex flex-row justify-between items-center border-b border-b-[custom-gray-200]">
            <div className="flex flex-row items-center gap-3.5 py-3">
                <img className="h-12 w-12 object-cover rounded-full" src={viewerAvatar} alt="viewerAvatar" />
                <p className="font-medium text-base text-custom-dark-222">{viewerName}</p>
            </div>
            <div
                onClick={() => viewItemClickHandler(index)}
                className={`flex justify-center items-center cursor-pointer ${
                    relationWithViewer === 'Follow'
                        ? 'bg-custom-primary'
                        : relationWithViewer === 'Requested'
                        ? 'bg-custom-gray-100'
                        : 'bg-white'
                } px-4 rounded-md h-10 w-[7.25rem]`}
            >
                <p
                    className={`font-semibold text-sm ${
                        relationWithViewer === 'Friends' ||
                        relationWithViewer === 'Requested' ||
                        relationWithViewer === 'Following'
                            ? 'text-custom-primary'
                            : 'text-white'
                    }`}
                >
                    {relationWithViewer}
                </p>
            </div>
        </div>
    );
};

export default ViewItem;
