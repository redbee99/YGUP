import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia, CircularProgress, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { BaseUrl } from '../util/axiosApi';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

const Home: React.FC = () => {

  const { state } = useLocation();
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
        return <CircularProgress />
    }
    else{
        return (
            <div className='home'>
                <Box sx={{ flexGrow: 1, maxWidth: 1500, margin: 'auto' , mx:15, mb:15 }}>
                <Typography sx={{fontSize:20, my:5}} textAlign='center'>실시간 급상승 검색 기업 top5 !</Typography>
                    <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 10, sm: 8, md: 10 }}>
                    {Object.keys(RankData).map((value:any, index:any) => (
                        <Grid xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(RankData[value]['cname']) }}>
                            <Card style={{ maxHeight:400 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                            src={RankData[value]['logo_url']}
                                            alt="logo"/>
                                    </CardContent>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {RankData[value]['cname']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {RankData[value]['address']}
                                        </Typography>
                                        <Divider/>
                                        <Box sx={{ m: 2 }}>
                                            <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                                {RankData[value]['form']}
                                            </Typography>
                                            <Stack direction="row" spacing={3}>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            RankData[value]['keyword'].split(',')[0]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ padding:'auto', width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            RankData[value]['keyword'].split(',')[1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            RankData[value]['keyword'].split(',')[2]
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
                    {Object.keys(BookData).map((value:any, index:any) => (
                        <Grid xs={2} sm={2} md={2} key={index} onClick={() => { goInfo(BookData[value]['cname']) }}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                    <CardMedia
                                            component="img"
                                            sx={{ marginLeft:3, width: 200 , align:'center', maxHeight:50, objectFit:"contain"}}
                                            src={BookData[value]['logo_url']}
                                            alt="logo"/>
                                    </CardContent>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" align="center">
                                            {BookData[value]['cname']}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {BookData[value]['address']}
                                        </Typography>
                                        <Divider/>
                                        <Box sx={{ m: 2 }}>
                                            <Typography gutterBottom variant="body1" sx={{ fontSize:15 }}>
                                                {BookData[value]['form']}
                                            </Typography>
                                            <Stack direction="row" spacing={3}>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            BookData[value]['keyword'].split(',')[0]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ padding:'auto', width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            BookData[value]['keyword'].split(',')[1]
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Box borderRadius={1} sx={{ width:50, height:30, border:"solid 1px black"}}>
                                                    <Typography gutterBottom variant="body1" sx={{ fontSize:15, marginLeft:1.5, marginTop:0.5 }}>
                                                        {
                                                            BookData[value]['keyword'].split(',')[2]
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
                </Box>
            </div>
        );
    }
}
export default Home;