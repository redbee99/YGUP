import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Stack, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function  IdCheckModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined"  
              size="small" 
              sx={{ width: 100, 
                    height:20, 
                    color:'#ffff', 
                    backgroundColor: '#5856D6', 
                    borderColor:'#434343', 
                    borderRadius: 10 
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
          <hr className='login-idsearch_result-underline'/>
          <Stack direction="row" spacing={2} sx={{ margin:'auto' }} >
              <Button variant="outlined"  
                      size="small" 
                      sx={{ color:'#ffff', 
                            backgroundColor: '#5856D6', 
                            borderColor:'#434343'
                          }} 
              >
                  중복 확인
              </Button>
          </Stack>
          <ChildModal />
        </Box>
       
      </Modal>
    </div>
  );
}
