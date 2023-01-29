import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, 
         Tab, 
         Tabs,
         IconButton, 
         Paper, 
         styled, 
         Table, 
         TableBody, 
         TableCell, 
         tableCellClasses, 
         TableContainer, 
         TableHead, 
         TableRow,} from '@mui/material';
         
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
         
function createData(
   name: string,
   location: string,
   keyword: string,
   edit: string,
   del: string,
   ) { return { name, location, keyword, edit, del }; }
         
const rows = [
   createData('Snow', '판교', '연봉', ' ',' '),
   createData('kakao', '강남', '사내복지', ' ',' '),
   createData('coopang', '종로', '꼰대문화', ' ',' '),
   createData('naver', '마곡', '조식',' ',' '),
   createData('toss', '여의도', '야근수당', ' ',' '),
   createData('namu', '양재', '출퇴근자율제', ' ',' '),
    ];

const Company_Basic_List: React.FC = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [value, setValue] = React.useState(state); 

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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
};


  function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
  }

  return (
    <div className='company_basic_list'>
      <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} >
          <Tab label="회원 목록" {...a11yProps(0)} onClick={() => { goUser_list(); }} />
          <Tab label="기업 목록" {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }} >
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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.keyword}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="Edit" size="small" disabled color="primary" >
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
  );
        </Paper>
      </Box>
    </div>
  );
}

export default Company_Basic_List;