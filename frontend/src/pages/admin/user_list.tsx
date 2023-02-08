import * as React from 'react';
import User from '../components/user';
import { Search, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../util/axiosApi';   
import axios from 'axios';
import { useQuery } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Box, 
         Tab, 
         Tabs,
         IconButton, 
         Paper, 
         Stack,
         styled, 
         Table, 
         TableBody, 
         TableCell, 
         tableCellClasses, 
         TableContainer, 
         TableHead, 
         TableRow,
         CircularProgress, 
         Typography,
         alpha,
         InputBase} from '@mui/material';
import { set } from '../../reducers/modalReducer'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index'
import BasicModal from '../components/basicModal';
        
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    }));
          
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
       '&:last-child td, &:last-child th': {
      border: 0,
          },
            }));           
           
const User_list: React.FC = () => {

  
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
},
marginLeft: 0,
width: '100%',
[theme.breakpoints.up('sm')]: {
marginLeft: theme.spacing(1),
width: 'auto',
},
}));
     
const SearchIconWrapper = styled('div')(({ theme }) => ({
 padding: theme.spacing(0, 2),
 height: '100%',
 position: 'absolute',
 pointerEvents: 'none',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
}));
     
const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
   padding: theme.spacing(1, 1, 1, 0),
   // vertical padding + font size from searchIcon
   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
   transition: theme.transitions.create('width'),
   width: '100%',
   [theme.breakpoints.up('sm')]: {
   width: '12ch',
   '&:focus': {
    width: '20ch',
    },
 },
},
}));       

  const dispatch = useDispatch();
  const currentModal = useSelector((state: RootState) => state.modalReducer.state);
  const [id, setIdValue] = React.useState('');

  const user_delete = (_id: string) => {
    setIdValue(_id)
    dispatch(set({state:'on', cashe1: id, cashe2: ''}))
  }

 const ModalShow = () => {
    if(currentModal == 'on'){
        return <div className='join_modal'>
          <BasicModal content='회원 삭제' _cashe={id} />
        </div>
    }
    else{
      return <div/>
    }
  }
  const [value, setValue] = React.useState(0); 

  const navigate = useNavigate();

  const goUser_list = () => {
        navigate('/user_list')
    };

  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };

  function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserList = async ()=>{
   const url = BaseUrl + "/user/user_list"
   const { data } = await axios.post(url, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: { uno: 0 }
   })
  return data
  }

  const { isLoading, data, error } = useQuery('getUserList', getUserList);

  if(isLoading){
    return <CircularProgress /> 
  }
  else {
    return (
       <div className='user_list'>
          <ModalShow/>
         <Stack direction={'row'} spacing={2} className='mypagecontents'>
           <User/>   
         <Box sx={{ flexGrow: 2, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
           <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}>
             <Tab label="회원 목록" value={0}  {...a11yProps(0)} onClick={() => { goUser_list(); }} />
             <Tab label="기업 목록" value={1}  {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
           </Tabs>
        </Box>
        <Box sx={{ width: '100%', marginTop:20  }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" marginTop={3} marginLeft={3} gutterBottom>
                회원 목록
              </Typography>
        </Stack>
          <Paper sx={{ width: '100%', mb: 2, marginTop:5 }} >
          <Stack direction="row">
          <Box className='User_list'>
          <Search>
             <SearchIconWrapper>
               <SearchIcon />
             </SearchIconWrapper>
             <StyledInputBase
              placeholder="Search User…"
              inputProps={{ 'aria-label': 'search' }}
             />
           </Search>
          </Box>
        </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>아이디</StyledTableCell>
                    <StyledTableCell>이름</StyledTableCell>
                    <StyledTableCell>이메일</StyledTableCell>
                    <StyledTableCell> </StyledTableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                   {Object.keys(data).map((value:any, index:any) => (
                     <StyledTableRow key={data[value]['id']}>
                      <StyledTableCell component="th" scope="row">{data[value]['id']}</StyledTableCell>
                      <StyledTableCell>{data[value]['name']}</StyledTableCell>
                      <StyledTableCell>{data[value]['email']}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton onClick={() => { user_delete(data[value]['id']); }}>
                           <DeleteIcon fontSize="small"/>
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
             </Table>
           </TableContainer>
         </Paper>
      </Box>
      </Stack> 
    </div>
   );
  }
}

export default User_list;