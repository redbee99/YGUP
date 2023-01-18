import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Icon from '../img/logo.svg'
import Typography from '@mui/material/Typography';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 'auto',
  margin:'auto',
  maxWidth: 400,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home: React.FC = () => {
    return (
        <div className='home'>
            <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto' , mx:20, mb:15 }}>
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                {Array.from(Array(8)).map((_, index) => (
                    <Grid xs={2} sm={1} md={2} key={index}>
                    <Item>
                        <CardContent >
                            <CardMedia
                                component="img"
                                sx={{ width: 250 }}
                                image={Icon}
                                alt="Paella dish"/>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            기업설명
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            기업설명입니다.
                            </Typography>
                        </CardContent>
                    </Item>
                    </Grid>
                ))}
                </Grid>
            </Box>
        </div>
    );
}
export default Home;