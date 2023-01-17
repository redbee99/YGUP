import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router';

const UserInfo_Update: React.FC = () => {

    const navigate = useNavigate();
    
    const goUserInfo = () => {
        navigate('/userinfo')
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
                        <Stack  direction="row" spacing={2} alignItems="center"sx={{py:1}}>
                            <Typography sx={{fontSize: 20 }}>아이디 :</Typography>
                            <Typography sx={{fontSize: 20 }}>Test1</Typography>
                        </Stack>
                        <Stack  direction="row" spacing={2} sx={{py:2}} >
                            <Typography sx={{fontSize: 20 }}>비밀번호 :</Typography>
                            <TextField id="update-pw" 
                                       label="비밀번호" 
                                       variant="outlined" 
                                       size="small"  
                                       margin="normal"  
                                       sx={{ width: 300 }}
                            />
                        </Stack>
                        <Stack  direction="row" spacing={2} sx={{py:1}} >
                            <Typography sx={{fontSize: 20 }}>비밀번호 확인 :</Typography>
                            <TextField id="update-pw" 
                                       label="비밀번호 확인" 
                                       variant="outlined" 
                                       size="small"  
                                       margin="normal"  
                                       sx={{ width: 300 }}
                            />                        
                            </Stack>
                        <Stack  direction="row" spacing={2} alignItems="center" sx={{py:1}}>
                            <Typography sx={{fontSize: 20 }}>이름 :</Typography>
                            <Typography sx={{fontSize: 20 }}>Test1</Typography>
                        </Stack>
                        <br/>
                        <Stack  direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{  }}>
                            <Typography sx={{fontSize: 20 , width: 110 }}>이메일 :</Typography>
                            <TextField id="login-email" label="이메일아이디" variant="outlined" size="small"/>
                            <Box sx={{ alignItems: 'center' , mx:-10}}>
                                <Typography>@</Typography>
                            </Box>
                            <TextField id="login-email" label="이메일" variant="outlined" size="small" sx={{ width: 300 }}/>
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
                            onClick={() => { goUserInfo() }}
                >
                    수정
                </Button>
            </Box>
        </div>
    );
}
export default UserInfo_Update;