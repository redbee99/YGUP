import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress, Stack } from '@mui/material';
import { CardMedia } from '@mui/material'
import Card from '@mui/material/Card';
import { experimentalStyled as styled } from '@mui/material/styles';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from "react-query";
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 'auto',
    maxWidth: 400,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Info: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [companyName,] = React.useState(state);
    
    const goUpdate = () => {
      navigate('/info_update')
    };
    const goDelete = () => {
      navigate('/info_delete')
    }

    const getCompany = async ()=>{
        const url = BaseUrl + "/company/readcompany"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { cname: companyName }
        })
        return data
    }

    const { isLoading, data, error } = useQuery('getCompany', getCompany);

    if(isLoading){
        return <CircularProgress />
    }
    else{
        return (
            <div className='info'>
                <Box sx={{ display: 'flex',position:'relative', width:550, height: 700, margin:'auto', textAlign:'center', border: 1, borderRadius: 5, backgroundColor:'#ffffff', flexDirection: 'column',mt:5, padding: 5 }} >
                    <Stack  direction="row" spacing={2} alignItems="center" >
                    <Item sx={{margin:'auto'}}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{ height: 80}}
                                src={data['result']['company']['logo_url']}
                                alt="Logo"
                            />
                        </Card>
                    </Item>
                    </Stack>
                    <br/>
                    <Typography>회사명 : { data['result']['company']['cname'] }</Typography>
                    <br/>
                    <Typography>홈페이지 : { data['result']['company']['form'] }</Typography>
                    <br/>
                    <Typography>기업규모 : { data['result']['company']['courl'] }</Typography>
                    <hr className='info_underline'/>
                    <br/>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography>매출액 :<AutoGraphIcon/>{data['result']['company']['sales']}</Typography>
                    <Typography>평균연봉 : <AttachMoneyIcon/>{data['result']['company']['pay']}</Typography>
                    <Typography>퇴사율 : <DirectionsRunIcon/>{data['result']['company']['resign']}</Typography>
                    </Stack>
                    <br/>
                    <Typography>대표자명 : { data['result']['company']['owner'] }</Typography>
                    <br/>
                    <Typography>기업주소 : { data['result']['company']['address'] }</Typography>
                    <br/>
                    <Typography>기업내용 : { data['result']['company']['info'] }</Typography>
                    <hr className='info_underline'/>
                    <Item sx={{margin:'auto'}}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{ height: 200}}
                                src={data['result']['company']['wcloud_url']}
                                alt="wcloud"
                            />
                        </Card>
                    </Item>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goUpdate() }}>
                            수정
                        </Button>
                        <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goDelete() }}>
                            삭제
                        </Button>
                    </Stack>
                </Box>
            </div>
        );
    }
}
export default Info;