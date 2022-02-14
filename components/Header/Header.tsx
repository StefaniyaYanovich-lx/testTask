import styles from './Header.module.css'
import { AccountCircle, ArrowDropDown}  from '@material-ui/icons';
import {IHeaderData} from "../../types/types";

export const Header = ({ logo, menuLabel } : IHeaderData) => {
    return (
        <header>
            <div className={styles.logo}>
                <img src={logo.url} alt={logo.title}/>
            </div>
            <div className={styles.header}>
                <span className={styles.menuLabel}>{menuLabel}</span>
                <div className={styles.login}>
                    <AccountCircle/>
                    <span>Name</span>
                    <ArrowDropDown/>
                </div>
            </div>
        </header>
    )
}