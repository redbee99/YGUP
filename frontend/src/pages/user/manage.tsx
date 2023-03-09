import { useNavigate } from 'react-router-dom';
import User from '../components/user';
import React from 'react';
import { useQuery } from 'react-query';
import { BaseUrl } from '../../util/axiosApi';
import axios from 'axios';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSelector} from 'react-redux';
import { RootState } from '../../reducers'
import { Box, 
         Tab, 
         Tabs,
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
         Typography } from '@mui/material';

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

const Manage: React.FC = () => {

    const navigate = useNavigate();
    const [value, setValue] = React.useState(1);
    const currentModal = useSelector((state: RootState) => state.modalReducer.state);
  
    const goBookmark = () => {
        navigate('/bookmark')
    };
    const goManage = (state: number) => {
        navigate('/manage',  { state: state })
    };
    const goCl_Write = () => {
      navigate('/cl_write')
    };  

    const goClInfo = (data: string, data1: string) => {
      navigate('/cl_info',{
        state: {data: data, data1: data1}
      })
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
   const currentId = useSelector((state: RootState) => state.userReducer.id);
   const [id ] = React.useState(currentId);

   const getCl_List = async ()=>{
     const url = BaseUrl + "/cover_letter/read_all"
     const { data } = await axios.post(url, {
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: { id: id }
    })
    return data
   }

  const { isLoading:clisLoading, data: cldata, error: clerror } = useQuery('getCl_List', getCl_List);

  if(clisLoading){
     return <CircularProgress />
  } 
  else {
    return (
      <div className='manage'>  
            <Stack direction={'row'} spacing={2} className='mypagecontents' >
              <User />
              <Box sx={{ flexGrow: 1, bgcolor:'#E6EAF3', display: 'flex', height: 224, marginTop: 10}}>
             <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               sx={{ borderRight: 1, borderColor: 'divider' }}>
              <Tab label="북마크" value={0}  {...a11yProps(0)} onClick={() => { goBookmark(); }} />
              <Tab label="자소서 관리" value={1}  {...a11yProps(1)} onClick={() => { goManage(1);}} />
            </Tabs>
          </Box>
          <Box sx={{ width: '100%' }} >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" marginTop={3} marginLeft={3} gutterBottom>
                내가 쓴 자소서
              </Typography>
              <Button variant="contained" startIcon={<AddOutlinedIcon/>} onClick={() => { goCl_Write(); }}> 
            글쓰기
          </Button>
        </Stack>
        <Paper sx={{ width: '100%', mb: 2, marginTop:5 ,overflow: 'hidden', elevation:3 }} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>기업명</StyledTableCell>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell>작성시간</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(cldata).map((result:any, index:any) => (
            <StyledTableRow hover role="checkbox" key={cldata[result]['clno']}  onClick={() => { goClInfo(cldata[result]['clno'],cldata[result]['cname'])}}>
              <StyledTableCell component="th" scope="row">{cldata[result]['cname']}</StyledTableCell>
              <StyledTableCell>{cldata[result]['clname']}</StyledTableCell>
              <StyledTableCell>{cldata[result]['wdate'].split(',')[0]}</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
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
};

export default Manage;