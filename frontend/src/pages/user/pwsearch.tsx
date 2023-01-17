import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const PwSearch: React.FC = () => {
    return (
        <div className='pwsearch'>
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
                       mt: 5,
                       pt:3
                    }}
            >
                <br/>
                <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                    비밀번호 찾기
                </Typography>
                <br/>
                <Box>
                    <Stack  direction="column" spacing={2} sx={{ pr:3, pl:3 }}>
                        <TextField id="login-id" label="아이디" variant="outlined" size="small" margin="normal"/>
                        <TextField id="login-name" label="이름" variant="outlined" size="small" margin="normal"/>
                        <Stack  direction="row" spacing={3} sx={{ pt: 3, pb :2}}>
                            <TextField id="login-email" label="이메일아이디" variant="outlined" size="small"/>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Typography>@</Typography>
                            </Box>
                            <TextField id="login-email" label="이메일" variant="outlined" size="small"/>
                        </Stack>
                    </Stack>
                </Box>
                <br/>
                <hr className='login-idsearch-underline'/>
                <Button variant="contained"  
                        size="small" 
                        sx={{ width: 100, 
                              mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a68a', 
                              borderColor:'#434343'
                            }} 
                >
                    찾기
                </Button>
            </Box>
        </div>
    );
}
export default PwSearch;