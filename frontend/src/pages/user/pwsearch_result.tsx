import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';


const PwSearch_Result: React.FC = () => {
    return (
        <div className='pwsearch_result'>
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
                       mt:5 
                  }}
            >
                <Box sx={{ mt:3}} >
                    <Typography>
                        비밀번호 찾기
                    </Typography>
                    <hr className='login-idsearch_result-underline'/>
                    <Box sx={{ pr:6, pl:6 }}>
                        <Typography sx={{ my:5 }}>
                            고객님의 정보와 일치하는 비밀번호 입니다.
                        </Typography>
                        <Box sx={{ border: 1, height: 60, textAlign:'center', mt:5,mb:8, padding:3, borderColor: 'grey.500' }}>
                            <Typography sx={{ my:3 }}>찾은 비밀번호</Typography>
                        </Box>
                    </Box>
                </Box>
                <hr className='login-idsearch_result-underline'/>
                <Stack direction="row" spacing={1} sx={{ margin:'auto' }} >
                    <Button variant="outlined"  size="small" sx={{ color:'#ffff', backgroundColor: '#26a68a', borderColor:'#434343'}} >
                        로그인 하기
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
export default PwSearch_Result;