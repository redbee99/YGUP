import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/LoginRounded';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { BaseUrl } from '../../util/axiosApi';
import { useDispatch } from 'react-redux';
import { set } from '../../reducers/userReducer'
import axios from "axios"

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const goHome = () => {
        navigate('/')
    };

    const goIdsearch = () => {
        navigate('/Idsearch')
    };
    const goPwsearch = () => {
        navigate('/Pwsearch')
    };
    const goJoin = () => {
        navigate('/Join')
    };

    const [id, setIdValue] = React.useState('');
    const idChange = (newValue: string) => {
        setIdValue(newValue);
    };

    const [pw, setPwValue] = React.useState('');
    const pwChange = (newValue: string) => {
        setPwValue(newValue);
    };
    const dispatch = useDispatch();

    const login = () => {
        const url = BaseUrl + "/user/login"
        axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id, pw: pw }
        })
        .then(function(response) {
            dispatch(set('admin'))
            goHome()
        })
        .catch(function(error) {
            alert('로그인정보를 확인해 주세요')
        })
    };

    return (
        <div className='Login'>
            <br/>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:400, 
                       height:400, 
                       margin:'auto',
                       textAlign:'center',
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column', 
                       mt:5, 
                       pl:3,
                       pr:3
                    }}
            >
                <br/>
                <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                    로그인
                </Typography>
                <br/>

                <TextField id="login-id" onChange={(newValue) => idChange(newValue.target.value)} label="아이디" variant="outlined" size="small" margin="normal"/>
                <TextField id="login-pw" onChange={(newValue) => pwChange(newValue.target.value)} label="비밀번호" variant="outlined" size="small"  margin="normal"/>
                <br/>

                <Button variant="contained" 
                        onClick={(event) => login()}

                        sx={{ color:'#ffff', 
                              backgroundColor: '#26a68a', 
                              borderColor:'#434343'
                            }} 
                        startIcon={<LoginIcon />}
                >
                    로그인
                </Button>
                <br/>
                <Stack direction="row" spacing={2} sx={{ marginLeft:'auto', marginRight:'auto'}}>
                    <Button onClick={() => { goIdsearch() }}>아이디 찾기</Button>
                    <Button onClick={() => { goPwsearch() }}>비밀번호 찾기</Button>
                </Stack>
                <hr className='login-underline'/>
                <Stack direction="row" spacing={2} sx={{ marginLeft:'auto', marginRight:'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h6"  sx={{ fontWeight:'bold' }}>
                            아직 회원이 아니세요?
                        </Typography>
                    </Box>
                    <Button sx={{ color: '#26a68a', 
                                  fontSize: 'x-large',
                                  fontWeight:'bold',
                                  backgroundcolor:'#26a68a' 
                                }} 
                            onClick={() => { goJoin() }}
                    >
                        회원 가입
                    </Button>
                </Stack>
                
            </Box>
        </div>
    );
}

export default Login;