'use client'
import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { setIsToggleMenu, setLanguageValue } from "@/app/redux/slice/languageSlice";


const LanguagePanel = () => {

    const { language, isOpen } = useAppSelector((state:{languageReduser:any}) => state.languageReduser);
    const dispatch = useAppDispatch();
    const toggleDropdown = () => {
        dispatch(setIsToggleMenu(true))
    };
    const handleButtonClick = (value:string) => {
        dispatch(setLanguageValue(value));
        dispatch(setIsToggleMenu(false));
    }
    return (
        <div className="header__dropdown">
            <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                <div className="dropdown__language" onClick={toggleDropdown}>
                    {language}
                </div>
                {isOpen && (
                    <div className="dropdown-menu">
                        <button type='button'
                            className={`dropdown-item ${language === 'RUS' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('RUS')}>
                            Русский
                        </button>
                        <button type='button'
                            className={`dropdown-item ${language === 'EN' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('EN')}>
                            English
                        </button>
                        <button type='button'
                            className={`dropdown-item ${language === 'PL' ? 'active' : ''}`}
                            onClick={() => handleButtonClick('PL')}>
                            Polski
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguagePanel;