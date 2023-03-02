import { Box, Button, Stack, Tab, Tabs, Typography, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../reducers'
import { useQuery } from "react-query";
import { BaseUrl } from '../../util/axiosApi';
import BasicModal from '../components/basicModal';
import * as setModal from '../../reducers/modalReducer'
import axios from 'axios';
import { set } from '../../reducers/modalReducer'


const UserInfo: React.FC = () => {
    const navigate = useNavigate();
    
    const currentUser = useSelector((state: RootState) => state.userReducer.id);

    const [id,setIdValue] = React.useState(currentUser);

    React.useEffect(()=>{
        if(id == ''){
            alert('로그인 후  이용해주세요')
            navigate('/')
        }
    })


    const dispatch = useDispatch();

    const currentModal = useSelector((state: RootState) => state.modalReducer.state);
    const currentModal1 = useSelector((state: RootState) => state.modalReducer.state);

    const ModalShow = () => {
        if(currentModal == "on"){
            return <div className='idsearchModal'><BasicModal content="회원탈퇴" _cashe={String(id)} /></div>
        }else if(currentModal1 =="on1"){
            return <div className='pwudateModal'><BasicModal content="비밀번호 변경" _cashe={String(id)} /></div>
        }else{
            return <div/>
        }
    }

    const DeleteModal = (_id: string) => {
        setIdValue(_id)
        dispatch(set({state:'on', cashe1: String(id), cashe2:''}))
    }

    const Pwupdate  = () => {
        dispatch(setModal.set({state:'on1', cashe1:'', cashe2:''}));
    }

    const userinfo = async ()=>{
        const url = BaseUrl + "/user/userinfo"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id }
        })
        return data
    }

    const { isLoading, data, error } = useQuery('userinfo', userinfo);

    if(isLoading){
        return <CircularProgress />
    }
    else{
        const goUserInfo_Update = () => {
            navigate('/userinfo_update', {state : data})
        };
        return (
            <div className='userinfo'>
                <Box sx={{ display: 'flex',
                        position:'relative', 
                        width:550, 
                        height: 450, 
                        margin:'auto', 
                        textAlign:'center', 
                        border: 1, 
                        borderRadius: 5, 
                        backgroundColor:'#ffffff', 
                        flexDirection: 'column',
                        mt:5, mb:15,
                        padding: 5 
                        }} 
                >    
                    <Typography sx={{fontSize: 32, pb:3 }}>회원 정보</Typography>
                    <Stack  direction="row" spacing={2} alignItems="center"sx={{margin:'auto'}}> 
                        <Stack direction="column">
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>아이디 :</Typography>
                                <Typography>{ data['result']['user']['id'] }</Typography>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>비밀번호 :</Typography>
                                <Button variant="contained"  
                                        size="small" 
                                        sx={{ width: 110, 
                                            mt:3, 
                                            mx:'auto', 
                                            color:'#ffff', 
                                            backgroundColor: '#26a69a', 
                                            borderColor:'#434343'
                                            }} 
                                            onClick={() => { Pwupdate() }}
                                >
                                    비밀번호 변경
                                </Button>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}}>
                                <Typography sx={{fontSize: 20 }}>이름 :</Typography>
                                <Typography>{ data['result']['user']['name'] }</Typography>
                            </Stack>
                            <Stack  direction="row" spacing={2} alignItems="center" sx={{py:2}} >
                                <Typography sx={{fontSize: 20 }}>이메일 :</Typography>
                                <Typography>{ data['result']['user']['email'] }</Typography>
                            </Stack>
                        </Stack>    
                    </Stack>
                    <br/>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ margin:'auto' }} >
                        <Button variant="contained"  
                            size="small" 
                            sx={{ width: 110, 
                                mx:'auto', 
                                color:'#ffff', 
                                backgroundColor: '#26a69a', 
                                borderColor:'#434343'
                                }} 
                            onClick={() => { goUserInfo_Update() }}
                        >
                            회원정보 수정
                        </Button>
                        <Button variant="contained"  
                            size="small" 
                            sx={{ width: 110, 
                                mx:'auto', 
                                color:'#ffff', 
                                backgroundColor: '#26a69a', 
                                borderColor:'#434343'
                                }} 
                            onClick={() => { DeleteModal(data['result']['user']['id'])}}
                        >
                            회원탈퇴
                        </Button>
                    </Stack>
                </Box>
                <ModalShow/>
            </div>
        );
    }
}

export default UserInfo;