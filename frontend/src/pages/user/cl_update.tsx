import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  CircularProgress, Select, SelectChangeEvent, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import { BaseUrl } from '../../util/axiosApi';
import { useQuery } from 'react-query';
import { RootState } from '../../reducers';
import { useSelector } from 'react-redux';

type ReadClInfoState = {
    type : string
    cname: string
    clno: string
    clname: string
    wdate: string
    content_1: string
    content_2: string
    content_3: string
}

const Cl_Update: React.FC = () => {

    const currentId = useSelector((state: RootState) => state.userReducer.id);
    const [id ] = React.useState(currentId);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as {data:ReadClInfoState};
    const cname = state.data.cname
    const clno = state.data.clno
    const clname = state.data.clname
    const content_1 = state.data.content_1
    const content_2 = state.data.content_2
    const content_3 = state.data.content_3

    const CompanyName = async ()=>{
        const url = BaseUrl + "/company/readall"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: {uno:0  }
        })
        return data
    }
    
    const [company, setCompany] = React.useState(state.data.cname);
    const handleChange = (event: SelectChangeEvent) => {
        setCompany(event.target.value as string);
    };

    const [clName, setclNameValue] = React.useState(state.data.clname);
    const clnameChange = (newValue: string) => {
          setclNameValue(newValue);
     };

    const [content1, setcontent1Value] = React.useState(state.data.content_1);
    const content1Change = (newValue: string) => {
          setcontent1Value(newValue);
    };

    const [content2, setcontent2Value] = React.useState(state.data.content_2);
    const content2Change = (newValue: string) => {
          setcontent2Value(newValue);
    };

    const [content3, setcontent3Value] = React.useState(state.data.content_3);
    const content3Change = (newValue: string) => {
          setcontent3Value(newValue);
    };

    const now =  new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');

    const complete = (event: React.MouseEvent) => {
        const data = {
            id:id,
            clno:clno,
            cname : company,
            clname: clName,
            content1: content1,
            content2: content2,
            content3: content3,
            wdate : now
        }

    axios.post( BaseUrl+'/cover_letter/update'
                , {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        'data': data
                    }
                }
            ).then(res => {
                navigate('/cl_info', {state: {data:clno, data1:company}})
            }).catch(err => {
                alert('정보를 다시 입력해 주세요')
            });
    };
   
const { isLoading: CompanyIsLoading, data: CompanyData, error } = useQuery('CompanyName', CompanyName);
if( CompanyIsLoading ){
    return <CircularProgress />
 }
   else{
    return (
        <div className = 'coverletter_write'>
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
                <FormControl sx={{ml:5, maxWidth: 240 }} size="small">
                    <InputLabel id="demo-select-small">기업명</InputLabel>
                    <Select
                            labelId="demo-select-small"
                            id="demo-simple-select-standard"
                            defaultValue = {cname}
                            value={company}
                            onChange={handleChange}
                            label="기업명"
                            >
                            {
                            Object.keys(CompanyData).map(
                                (result:any, index:any) => {
                                return (<MenuItem value={CompanyData[result]['cname']}>{CompanyData[result]['cname']}</MenuItem> );
                            })
                            }
                        </Select>
                </FormControl> 
                <Stack  direction="row" spacing={2} alignItems="start" padding={5} >
                    <Typography sx={{fontSize: 16, margin:'nomal'}}>글 제목 : </Typography>
                    <TextField id="outlined-multiline-static"
                               label='글 제목'
                               size='small'
                               sx={{ width: 600 }}
                               defaultValue={clname}
                               onChange={(newValue) => clnameChange(newValue.target.value)}
                    />
                </Stack>   
                <Stack  direction="column" spacing={2} alignItems="start" padding={5} marginTop={-5}>
                    <Typography sx={{fontSize: 16, pb:3}}>1.지원 동기</Typography>
                    <TextField id="outlined-multiline-static"
                               label='지원동기를 작성해주세요.'
                               multiline
                               rows={10}
                               margin="normal"
                               sx={{width:700,
                                    minheight: 100 
                                }}
                                defaultValue={content_1}
                                onChange={(newValue) => content1Change(newValue.target.value)}
                    />
                </Stack>
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
                    <Typography sx={{fontSize: 16, pb:3}}>2.성격 장-단점</Typography>
                    <TextField id="outlined-multiline-static"
                               label='성격장단점을 작성해주세요.'
                               multiline
                               rows={10}
                               margin="normal"
                               sx={{width:700,
                                    minheight: 100 }}
                               defaultValue={content_2}
                               onChange={(newValue) => content2Change(newValue.target.value)}
                               />
                </Stack>
                <Stack  direction="column" spacing={2} alignItems="start" padding={5}>
                    <Typography sx={{fontSize: 16, pb:3}}>3.업무 역량</Typography>
                    <TextField id="outlined-multiline-static"
                               label='업무 역량을 작성해주세요.'
                               multiline
                               rows={10}
                               margin="normal"
                               sx={{width:700,
                                    minheight: 100 }}
                               defaultValue={content_3}     
                               onChange={(newValue) => content3Change(newValue.target.value)}     />
                </Stack>       
                <Button variant="contained"
                        size="small" 
                        sx={{ width: 100, 
                              mt:3, mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26a69a', 
                              borderColor:'#434343'
                            }}    
                        onClick={(event) => complete(event)}
                >
                    저 장
                </Button>
            </Box>
        </div>       
    );
  }
}
export default Cl_Update;