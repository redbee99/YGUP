import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const User_Delete: React.FC = () => {

    const navigate = useNavigate();

    const goUser_list = () => {
      navigate('/user_list')
    };

    return (
        <div className='user_delete'>
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
                <Box sx={{ my:10 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold'}}>
                        정말 탈퇴 시키겠습니까?
                    </Typography>
                </Box>
                <hr className='user_delete_underline'/>
                <Stack direction="row" spacing={1} sx={{ margin:'auto' }} >
                    <Button variant="outlined"  
                            size="small" 
                            sx={{ color:'#ffff', 
                                  backgroundColor: '#5856D6', 
                                  borderColor:'#434343'
                                }} 
                            onClick={() => { goUser_list() }}
                     >
                        삭제
                    </Button>
                </Stack>
            </Box>

        </div>
    );
}
export default User_Delete;