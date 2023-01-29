import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import { set } from '../../reducers/modalReducer'
import { BaseUrl } from '../../util/axiosApi';


type Props = {
    content: string,
    _cashe: string
}

const BasicModal: React.FC<Props> = ({ content, _cashe }:Props) => {
    const dispatch = useDispatch();

    const [cashe,] = useState(_cashe);
    const currentModalCashe1 = useSelector((state: RootState) => state.modalReducer.cashe1);
    const currentModalCashe2 = useSelector((state: RootState) => state.modalReducer.cashe2);

    const [name,setNameValue] = useState('');

    const onChangeName = (newValue:string) => {
        setNameValue(newValue)
    }

    const [email,setEmailValue] = useState('');

    const onChangeEmail = (newValue:string) => {
        setEmailValue(newValue)
    }

    const confirm = () => {
        if(content == "아이디"){
            const url = BaseUrl + "/user/overlapid"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { id: cashe }
            })
            .then(function(response) {
                alert('사용 가능한 아이디입니다.')
                dispatch(set({state:'off', cashe1: cashe, cashe2: currentModalCashe2}))
            })
            .catch(function(error) {
                alert('중복 가입자 입니다.')
                dispatch(set({state:'off', cashe1: '', cashe2: currentModalCashe2}))
            })
        }
        else if(content == "이메일"){
            const url = BaseUrl + "/user/overlapemail"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { email: cashe }
            })
            .then(function(response) {
                alert('사용 가능한 이메일입니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: cashe}))
            })
            .catch(function(error) {
                alert('중복 가입자 입니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: ''}))
            })
        }
        else if(content == "아이디 찾기"){
            const url = BaseUrl + "/user/idsearch"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { name: name, email: email }
            })
            .then(function(response) {
                alert('사용 가능한 이메일입니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: currentModalCashe2}))
            })
            .catch(function(error) {
                alert('중복 가입자 입니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: currentModalCashe2}))
            })
        }
    }

    const DynamicContent = () => {
        if(content == "아이디"){
            return  <Box sx={{ mt:10, mb:15 }} >
                <Typography sx={{ fontSize: 20, fontWeight:'bold', mb:5}}>
                    {content} 중복확인
                </Typography>
                <TextField value={cashe} label={content} sx={{ mt:2, width:300, height:10, '& .MuiInputBase-root': { borderRadius: 15} }}/>
            </Box>
        }
        else if(content == "이메일"){
            return  <Box sx={{ mt:10, mb:15 }} >
                <Typography sx={{ fontSize: 20, fontWeight:'bold', mb:5}}>
                    {content} 중복확인
                </Typography>
                <TextField value={cashe} label={content} sx={{ mt:2, width:300, height:10, '& .MuiInputBase-root': { borderRadius: 15} }}/>
            </Box>
        }
        else if (content == "아이디 찾기") {
            return (   
                <Box sx={{ mt:5, mb:15 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                        아이디 찾기
                    </Typography>
                    <br/>
                    <Stack  direction="column" spacing={2} sx={{ pr:3, pl:3 }}>
                        <TextField value={name} onChange={(newValue) => onChangeName(newValue.target.value)} id="name" label="이름" />
                        <TextField value={email} onChange={(newValue) => onChangeEmail(newValue.target.value)} id="email" label="이메일" />
                    </Stack>
                </Box>
            )
        } else {
            return(<div/>)
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