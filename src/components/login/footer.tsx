const Footer = () => {
    return (
        <div className="bg-black flex flex-row justify-between items-center py-6 px-36 language-label">
            <div className="border border-custom-2 pl-2 rounded-sm w-[10rem] cursor-pointer">
                <p className="text-white text-left p-2 font-normal text-sm country-label">
                    English
                </p>
            </div>
            <p className="font-normal text-sm text-white">© 2025 Seezitt</p>
        </div>
    );
};

export default Footer;
