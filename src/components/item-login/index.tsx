import React from 'react';

const ItemLogin = ({
    name,
    image,
    styles,
    darkWhiteTheme,
    loginItemClickHandler,
}: {
    name: string;
    image: any;
    styles?: any;
    darkWhiteTheme? :any;
    loginItemClickHandler: any;
}) => {
    return (
        <div
            onClick={() => loginItemClickHandler(name)}
            className={`rounded-[0.5rem] font-medium text-base flex flex-row items-center border border-loginItem h-11 px-3 cursor-pointer  ${styles} ${darkWhiteTheme}`}
        >
            <img className="object-contain h-5 w-5" src={image} />
            <p className="mx-auto text-[0.938rem]">{name}</p>
        </div>
    );
};

export default ItemLogin;
