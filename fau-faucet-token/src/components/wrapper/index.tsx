import React, { useState } from "react";
import { IntlProvider } from "react-intl";

import en_US from "../../../locales/en_US";
import vi_VN from "../../../locales/vi_VN";

export const Context = React.createContext(null);
const local = localStorage.getItem('local') || navigator.language;
let lang: any;

const changeLocale = (local: string) => {
    switch (local){
        case 'en':
            lang = en_US;
        case 'vi':
            lang = vi_VN;
        default:
            lang = en_US;
    }

    localStorage.setItem('local', local);
}

console.log("nav language: ", navigator.language);
changeLocale(local)

const Wrapper = (props: any) => {
    const [locale, setLocale] = useState(local);
    const [messages, setMessages] = useState(lang);

    const selectLanguage = (e: string) => {
        const newLocale = e;
        changeLocale(e);
        setLocale(e);
        setMessages(lang);
    }

    return (

        <Context.Provider value={ { locale, selectLanguage }}>
            
        </Context.Provider>
    );
}


