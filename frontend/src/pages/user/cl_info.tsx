import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { CircularProgress, Select, SelectChangeEvent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import { BaseUrl } from '../../util/axiosApi';
import { useQuery } from 'react-query';
import { RootState } from '../../reducers';
import {  useDispatch, useSelector } from 'react-redux';
import BasicModal from '../components/basicModal';
import { set } from '../../reducers/modalReducer';


type ReadClInfoState = {
    type : String
    clno: String
    cname : String
} 

const Cl_Info: React.FC = () => {
    const location = useLocation();
    const currentId = useSelector((state: RootState) => state.userReducer.id);
    const [id] = React.useState(currentId);
    const state = location.state as {data:ReadClInfoState,data1:ReadClInfoState};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentModal = useSelector((state: RootState) => state.modalReducer.state);
    const [clno, setClnoValue] = React.useState('');

    const Clno = state.data
    const Cname = state.data1

    const goManage = () =>{
    navigate('/manage')
    }

    const Clinfo_delete = (_clno: string) => {
      setClnoValue(_clno)
      dispatch(set({state:'on', cashe1: clno, cashe2: ''}))
    }

    const ModalShow = () => {
      if(currentModal == 'on'){
          return <div className='cl_info_delete_modal'>
            <BasicModal content='자소서 삭제' _cashe={clno} />
          </div>
      }
      else{
        return <div/>
      }
    }

  const CompanyName1 = async ()=>{
    const url = BaseUrl + "/cover_letter/read_one"
    const { data } = await axios.post(url, {
         headers: 
         {
            "Content-Type": "application/json"
         },
          body: {clno: Clno, cname : Cname}
     })
     return data
}
 const { isLoading: ClIsLoading, data: ClData, error } = useQuery('CompanyName1', CompanyName1);
  if( ClIsLoading ){
    return <CircularProgress />
 }
  else{
    const goClUpdate = () => {
        navigate('/cl_update',{
           state :{ data: ClData.result.cover_letter
             }
           })
         };
    return (
        <div className='predicttest'>
           <ModalShow/> 
            <Box height={'40%'} sx={{fontSize: 32,mb:1}}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    sx={{mt:5}}
                >
                    <Typography sx={{fontSize: 32}}>{ClData['result']['cover_letter']['cname']} 기업</Typography>
                    <Typography sx={{fontSize: 32}}> 합격률(키워드 예측): {ClData['cnt1']+'%'}</Typography>
                    <Typography sx={{fontSize: 32}}>내가 쓴 키워드 : {ClData['new']+' '+ClData['cnt']+'개'} </Typography>
                </Stack>
            </Box>
            <Box sx={{ display: 'flex',
                       position:'relative', 
                       width:800,
                       height: 'auto',
                       minHeight: 1000,
                       textAlign:'center', 
                       border: 1, 
                       borderRadius: 5, 
                       backgroundColor:'#ffffff', 
                       flexDirection: 'column',
                       mx:'auto',
                       mt:10, 
                       mb:20,
                       padding: 5
                    }}
            >
                <Typography sx={{fontSize: 32, pb:3 }}>자기소개서</Typography>
                <Typography>기업명 : {ClData['result']['cover_letter']['cname']}</Typography>
                <Stack  direction="row" spacing={2} alignItems="start" padding={5} >
                <Typography sx={{fontSize: 16, margin:'nomal'}}>글 제목 : { ClData['result']['cover_letter']['clname'] }</Typography> 
                </Stack>   
                <Stack  direction="column" spacing={2} alignItems="start" padding={5} marginTop={-5}>
                    <Typography sx={{fontSize: 16, pb:3}}>1.지원 동기</Typography>
                    <Typography sx={{fontSize: 16, pb:3}}> { ClData['result']['cover_letter']['content_1'] }</Typography>
                </Stack>
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
                    <Typography sx={{fontSize: 16, pb:3}}>2.성격 장-단점</Typography>
                    <Typography sx={{fontSize: 16, pb:3}}> { ClData['result']['cover_letter']['content_2'] }</Typography>
                </Stack>
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
                    <Typography sx={{fontSize: 16, pb:3}}>3.업무 역량</Typography>
                    <Typography sx={{fontSize: 16, pb:3}}> { ClData['result']['cover_letter']['content_3'] }</Typography>
                </Stack>       
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} 
                     onClick={() => { goClUpdate() }}>
                  수정
                </Button>
                <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} 
                      onClick={() => { Clinfo_delete(ClData['result']['cover_letter']['clno']);}}>
                  삭제
                </Button>
                <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}}
                      onClick={() => {goManage();}}>
                  확인
                </Button>
                </Stack>
            </Box>
        </div>
    );
  }
}
export default Cl_Info;