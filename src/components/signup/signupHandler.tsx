import React from 'react';

const signupHandler = ({
    name,
    image,
    styles,
    darkWhiteTheme,
    singupItemClickHandler,
}: {
    name: string;
    image: any;
    styles?: any;
    darkWhiteTheme? :any;
    singupItemClickHandler: any;
}) => {
    return (
        <div
            onClick={() => singupItemClickHandler(name)}
            className={`rounded-[0.5rem] font-medium text-base flex flex-row items-center border border-loginItem h-11 px-3 cursor-pointer ${darkWhiteTheme} ${styles}`}
        >
            <img className="object-contain h-4 w-4" src={image} />
            <p className="mx-auto text-[0.938rem]">{name}</p>
        </div>
    );
};

export default signupHandler;
