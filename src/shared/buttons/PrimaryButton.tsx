function PrimaryButton({ className, text }: any) {
    return (
        <button
            className={`${className} bg-custom-primary text-custom-light rounded-[6px] text-[16px] font-semibold h-[48px] min-w-[200px] md:min-w-[457px]`}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;
