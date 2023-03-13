import * as React from 'react';
import Box from '@mui/material/Box';
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Stack, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseUrl } from '../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Footer from '../pages/footer';

const Home: React.FC = () => {

  const navigate = useNavigate();

  const goInfo = (data: string) => {
    navigate('/info',{
       state :{ data: data }
       })
  };

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

    const getBookRankCompanyList = async ()=>{
        const url = BaseUrl + "/company/rank"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { type: 'bookmark', f_all: 0 }
        })
        return data
    }

    const { isLoading:RankIsLoadaing, data:RankData, error : RankError } = useQuery('getRank1CompanyList', getRank1CompanyList);
    const { isLoading:BookIsLoading, data:BookData, error : BookError } = useQuery('getBookRankCompanyList', getBookRankCompanyList);

    if(RankIsLoadaing && BookIsLoading ){
        return <CircularProgress color="success"/>
    }
    else{
        return (
            <div className='home'>
                <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto' , mx:15, mb:15 }}>
                <Typography sx={{fontSize:20, my:5}} textAlign='center'>실시간 급상승 검색 기업 top5 !</Typography>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, md: 10 }}>
                    {Object.keys(RankData||{}).map((result:any, index:any) => (
                        <Grid item xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(RankData[result]['cname']) }}>
                            <Card style={{width:250, height:250, marginLeft: 50, marginTop:20, marginBottom: 20}}>
                                <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                            src={RankData[result]['logo_url']}
                                            alt="logo"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {RankData[result]['cname']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {RankData[result]['address']}
                                        </Typography>
                                            <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                                {RankData[result]['form']}
                                            </Typography>
                                            <Divider/>
                                            <Box sx={{ m: 3}}>
                                            <Stack direction="row" sx={{flexGrow: 1}} spacing={2}>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            RankData[result]['keyword'].split(',')[0]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            RankData[result]['keyword'].split(',')[1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            RankData[result]['keyword'].split(',')[2]
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
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, md: 10 }}>
                    {Object.keys(BookData||{}).map((result:any, index:any) => (
                        <Grid item xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(BookData[result]['cname']) }}>
                            <Card style={{width:250, height:250, marginLeft: 50, marginTop:20, marginBottom: 20}}>
                                <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                            src={BookData[result]['logo_url']}
                                            alt="logo"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {BookData[result]['cname']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {BookData[result]['address']}
                                        </Typography>
                                            <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                                {BookData[result]['form']}
                                            </Typography>
                                            <Divider/>
                                            <Box sx={{ m: 3}}>
                                            <Stack direction="row" sx={{flexGrow: 1}} spacing={2}>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            BookData[result]['keyword'].split(',')[0]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            BookData[result]['keyword'].split(',')[1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:350, height:30, border:"solid 1px #dfdfdf;"}}>
                                                    <Typography justify-content={'center'} variant="body1" sx={{ fontSize:15, marginLeft:1, marginTop:0.5 }}>
                                                        {
                                                            BookData[result]['keyword'].split(',')[2]
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
                  <Footer/>
                </Box>
            </div>
        );
    }
}
export default Home;