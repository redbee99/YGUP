import { Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { set } from '../../reducers/modalReducer'
import { BaseUrl } from '../../util/axiosApi';


type Props = {
    content: string,
    _id: string
}

const BasicModal: React.FC<Props> = ({ content, _id }) => {
    const dispatch = useDispatch();

    const [id, setIdValue] = useState(_id);

    const confirm = () => {
        if(content == "아이디"){
            const url = BaseUrl + "/user/overlapid"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { id: id }
            })
            .then(function(response) {
                alert('사용 가능한 아이디입니다.')
                dispatch(set({state:'off', cashe1: id}))
            })
            .catch(function(error) {
                alert('중복 가입자 입니다.')
                dispatch(set({state:'off', cashe1: ''}))
            })
        }
    }

    const DynamicContent = () => {
        if(content == "아이디"){
            return  <Box sx={{ mt:10, mb:15 }} >
            <Typography sx={{ fontSize: 20, fontWeight:'bold', mb:5}}>
                {content} 중복확인
            </Typography>
            <TextField value={id} label={content} sx={{ mt:2, width:300, height:10, '& .MuiInputBase-root': { borderRadius: 15} }}/>
        </Box>
        }
        else{
            return <div/>
        }
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
        <DynamicContent/>
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