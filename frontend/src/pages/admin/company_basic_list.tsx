import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import User from '../components/user';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InputBase from '@mui/material/InputBase';
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
         Button,
         CircularProgress,
         Typography,
         alpha} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../reducers'
import { set } from '../../reducers/modalReducer'
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
  const goWrite = () => {
    navigate('/write')
  }

  const currentModal = useSelector((state: RootState) => state.modalReducer.state);

  const goInfo = (data: string) => {
    navigate('/info',{
       state :{ data: data }
       })
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
        sx={{ borderRight: 1, borderColor: 'divider' }}>
         <Tab label="회원 목록" value={0} {...a11yProps(0)} onClick={() => { goUser_list(); }} />
         <Tab label="기업 목록" value={1} {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
      </Tabs>
      </Box>
      <Box sx={{ width: '100%' }} >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" marginTop={3} marginLeft={3} gutterBottom>
                기업 목록
              </Typography>
              <Button variant="contained" startIcon={<AddOutlinedIcon/>} onClick={() => { goWrite(); }}> 
            글쓰기
          </Button>
        </Stack>
        <Paper sx={{ width: '100%', mb: 2, marginTop:5 ,overflow: 'hidden', elevation:3 }} >
        <Stack direction="row">
        <Box sx={{marginLeft:3, marginTop:2, marginBottom:2 }}>
          <Stack direction="row">
          <input type="text" className='company_list' id="keyword"/>
            <button type="button" className="search">
                검색
            </button>
        </Stack>
          </Box>
        </Stack>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>기업명</StyledTableCell>
            <StyledTableCell>위치</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>키워드</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(data).map((result:any, index:any) => (
            <StyledTableRow hover role="checkbox" key={data[result]['cname']} onClick={() => { goInfo(data[result]['cname']) }}>
              <StyledTableCell component="th" scope="row">{data[result]['cname']}</StyledTableCell>
              <StyledTableCell>{data[result]['address']}</StyledTableCell>
              <StyledTableCell>{ data[result]['keyword'].split(',')[0]}</StyledTableCell>
              <StyledTableCell> { data[result]['keyword'].split(',')[1]} </StyledTableCell>
              <StyledTableCell>{ data[result]['keyword'].split(',')[2]} </StyledTableCell>
              <StyledTableCell> 
              </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
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