import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BaseUrl } from '../../util/axiosApi';   

const Info_Delete: React.FC = () => {

    const navigate = useNavigate();

    const goCompany_Basic_list = () => {
      navigate('/company_basic_list')
    };
    const complete = (event: React.MouseEvent) => {
     
        axios.post( BaseUrl+'/company/delete'
            , {
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    cname: 'string',uno:0
                }
            }
        ).then(res => {
            navigate('/company_basic_list')
        }).catch(err => {
            alert('기업이 없습니다')
        });
};

    return (
        <div className='info_delete'>
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
                            onClick={(event) => complete(event)}
                     >
                        삭제
                    </Button>
                </Stack>
            </Box>

        </div>
    );
}
export default Info_Delete;