import React, { useEffect } from 'react';

interface PayPalRedirectProps {
    htmlContent: string;
}

const PayPalRedirect: React.FC<PayPalRedirectProps> = ({ htmlContent }) => {
    useEffect(() => {
        // Create a container element
        const container = document.createElement('div');
        container.innerHTML = htmlContent;

        // Append the container to the body
        document.body.appendChild(container);

        // Clean up function to remove the container when the component is unmounted
        return () => {
            document.body.removeChild(container);
        };
    }, [htmlContent]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe src={htmlContent} style={{
                width: "100%",
                height: "100%"
            }} />
        </div>
    );
};

export default PayPalRedirect;
