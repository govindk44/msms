import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavbar';

const Header = () => {
    const [userType, setUserType] = useState("");

    useEffect(() => {
        setUserType(sessionStorage.getItem("user_type"));
    }, []);

    return (
        <>
            {userType === "admin" ? <AdminNavbar /> : <UserNavbar />}
        </>
    );
};

export default Header;
