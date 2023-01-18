import { Typography } from '@mui/material';
import * as React from 'react';
import '../App.css';


const Footer: React.FC = () => {

    const thisYear = () => {
        const year = new Date().getFullYear();
        return year
    };

    return(
        <footer className='App-footer'>
            <div>
                <Typography>yogiup &copy; {thisYear()}</Typography>
            </div>
        </footer>
    );
}
export default Footer;