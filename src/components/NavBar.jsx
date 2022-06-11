import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                component={Link}
                to='/'
                label="Home"
                value="home"
                icon={<HomeOutlinedIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to='/search'
                label="Search"
                value="search"
                icon={<SearchIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to='/orders'
                label="Orders"
                value="orders"
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                component={Link}
                to="/profile"
                label="Profile"
                value="profile"
                icon={<PersonOutlineOutlinedIcon />}
            />
        </BottomNavigation>
    );
}