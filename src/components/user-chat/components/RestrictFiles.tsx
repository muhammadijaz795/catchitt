import { AccountCircle, DriveFileRenameOutline, Palette, FileCopy } from '@mui/icons-material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';


const imagesArray: any[] = [
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg',  },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg',  },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg',  },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg',  },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
    { image: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg', },
];



const FileArray: any[] = [
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
    { image: 'https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180810488/111893989-file-icon-vector-isolated-on-white-background-file-transparent-sign-line-or-linear-design.jpg',  },
];

const linkArray: any[] = [
    { links: 'https://previews.123rf.com/n-line-or-linear-design.jpg',  },
    { links: 'https://previews.123rf.com/n-line-or-linear-design.jpg',  },
    { links: 'https://previews.123rf.com/n-line-or-linear-design.jpg',  },
    { links: 'https://previews.123rf.com/n-line-or-linear-design.jpg',  },
    { links: 'https://previews.123rf.com/n-line-or-linear-design.jpg',  },
];

export const ViewFiles: React.FC<any> = ({
    isDarkTheme,
    MediaName,
    onClose,
    onUpdateNickName,
}) => {

    // const [nickName, setNickName] = React.useState(currentNickName);

    const onSubmitHandler = () => {
        // onUpdateNickName(nickName);
        onClose();
    }

    return (
    <>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
                {/* <DriveFileRenameOutline className="w-5 h-5 text-gray-600 dark:text-gray-300" /> */}
                <span className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-600'}`}>
                    {MediaName == "media" ? "Videos & Images":"" }
                    {MediaName == "file" ? "Files":"" }
                    {MediaName == "link" ? "Links":"" }
                </span>
            </div>
            <CloseIcon
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    color: theme.palette.grey[500],
                })}
                style={{
                    cursor: 'pointer',
                }}
            />
        </div>
        <div className="grid grid-cols-4 gap-4">
            
            {MediaName == "media" && imagesArray.map((val) => (
                    <img
                        src={val.image}
                    />
                ))}
            
            {MediaName == "file" && FileArray.map((val) => (
                <div>
                    <img
                        src={val.image}
                    />
                    test.docx
                </div>
            ))}
            
            {MediaName == "link" && linkArray.map((val) => (
                <div>
                    {val.links}
                </div>
            ))}
            
            {/* <form onSubmit={onSubmitHandler}>
                <input type="text" onChange={(e: any) => setNickName(e.target.value)} value={nickName} placeholder='Enter Nickname' style={{color: 'black'}} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md" />
                <input type="submit" value="Save" className="w-full p-2 mt-4 bg-red-700 text-white rounded-md cursor-pointer" />
            </form> */}
        </div>
    </>

    );
};