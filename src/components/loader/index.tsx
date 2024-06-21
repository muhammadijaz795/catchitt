import React from 'react';

const Loader = ({ height = 3, width = 3, borderColor = 'gray-400' }: any) => {
    return (
        <div
            className={`w-${width} h-${height} border-2 border-${borderColor} border-t-transparent border-solid rounded-full animate-spin`}
        />
    );
};

export default Loader;
