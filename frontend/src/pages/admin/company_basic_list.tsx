import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import User from '../components/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BaseUrl } from '../../util/axiosApi';   
import axios from 'axios';
import { useQuery } from 'react-query';
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
         Button,
         CircularProgress} from '@mui/material';

         
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
         
const Company_Basic_List: React.FC = () => {

  const { state } = useLocation();
  const [value, setValue] = React.useState(state); 
  
  const navigate = useNavigate();

  const goUser_list = () => {
        navigate('/user_list')
    };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };
  const goInfo_update = () => {
      navigate('/info_update')
  };

  const goInfo_delete = () => {
    navigate('/info_delete')
  }
  const goWrite = () => {
    navigate('/write')
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

const getCompanyList = async ()=>{
  const url = BaseUrl + "/company/readall"
  const { data } = await axios.post(url, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: { uno: 0 }
  })
  return data
}

const { isLoading, data, error } = useQuery('getCompanyList', getCompanyList);

if(isLoading){
  return <CircularProgress />
}
else{
  return (
    <div className='company_basic_list'>
      <Stack direction={'row'} spacing={2} className='mypagecontents'>
         <User />    
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, marginTop: 10}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
         <Tab label="회원 목록" value={0}  {...a11yProps(0)} onClick={() => { goUser_list(); }} />
         <Tab label="기업 목록" value={1}  {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
      </Tabs>
      </Box>
      <Box sx={{ width: '100%' }} >
        <Box className='admin_appbar' sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', marginBottom:1  }}>
        <Button 
            variant="contained" 
            size="small" 
            onClick={() => { goWrite() }}
            sx={{ width: 100, 
                  mt:3, 
                  mx:'auto', 
                  color:'black', 
                  backgroundColor: '#ffffff', 
                  borderColor:'#ffffff',
                  margin:1}} >
            글쓰기
          </Button>
      </Box>
        <Paper sx={{ width: '100%', mb: 2 }} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>기업명</StyledTableCell>
            <StyledTableCell align="right">위치</StyledTableCell>
            <StyledTableCell align="right">키워드</StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
            <StyledTableCell align="right"> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(data).map((value:any, index:any) => (
            <StyledTableRow key={data[value]['cname']}>
              <StyledTableCell component="th" scope="row">{data[value]['cname']}</StyledTableCell>
              <StyledTableCell align="right">{data[value]['address']}</StyledTableCell>
              <StyledTableCell align="right">{data[value]['keyword']}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                  <EditIcon fontSize="small"  onClick={() => { goInfo_update(); }}/>
                </IconButton>
                <IconButton>
                  <DeleteIcon fontSize="small"  onClick={() => { goInfo_delete(); }}/>
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
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

export default Company_Basic_List;