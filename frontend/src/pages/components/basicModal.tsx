import { Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { set } from '../../reducers/modalReducer'


type Props = {
    content: string;
}

const BasicModal: React.FC<Props> = ({ content }) => {
    const dispatch = useDispatch();

    const confirm = () => {
        dispatch(set({state:'off'}))
    }

    return(
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
                {content} 중복확인
            </Typography>
            <TextField label={content} sx={{ mt:2, width:300, height:10, '& .MuiInputBase-root': { borderRadius: 15} }}/>
        </Box>
        <hr className='login-idsearch_result-underline'/>
        <Stack direction="row" spacing={2} sx={{ margin:'auto' }} >
            <Button variant="outlined"  
                    size="small"
                    onClick={confirm}
                    sx={{ color:'#ffff', 
                            backgroundColor: '#5856D6', 
                            borderColor:'#434343'
                        }} 
            >
                확인
            </Button>
            <Button variant="outlined"  
                    size="small" 
                    sx={{ color:'#ffff', 
                            backgroundColor: '#5856D6', 
                            borderColor:'#434343'
                        }} 
            >
                취소
            </Button>
        </Stack>
        </Box>
    );
}
export default BasicModal;