import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Icon from '../img/logo.svg'
import Typography from '@mui/material/Typography';
import { BaseUrl } from '../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';

const Home: React.FC = () => {

    const getRank1CompanyList = async ()=>{
        const url = BaseUrl + "/company/rank"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { type: 'readcnt', f_all: 0 }
        })
        return data
    }

    const { isLoading, data, error } = useQuery('getRank1CompanyList', getRank1CompanyList);

    if(isLoading){
        return <CircularProgress />
    }
    else{
        return (
            <div className='home'>
                <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto' , mx:15, mb:15 }}>
                <Typography sx={{fontSize:20, my:5}} textAlign='center'>실시간 급상승 검색 기업 top5 !</Typography>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                    {Object.keys(data).map((value:any, index:any) => (
                        <Grid xs={2} sm={2} md={2} key={index}>
                            <Card style={{ maxHeight:400 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                            src={data[value]['logo_url']}
                                            alt="logo"/>
                                    </CardContent>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {data[value]['cname']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data[value]['address']}
                                        </Typography>
                                        <Divider/>
                                        <Box sx={{ m: 2 }}>
                                            <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                                {data[value]['form']}
                                            </Typography>
                                            <Stack direction="row" spacing={3}>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            data[value]['keyword'].split(',')[0]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ padding:'auto', width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            data[value]['keyword'].split(',')[1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            data[value]['keyword'].split(',')[2]
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
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
}
export default Home;