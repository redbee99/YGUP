import { Box, Button, Stack, Tab, Tabs, Typography, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers'
import { useQuery } from "react-query";
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';


const UserInfo: React.FC = () => {
    const navigate = useNavigate();
    
    const currentUser = useSelector((state: RootState) => state.userReducer.id);

    const [id] = React.useState(currentUser);

    React.useEffect(()=>{
        if(id == ''){
            alert('로그인 후  이용해주세요')
            navigate('/')
        }
    })

    const goPwUpdate = () => {
        navigate('/pwupdate')
    };
    const goUserInfo = () => {
        navigate('/userinfo')
    };
    const goBookmark = (state: number) => {
        navigate('/bookmark',  { state: state })
    };
    const goManage = (state: number) => {
        navigate('/manage',  { state: state })
    };
    const goUserInfo_Update = () => {
        navigate('/userinfo_update')
    };

    function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    const [value, setValue] = React.useState(0);

    const userinfo = async ()=>{
        const url = BaseUrl + "/user/userinfo"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id }
        })
        return data
    }

    const { isLoading, data, error } = useQuery('userinfo', userinfo);

    if(isLoading){
        return <CircularProgress />
    }
    else{
        return (
            <div className='userinfo'>
                <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab value={0} label="회원정보" {...a11yProps(0)} onClick={() => { goUserInfo(); } }/>
                        <Tab value={1} label="북마크" {...a11yProps(1)} onClick={() => { goBookmark(1); } }/>
                        <Tab value={2} label="자소서 관리" {...a11yProps(2)} onClick={() => { goManage(2); } } />
                    </Tabs>
                </Box>
                <Box sx={{ display: 'flex',
                        position:'relative', 
                        width:550, 
                        height: 450, 
                        margin:'auto', 
                        textAlign:'center', 
                        border: 1, 
                        borderRadius: 5, 
                        backgroundColor:'#ffffff', 
                        flexDirection: 'column',
                        mt:5, mb:15,
                        padding: 5 
                        }} 
                >    
                    <Typography sx={{fontSize: 32, pb:3 }}>회원 정보</Typography>
                    <Stack  direction="row" spacing={2} alignItems="center"sx={{px:5}}> 
                        <Stack direction="column">
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>아이디 :</Typography>
                                <Typography>{ data['result']['user']['id'] }</Typography>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>비밀번호 :</Typography>
                                <Button variant="contained"  
                                        size="small" 
                                        sx={{ width: 110, 
                                            mt:3, 
                                            mx:'auto', 
                                            color:'#ffff', 
                                            backgroundColor: '#26a69a', 
                                            borderColor:'#434343'
                                            }} 
                                        onClick={() => { goPwUpdate() }}
                                >
                                    비밀번호 변경
                                </Button>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}}>
                                <Typography sx={{fontSize: 20 }}>이름 :</Typography>
                                <Typography>{ data['result']['user']['name'] }</Typography>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>이메일 :</Typography>
                                <Typography>{ data['result']['user']['email'] }</Typography>
                            </Stack>
                        </Stack>    
                    </Stack>
                    <br/>
                    <Button variant="contained"  
                            size="small" 
                            sx={{ width: 110, 
                                mt:3, 
                                mx:'auto', 
                                color:'#ffff', 
                                backgroundColor: '#26a69a', 
                                borderColor:'#434343'
                                }} 
                            onClick={() => { goUserInfo_Update() }}
                    >
                        회원정보 수정
                    </Button>
                </Box>
            </div>
        );
    }
}

export default UserInfo;