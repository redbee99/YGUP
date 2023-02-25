import { Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import { set } from '../../reducers/modalReducer'
import BasicModal from '../components/basicModal';
import { useState, useEffect } from 'react';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import { reset } from '../../reducers/headerReducer';

// 다 날라가서 처음부터 다시 해야합니다.
const UserInfo_Update: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const goUserInfo = () => {
        navigate('/userinfo')
    };
    const currentModal = useSelector((state: RootState) => state.modalReducer.state);
    const currentModalCashe1 = useSelector((state: RootState) => state.modalReducer.cashe1);
    const currentModalCashe2 = useSelector((state: RootState) => state.modalReducer.cashe2);
    useEffect(() => {
        if(currentModalCashe2 == ''){
          setEmailValue(initialEmail)
        }
    }, [currentModalCashe2]);
    
    const dispatch = useDispatch();
    type email_type = {
        emailid?: string,
        address?: string
    }
   
    const initialEmail: email_type = {
        emailid: location.state['result']['user']['email'].split('@')[0],
        address: location.state['result']['user']['email'].split('@')[1]
    }

    const currentUser = useSelector((state: RootState) => state.userReducer.id);
    const [id] = React.useState(currentUser);
    const [pw, setPwValue] = React.useState('');
    const [name, setNameValue] = useState(location.state['result']['user']['name']);
    const [email, setEmailValue] = React.useState(initialEmail);
    const [modalType, setModalType] = React.useState('');
    const emailAdress = [
        'gmail.com',
        'naver.com',
        'hanmail.net',
        'nate.net',
    ];
    
    const nameChange = (newValue: string) => {
        setNameValue(newValue);
    }
    const pwChange = (newValue: string) => {
        setPwValue(newValue);
    };
    const emailIdChange = (newValue: string)=> {
        setEmailValue({ emailid:newValue, address:email.address });
    }
    
    const handleChange = (event: SelectChangeEvent) => {
        setEmailValue({ emailid:email.emailid ,address:event.target.value as string });
    };
    //emailcheckmodal
    const emailOverlapCheck = () => {
        if(email.emailid != '' && email.address != ''){
            setModalType('email')
            const totalEmail = email.emailid + '@' + email.address
            dispatch(set({state:'on', cashe1:'', cashe2:totalEmail}));
        }
        else{
            alert('이메일을 입력해주세요')
        }
    }

    const ModalShow = () => {
        if(currentModal == "on"){
            if(modalType == 'email'){
                return <div className='emailoverlapcheck'><BasicModal content='이메일' _cashe={currentModalCashe2} /></div>
            }
            else{
                return <div/>
            }
        }
        else{
          return <div/>
        }
    }

    const userinfo_update = () => {
        const url = BaseUrl + "/user/userinfo_update"
          axios.post(url, {
              headers:  { "Content-Type": "application/json" },
              body: { 
                id: id, pw:pw, name:name, email:currentModalCashe2
            }
          })
          .then(function(response) {
              alert('회원정보 업데이트 성공')
              goUserInfo()         
          })
          .catch(function(error) {
              alert('회원정보 업데이트 실패')
          })
        };
    return (
        <div className='userinfo_update'>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:600, 
                       height: 450, 
                       margin:'auto', 
                       textAlign:'center', 
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column',
                       my:5, 
                       padding: 3,
                       mt:10
                    }} 
            >
                <Typography sx={{fontSize: 32, pb:3 }}>회원 정보 수정</Typography>
                <Stack  direction="row" spacing={2} alignItems="center"sx={{px:5}}> 
                    <Stack  direction="column" >
                        <Stack  direction="row" spacing={2} alignItems="center" sx={{py:1}}>
                                <Typography sx={{fontSize: 20 }}>이름 :</Typography>
                                <TextField id="userinfo-name" defaultValue={location.state['result']['user']['name']} variant="outlined" size="small" margin="normal" sx={{ width: 200 }} onChange={(newValue) => nameChange(newValue.target.value)}/>
                            
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center"sx={{py:1}}>
                                <Typography sx={{fontSize: 20 }}>아이디 :</Typography>
                                <TextField id="userinfo-name" value={location.state['result']['user']['id']} variant="outlined" size="small" margin="normal" sx={{ width: 200 }} onChange={(newValue) => nameChange(newValue.target.value)}/>
                            </Stack>
                            <Stack  direction="row" spacing={2} sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>비밀번호 :</Typography>
                                <TextField id="update-pw" 
                                        label="비밀번호" 
                                        variant="outlined" 
                                        size="small"  
                                        margin="normal"  
                                        sx={{ width: 300 }}
                                        type='password'
                                        onChange={(newValue) => pwChange(newValue.target.value)}
                                />
                            </Stack>
                            <br/>
                            <Stack  direction="row" spacing={3} >
                                <TextField  defaultValue={location.state['result']['user']['email'].split('@')[0]} id="login-emailid" variant="outlined" size="small" sx={{ maxWidth: 150 }} onChange={(newValue) => emailIdChange(newValue.target.value)}/>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Typography>@</Typography>
                                </Box>
                                <FormControl sx={{ m: 5, maxWidth: 150, width:200 }} size="small">
                                <InputLabel id="emailadress" />
                                    <Select
                                        labelId="emailadress"
                                        id="login-emailadress"
                                        defaultValue={location.state['result']['user']['email'].split('@')[1]}
                                        onChange={handleChange}
                                    >
                                    { emailAdress.map(
                                        (row, index) => {
                                        return (<MenuItem key={index} value={row}>{row}</MenuItem>);
                                    })}
                                    </Select>
                                </FormControl>
                                <Button 
                                    variant="contained"
                                    onClick={emailOverlapCheck}
                                    size="small" 
                                    sx={{ color:'#ffff', 
                                    backgroundColor: '#26A689', 
                                    borderColor:'#434343',
                                    maxHeight: 30
                                }} 
                                >
                                중복 확인
                                </Button>
                        </Stack>
                    </Stack>                  
                </Stack>
                <br/>
                <Button variant="contained"  
                        size="small" 
                        sx={{ width: 100, 
                              mt:3, 
                              mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a69a', 
                              borderColor:'#434343'
                            }} 
                            onClick={() => { userinfo_update() }}
                >
                    수정
                </Button>
            </Box>
            <ModalShow/>
        </div> 
    );
}

export default UserInfo_Update;