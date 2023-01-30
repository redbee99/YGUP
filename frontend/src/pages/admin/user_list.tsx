import * as React from 'react';
import User from '../components/user';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../util/axiosApi';   
import axios from 'axios';
import { useQuery } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
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
         CircularProgress } from '@mui/material';
         
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

  const [value, setValue] = React.useState(0); 

  const navigate = useNavigate();

  const goUser_list = () => {
        navigate('/user_list')
    };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };

  const goUser_delete = () => {
    navigate('/User_delete')
  }

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
          <Paper sx={{ width: '100%', mb: 2, marginTop:5 }} >
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
                        <IconButton>
                           <DeleteIcon fontSize="small"  onClick={() => { goUser_delete(); }}/>
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