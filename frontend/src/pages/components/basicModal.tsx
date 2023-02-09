import { Stack, TextField, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import { set } from '../../reducers/modalReducer'
import { BaseUrl } from '../../util/axiosApi';
import React from "react";
import { useNavigate } from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import {useDrag} from 'react-use-gesture';
type Props = {
    content: string,
    _cashe: string
}

const BasicModal: React.FC<Props> = ({content, _cashe }:Props) => {
      /*modal drag*/
      const modalDrag = useSpring({x:0, y:0});

      const bindModaldrag = useDrag((params)=>{
          modalDrag.x.set(params.offset[0]);
          modalDrag.y.set(params.offset[1]);
        });
      /*modal Drag*/

    const dispatch = useDispatch();

    const [cashe,] = React.useState(_cashe);
    const currentModalCashe1 = useSelector((state: RootState) => state.modalReducer.cashe1);
    const currentModalCashe2 = useSelector((state: RootState) => state.modalReducer.cashe2);
    const uno = useSelector((state: RootState) => state.userReducer.type);

    let id = ''
    let name = ''
    let email = ''
    

    const onChangeId = (newValue:string) => {
        id = newValue
    }

    const onChangeName = (newValue:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        name = newValue.target.value
    }

    const onChangeEmail = (newValue:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        email = newValue.target.value
    }
    const navigate = useNavigate();
    const goCL_list = () => {
        navigate('/company_basic_list')
    };

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
        else if(content == "비밀번호 찾기"){
            const url = BaseUrl + "/user/pwsearch"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { name: name, email: email, id: id }
            })
            .then(function(response) {
                alert('사용 가능한 이메일입니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: currentModalCashe2}))
            })
            .catch(function(error) {
                alert('입력정보를 확인하세요.')
            })
          }
          else if(content == "회원 삭제"){
            const url = BaseUrl + "/user/admin_delete"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { uno: uno ,id: cashe }
            })
            .then(function(response) {
                alert('탈퇴되었습니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: currentModalCashe2}))
            })
            .catch(function(error) {
                alert('실패되었습니다.')
            })
          }
          else if(content == "기업 삭제"){
            const url = BaseUrl + "/company/delete"
            axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { uno: uno ,cname: cashe }
            })
            .then(function(response) {
                alert('삭제되었습니다.')
                dispatch(set({state:'off', cashe1: currentModalCashe1, cashe2: currentModalCashe2}))
                goCL_list()
            })
            .catch(function(error) {
                alert('실패되었습니다.')
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
                <Box sx={{ mt:10, mb:1 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                        아이디 찾기
                    </Typography>
                    <br/>
                    <Box>
                        <TextField variant="outlined" id="search-name" onChange={(newValue) => onChangeName(newValue)} label="이름" sx={{ mb:8, width:300, height:8}}/>
                        <TextField variant="outlined" id="search-email" onChange={(newValue) => onChangeEmail(newValue)} label="이메일" sx={{ mt:2, width:300, height:10 }}/>
                    </Box>
                </Box>
            )
        } else if (content == "비밀번호 찾기") {
            return (   
                <Box sx={{ mt:5, mb:5 }} >
                    <Typography sx={{ fontSize: 20, fontWeight:'bold' }} color="#434343" gutterBottom>
                        {content}
                    </Typography>
                    <br/>
                    <Box>
                        <TextField onChange={(newValue) => onChangeName(newValue)} id="name" label="이름" sx={{ mb:8, width:300, height:10}}/>
                        <TextField onChange={(newValue) => onChangeId(newValue.target.value)} id="id" label="아이디" sx={{ mb:8, width:300, height:10 }}/>
                        <TextField onChange={(newValue) => onChangeEmail(newValue)} id="email" label="이메일" sx={{  width:300, height:10 }}/>
                    </Box>
                </Box>
            )
        } else if(content == "회원 삭제"){
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
                                    onClick={() => confirm()}
                            >
                                삭제
                            </Button>
                            <Button
                    onClick={ () => dispatch(set({state:'off', cashe1:'', cashe2:''})) }
                    variant="contained"  
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
                </div>
            );
        }
        else {
            return(<div/>)
        }
    }

    if(content != "회원 삭제" ){
        return (
            <animated.div {...bindModaldrag()} style={{
                x: modalDrag.x,
                y: modalDrag.y
              }}>
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
                <Button variant="contained"  
                        size="small"
                        onClick={confirm}
                        sx={{ color:'#ffff', 
                                backgroundColor: '#26A689', 
                                borderColor:'#434343'
                            }} 
                >
                    확인
                </Button>
                <Button
                    onClick={ () => dispatch(set({state:'off', cashe1:'', cashe2:''})) }
                    variant="contained"  
                    size="small" 
                    sx={{ color:'#ffff', 
                          backgroundColor: '#26A689',
                          borderColor:'#434343'
                        }} 
                >
                    취소
                </Button>
            </Stack>
            </Box>
            </animated.div>
        );
    }
    else{
        return (<DynamicContent/>);
    }

}
export default BasicModal;