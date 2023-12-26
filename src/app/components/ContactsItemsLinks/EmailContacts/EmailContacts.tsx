import { ReactNode } from 'react';
import style from './EmailContacts.module.scss';
const EmailContacts = ({className, href, children} : {className:string, href:string, children:ReactNode}) => {
    return (
        <a href={href} className={`${style['contacts-item-email']} ${className}`}>
            {children}
        </a>
    );
};

export default EmailContacts;