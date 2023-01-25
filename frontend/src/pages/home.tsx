import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia, Divider, Stack } from '@mui/material';
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
            <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto' , mx:15, mb:15 }}>
            <Typography sx={{fontSize:20, my:5}} textAlign='center'>실시간 급상승 검색 기업 top5 !</Typography>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                {Array.from(Array(5)).map((_, index) => (
                    <Grid xs={2} sm={2} md={2} key={index}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 200 ,align:'center'}}
                                        image={Icon}
                                        alt="Paella dish"/>
                                </CardContent>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" align="center">
                                        기업설명
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        기업설명입니다.
                                    </Typography>
                                    <Divider/>
                                    <Box sx={{ m: 2 }}>
                                        <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                            기업정보
                                        </Typography>
                                        <Stack direction="row" spacing={3}>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>매출</Box>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>연봉</Box>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>퇴사율</Box>
                                        </Stack>
                                    </Box>
                                    <Divider/>
                                    <Stack direction="row" spacing={3}>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
                <Typography sx={{fontSize:20, my:5}} textAlign='center'>기업 랭킹 top5 !</Typography>
                <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                {Array.from(Array(5)).map((_, index) => (
                    <Grid xs={2} sm={2} md={2} key={index}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 200 ,align:'center'}}
                                        image={Icon}
                                        alt="Paella dish"/>
                                </CardContent>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" align="center">
                                        기업설명
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        기업설명입니다.
                                    </Typography>
                                    <Divider/>
                                    <Box sx={{ m: 2 }}>
                                        <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                            기업정보
                                        </Typography>
                                        <Stack direction="row" spacing={3}>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>매출</Box>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>연봉</Box>
                                            <Box borderRadius={1} sx={{ width:50, height:30, backgroundColor:'grey.300'}}>퇴사율</Box>
                                        </Stack>
                                    </Box>
                                    <Divider/>
                                    <Stack direction="row" spacing={3}>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                        <Typography sx={{fontSize:10}}>keyword</Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Home;