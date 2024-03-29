function CustomButton(props: any) {
    const {
        width = '100%',
        redius = '0.375rem',
        borderColor = 'custom-primary',
        islight,
        height = '2.5rem',
        textColor = 'custom-primary',
        fontWeight = 'semibold',
        textSize = '0.875rem',
        lineHeight = '1rem',
        text
    } = props;
    return (
        <button
            className={`w-[${width ? width : 'auto'}] rounded-[${redius}] ${
                islight ? `border-[1px] border-${borderColor}` : ''
            } h-[${height}] flex justify-center items-center `}
        >
            <p
                className={`w-[100%] text-${textColor} font-${fontWeight} text-[${textSize}] leading-[${lineHeight}]`}
            >
                {text}
            </p>
        </button>
    );
}

export default CustomButton;
