import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Icon from '../../img/logo.svg'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 'auto',
  maxWidth: 300,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Company_Basic_List: React.FC = () => {

const navigate = useNavigate();

const goInfo = () => {
    navigate('/info')
};

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto'}}>
            <Grid container spacing={{ xs: 1, md: 10 }} columns={{ xs: 4, sm: 8, md: 6 }}>
            {Array.from(Array(6)).map((_, index) => (
                <Grid xs={2} sm={1} md={2} key={index}>
                <Item onClick={() => { goInfo() }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 250 }}
                            image={Icon}
                            alt="Paella dish"
                        />
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        기업명
                        </Typography>
                    </CardContent>
                </Item>
                </Grid>
            ))}
            </Grid>
            <Stack sx={{marginLeft:63 , marginTop:5}}spacing={2}>
                <Pagination count={10} color='standard' />
             </Stack>
        </Box>
    );
}

export default Company_Basic_List;