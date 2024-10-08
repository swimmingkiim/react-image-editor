import React from 'react';
import useLocalStorage from './useLocalStorage';
import { NavBarItemKind } from '../navBar/NavBarButton';

const useNav = () => {
    const [ navItemList, setNavItemList ] = React.useState<NavBarItemKind[]>([]);
    const { setValue } = useLocalStorage();

    const onClickNavItem = (e: React.MouseEvent<HTMLAnchorElement>) => {

    };
    const onCreateNavItem = () => {

    };
    return {
        navItemList,
        onClickNavItem,
        onCreateNavItem,
    };
};

export default useNav;