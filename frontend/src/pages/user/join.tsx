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
import { useState, useEffect } from 'react';

const Join: React.FC = (props) => {
  const navigate = useNavigate();
  
  const goLogin = () => {
    
    navigate('/login')
  };

  const currentModal = useSelector((state: RootState) => state.modalReducer.state);
  const currentModalCashe1 = useSelector((state: RootState) => state.modalReducer.cashe1);
  const currentModalCashe2 = useSelector((state: RootState) => state.modalReducer.cashe2);

  //currentModalCashe1 변화 감지시 훅킹
  useEffect(() => {
    setIdValue(currentModalCashe1)
  }, [currentModalCashe1]);

  useEffect(() => {
    if(currentModalCashe2 == ''){
      setEmailValue(initialEmail)
    }
  }, [currentModalCashe2]);

  const dispatch = useDispatch();
  
  type email_type = {
    emailid?: string,
    address?: string
  }

  const initialEmail: email_type = {
    emailid: '',
    address: ''
}

  const [id, setIdValue] = useState(currentModalCashe1);
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = React.useState(initialEmail);
  const [modalType, setModalType] = React.useState('');
  const emailAdress = [
      'gmail.com',
      'naver.com',
      'hanmail.net',
      'nate.net',
  ];
  
  const idChange = (newValue: string) => {
    setIdValue(newValue);
  }

  const nameChange = (newValue: string) => {
    setIdValue(newValue);
  }

  const emailIdChange = (newValue: string)=> {
    setEmailValue({ emailid:newValue, address:email.address });
  }

  const handleChange = (event: SelectChangeEvent) => {
    setEmailValue({ emailid:email.emailid ,address:event.target.value as string });
  };

  //idcheckmodal
  const idOverlapCheck = () => {
    if(id != ''){
      setModalType('id')
      const totalEmail = email.emailid + '@' + email.address
      dispatch(set({state:'on', cashe1:id, cashe2:totalEmail}));
    }
    else{
      alert('아이디를 입력해주세요')
    }
  }

  //emailcheckmodal
  const emailOverlapCheck = () => {
    if(email.emailid != '' && email.address != ''){
      setModalType('email')
      const totalEmail = email.emailid + '@' + email.address
      dispatch(set({state:'on', cashe1:id, cashe2:totalEmail}));
    }
    else{
      alert('이메일을 입력해주세요')
    }
  }

  const ModalShow = () => {
    if(currentModal == "on"){
      if(modalType == 'id'){
        return <div className='join_modal'>
          <BasicModal content='아이디' _cashe={currentModalCashe1} />
        </div>
      }
      else if(modalType == 'email'){
        return <div className='join_modal'>
          <BasicModal content='이메일' _cashe={currentModalCashe2} />
        </div>
      }
      else{
        return <div/>
      }
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
                <Stack  direction="row" spacing={3} alignItems="center" >
                    <TextField value={id} id="join-id" label="아이디" variant="outlined" size="small" margin="normal" onChange={(newValue) => idChange(newValue.target.value)}/>
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
                  <TextField value={email.emailid} id="login-emailid" label="이메일아이디" variant="outlined" size="small" sx={{ maxWidth: 150 }} onChange={(newValue) => emailIdChange(newValue.target.value)}/>
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                      <Typography>@</Typography>
                  </Box>
                  <FormControl sx={{ m: 5, maxWidth: 150, width:200 }} size="small">
                  <InputLabel id="emailadress">선택 이메일</InputLabel>
                    <Select
                        labelId="emailadress"
                        id="login-emailadress"
                        value={email.address}
                        onChange={handleChange}
                        label="이메일주소"
                        >
                        { emailAdress.map(
                            (row, index) => {
                            return (<MenuItem key={index} value={row}>{row}</MenuItem>);
                        })}
                    </Select>
                  </FormControl>
                  <Button 
                      variant="contained"
                      onClick={emailOverlapCheck}
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#26A689', 
                            borderColor:'#434343',
                            maxHeight: 30
                          }} 
                    >
                      중복 확인
                    </Button>
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
