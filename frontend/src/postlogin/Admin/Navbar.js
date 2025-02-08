import React, { memo } from 'react';

const Navbar = memo(({ cartCount }) => {
    return (
        <nav style={navbarStyle}>
            <div style={navItemStyle}>
                <a href="/cart" style={linkStyle}>
                    Cart ({cartCount})
                </a>
            </div>
        </nav>
    );
});

const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 20px',
    backgroundColor: '#333',
    color: 'white',
    alignItems: 'center',
};

const navItemStyle = {
    margin: '0 15px',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
};

export default Navbar;
