import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import PwValidation from '../components/pwvalidation';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import { set } from '../../reducers/modalReducer'
import BasicModal from '../components/basicModal';
import { useState } from 'react';





const Join: React.FC = (props) => {

  const navigate = useNavigate();
  const goLogin = () => {
    navigate('/login')
  };
  
  const currentModal = useSelector((state: RootState) => state.modalReducer.state);
  const dispatch = useDispatch();
  
  const [id, setIdValue] = useState('');
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = React.useState(''
  );
  const emailAdress = [
      'gmail.com',
      'naver.com',
      'hanmail.net',
      'nate.net',
  ];

  
  const idChange = (newValue: string) => {
    setIdValue(newValue);
  };
  const nameChange = (newValue: string) => {
    setIdValue(newValue);
  };
  const emailChange = (newValue: string) => {
    setEmailValue(newValue);
  };
  
  
  const handleChange = (event: SelectChangeEvent) => {
    setEmailValue(event.target.value);
  };

  //idcheckmodal
  const idOverlapCheck = () => {
    dispatch(set({
      state: 'on',
      cashe1: ''
    }));
  }
  
  const ModalShow = () => {
    if(currentModal == "on"){
      return <div className='join_modal'>
              <BasicModal content='아이디' _id={''}/>
            </div>
    }
    else{
      return <div/>
    }
  }

    return (
        <div className='join'>
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
                       mt:5, 
                       padding: 5
                    }}>
                <Typography sx={{fontSize: 32, pb:3 }}>회원 가입</Typography>
                <Stack  direction="row" spacing={2} alignItems="center" >
                    <TextField id="join-id" label="아이디" variant="outlined" size="small" margin="normal" onChange={(newValue) => idChange(newValue.target.value)}/>
                    <Button 
                      variant="contained"
                      onClick={idOverlapCheck}
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#26A689', 
                            borderColor:'#434343'
                          }} 
                    >
                      중복 확인
                    </Button>
                </Stack>
                <PwValidation/>
                <TextField id="join-name" label="이름" variant="outlined" size="small" margin="normal" sx={{ width: 200 }} onChange={(newValue) => nameChange(newValue.target.value)}/>
                <br/>
                <Stack  direction="row" spacing={3} >
                  <TextField id="login-emailid" label="이메일아이디" variant="outlined" size="small" />
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                      <Typography>@</Typography>
                  </Box>
                  <FormControl sx={{ m: 5, maxWidth: 240, width:200 }} size="small">
                  <InputLabel id="emailadress">선택 이메일</InputLabel>
                    <Select
                        labelId="emailadress"
                        id="login-emailadress"
                        value={email}
                        onChange={handleChange}
                        label="이메일주소"
                        >
                        { emailAdress.map(
                            (row, index) => {
                            return (<MenuItem value={row}>{row}</MenuItem>);
                        })}
                    </Select>
                  </FormControl>
                </Stack>
                <br/>
                <Button variant="contained"  
                        size="small" 
                        sx={{ width: 100, 
                              mt:3, mx:'auto', 
                              color:'#ffff', 
                              backgroundColor: '#26A689',
                              borderColor:'#434343'
                        }} 
                        onClick={() => { goLogin() }}
                >
                    회원 가입
                </Button>
            </Box>
            <ModalShow/>
        </div>
    );
}

export default Join;
