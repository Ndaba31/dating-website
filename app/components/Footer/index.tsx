
const Footer = () => {
    return (
        <footer className="bg-black text-themed-orange">
            <div className="max-w-4xl mx-auto p-8 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="md:w-2/3 mb-4 md:mb-0 md:text-left">
                        <p>
                            Come on now! Stop touching yourself and get paired up with your match today.
                            First month <strong>FREE!</strong>
                        </p>
                    </div>
                    <div className="md:w-1/3">
                        <a href="#" className="font-bold text-xl">
                            SIGN UP!
                        </a>
                    </div>
                </div>
                <p className="mt-4">&copy;Made with Stonehenge Investments</p>
            </div>
        </footer>
    );
};

export default Footer;
