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
import { useSelector } from 'react-redux';


type ReadClInfoState = {
    type : string
    clno: string
} 

const Cl_Info: React.FC = () => {
    const location = useLocation();
    const currentId = useSelector((state: RootState) => state.userReducer.id);
    const [id ] = React.useState(currentId);
    const state = location.state as {data:ReadClInfoState};
    const navigate = useNavigate();

    const Clno = state.data
    const goManage = () =>{
    navigate('/manage')
    }
    
  const CompanyName = async ()=>{
     const url = BaseUrl + "/cover_letter/read_one"
    const { data } = await axios.post(url, {
         headers: 
         {
            "Content-Type": "application/json"
         },
          body: {clno: Clno}
     })
     return data
}
 const { isLoading: ClIsLoading, data: ClData, error } = useQuery('CompanyName', CompanyName);
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
            <Box height={'40%'} sx={{mb:1}}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{mt:5}}
                >
                    <Typography>합격 예측 기업 : 확률%</Typography>
                    <Box>키워드 단어들</Box>
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
                <Button variant="contained"
                        size="small" 
                        sx={{ width: 100, 
                              mt:3, mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a69a', 
                              borderColor:'#434343'
                            }}
                        onClick={() => {goManage();}}
                >
                    확인
                </Button>
                <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goClUpdate() }}>
                            수정
                </Button>
                </Stack>
            </Box>
        </div>
    );
  }
}
export default Cl_Info;