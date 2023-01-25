import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';

const IdCheck: React.FC = () => {
    return (
        <div className='idcheck'>
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
                <Box sx={{ mt:10, mb:15 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold', mb:5}}>
                        아이디 중복확인
                    </Typography>
                    <TextField label="아이디" 
                               sx={{ mt:2, 
                                     width:300, 
                                     height:10, 
                                     '& .MuiInputBase-root': { borderRadius: 15} 
                                    }}
                    />
                </Box>
                <hr className='login-idsearch_result-underline'/>
                <Stack direction="row" spacing={1} sx={{ margin:'auto' }} >
                    <Button variant="contained"  
                            size="small" 
                            sx={{ color:'#ffff', 
                                  backgroundColor: '#26a68a', 
                                  borderColor:'#434343'
                                }}
                    >
                        중복 확인
                    </Button>
                </Stack>
            </Box>

        </div>
    );
}
export default IdCheck;