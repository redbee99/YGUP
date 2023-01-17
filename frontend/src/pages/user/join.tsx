import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack } from '@mui/material';
import PwValidation from './pwvalidation';
import { useNavigate } from 'react-router-dom';



function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained"  
              size="small" 
              sx={{ color:'#ffff', 
                    backgroundColor: '#26a69a', 
                    borderRadius: 5    
                  }}
              onClick={handleOpen}
      >
          확 인
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
          <Box sx={{ display: 'flex',
                     position:'relative', 
                     width:400, 
                     height: 300, 
                     margin:'auto', 
                     textAlign:'center', 
                     border: 1, 
                     borderRadius: 5, 
                     backgroundColor:'#ffffff', 
                     flexDirection: 'column',
                     mt:5, 
                     padding: 5 
                }} 
          >
              <Box sx={{ mt:3}} >
                  <Box sx={{  pr:6, pl:6 }}>
                      <Box sx={{ border: 1, 
                                 height: 60, 
                                 textAlign:'center', 
                                 mt:5,mb:8, 
                                 padding:3, 
                                 borderColor: 'grey.500' 
                              }}
                      >
                          <Typography sx={{ my:'auto', mt:2, color: '#b388ff' }}>
                              ⎷사용가능한 아이디 입니다.
                          </Typography>
                      </Box>
                  </Box>
              </Box>
              <hr className='underline'/>
              <Stack direction="row" 
                     spacing={1} 
                     sx={{ margin:'auto' }} 
              >   
                  <Button variant="contained"  
                          size="small" 
                          sx={{ color:'#ffff', 
                                backgroundColor: '#26a69a', 
                                borderRadius: 5
                              }}
                          onClick = { handleClose }
                  >
                      확 인
                  </Button> 
              </Stack>
          </Box>
      </Modal>
    </React.Fragment>
  );
}
  
export function  IdCheckModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained"  
              size="small" 
              sx={{ color:'#ffff', 
                    backgroundColor: '#26a69a', 
                    borderRadius: 5
              }}
              onClick={handleOpen}
      >
        중복 확인
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
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
                  아이디 중복확인
              </Typography>
              <TextField label="아이디" sx={{ mt:2, width:300, height:10, '& .MuiInputBase-root': { borderRadius: 15} }}/>
          </Box>
          <hr className='underline'/>
          <Stack direction="row" 
                  spacing={2} 
                  sx={{ margin:'auto' }} 
          >
              <ChildModal />
              <Button variant="contained"  
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#26a69a', 
                            borderRadius: 5
                      }}
                      onClick = { handleClose }>
                  close
              </Button> 
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

  
const Join: React.FC = () => {

  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/login')
  };

  const [email, setemail] = React.useState('');
    const emailAdress = [
        'gmail.com',
        'naver.com',
        'hanmail.net',
        'nate.net',
    ];
    const handleChange = (event: SelectChangeEvent) => {
      setemail(event.target.value as string);
      };

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
                    }}
            >
                <Typography sx={{fontSize: 32, pb:3 }}>회원 가입</Typography>
                <Stack  direction="row" spacing={2} alignItems="center" >
                    <TextField id="join-id" label="아이디" variant="outlined" size="small" margin="normal"/>
                    <IdCheckModal/>
                </Stack>
                <PwValidation/>
                <TextField id="join-name" label="이름" variant="outlined" size="small" margin="normal" sx={{ width: 200 }}/>
                <br/>
                <Stack  direction="row" spacing={3} >
                  <TextField id="login-email" label="이메일아이디" variant="outlined" size="small"/>
                  <Box sx={{ display: 'flex', alignItems: 'center'}}>
                      <Typography>@</Typography>
                  </Box>
                  <FormControl sx={{ m: 5, maxWidth: 240, width:200 }} size="small">
                  <InputLabel id="emailadress">선택 이메일</InputLabel>
                    <Select
                        labelId="emailadress"
                        id="login-email"
                        value={email}
                        onChange={handleChange}
                        label="이메일주소"
                        >
                        {
                        emailAdress.map(
                            (row, index) => {
                            return (<MenuItem value={row}>{row}</MenuItem>);
                        })
                        }
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
        </div>
    );
}
export default Join;