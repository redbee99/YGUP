import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Info_Delete: React.FC = () => {

    const navigate = useNavigate();

    const goCompany_Basic_list = () => {
      navigate('/company_basic_list')
    };

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
                <Box sx={{ my:10 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold'}}>
                        정말 삭제 하시겠습니까?
                    </Typography>
                </Box>
                <hr className='info_delete_underline'/>
                <Stack direction="row" spacing={1} sx={{ margin:'auto' }} >
                    <Button variant="outlined"  
                            size="small" 
                            sx={{ color:'#ffff', 
                                  backgroundColor: '#5856D6', 
                                  borderColor:'#434343'
                                }} 
                            onClick={() => { goCompany_Basic_list() }}
                     >
                        삭제
                    </Button>
                </Stack>
            </Box>

        </div>
    );
}
export default Info_Delete;