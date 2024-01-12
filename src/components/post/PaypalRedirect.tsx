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
        <div>
            {/* You can render additional components or a loading message here */}
            Loading PayPal Redirect...
        </div>
    );
};

export default PayPalRedirect;
