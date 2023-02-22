import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/LoginRounded';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { BaseUrl } from '../../util/axiosApi';
import { useSelector,useDispatch } from 'react-redux';
import { set } from '../../reducers/userReducer'
import * as setModal from '../../reducers/modalReducer'
import axios from "axios"
import BasicModal from '../components/basicModal';
import { RootState } from '../../reducers/index'

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const goHome = () => {
        navigate('/')
    };

    const goUser_list = () => {
        navigate('/user_list')
    };
    
    const goJoin = () => {
        navigate('/Join')
    };

    const currentModal = useSelector((state: RootState) => state.modalReducer.state);

    const ModalShow = () => {
        if(currentModal == "on"){
            return <div className='idsearchModal'><BasicModal content="아이디 찾기" _cashe='' /></div>
        }
        else if(currentModal =="on1"){
            return <div className='pwsearchModal'><BasicModal content="비밀번호 찾기" _cashe='' /></div>
        }
        else{
            return <div/>
        }
    }

    const [id, setIdValue] = React.useState('');
    const idChange = (newValue: string) => {
        setIdValue(newValue);
    };

    const [pw, setPwValue] = React.useState('');
    const pwChange = (newValue: string) => {
        setPwValue(newValue);
    };
    const dispatch = useDispatch();

    //idsearchModalopen<=reducer이용
    const IdsearchModal = () => {
        dispatch(setModal.set({state:'on', cashe1:'', cashe2:''}));
    }

    const PwsearchModal = () => {
        dispatch(setModal.set({state:'on1', cashe1:'', cashe2:''}));
    }
    
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
            dispatch(set({type: String(response.data.uno), id: id}))
            if (response.data.uno == 0){
                goUser_list()
            } else{
                goHome()
            }
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
                <TextField id="login-pw" type='password' onChange={(newValue) => pwChange(newValue.target.value)} label="비밀번호" variant="outlined" size="small"  margin="normal"/>
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
                    <Button onClick={() => { IdsearchModal() }}>아이디 찾기</Button>
                    <Button onClick={() => { PwsearchModal() }}>비밀번호 찾기</Button>
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
                        회원가입
                    </Button>
                </Stack>
            </Box>
            <ModalShow/>
        </div>
    );
}

export default Login;