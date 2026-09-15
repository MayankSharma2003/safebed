
import { FormattedMessage } from 'react-intl';
import { useLanguage } from '../i18n/languageContext';
import {useIntl} from 'react-intl';

const TopBar = () => {
    const { locale, setLocale } = useLanguage();
    const isJapanese = locale === 'ja';

    const intl = useIntl();

    return (
        <header className="sticky top-0 right-0 z-30 flex justify-between items-center px-8 ml-64 bg-slate-50/80 dark:bg-slate-600 backdrop-blur-md font-manrope">
            <div className="flex items-center gap-8 flex-1 h-13">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap "><FormattedMessage id="care_center_name" /></h2>
                <div className="relative w-full max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full bg-white border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/20 text-sm "
                        placeholder = {intl.formatMessage({id: "top_bar_placeholder"})}
                        type="text"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6 ml-4">
                <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full border border-slate-200">
                    <button 
                        onClick={() => setLocale('en')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all ${!isJapanese ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        EN
                    </button>
                    <button 
                        onClick={() => setLocale('ja')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all ${isJapanese ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        JA
                    </button>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-200">
                            <FormattedMessage id="job_title" />
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <FormattedMessage id="employee_name" />
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-white shadow-sm overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=female" alt="avatar" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;