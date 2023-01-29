import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
   id: string,
   name: string,
   email: string,
   del: string,
   ) { return { id, name, email, del }; }
         
   const rows = [
    createData('Cupcake', '세훈','naver', ' '),
    createData('Donut', '세훈2','google', ' '),
    createData('Eclair', '세훈3','daum', ' '),
    createData('Frozen yoghurt', '세훈4','kakao', ' '),
    createData('Gingerbread', '세훈5','nate', ' '),
    createData('Honeycomb', '세훈6','naver', ' '),
    createData('Ice cream sandwich', '세훈7','daum', ' '),
    createData('Jelly Bean', '세훈8','nexon', ' '),
    createData('KitKat', '세훈9','hanmail', ' '),
    createData('Lollipop', '세훈10','naver', ' '),
    createData('Marshmallow', '세훈11','naver', ' '),
    createData('Nougat', '세훈12','naver', ' '),
    createData('Oreo', '세훈13','naver', ' '),
  ];
const User_list: React.FC = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [value, setValue] = React.useState(state); 

  const goUser_list = () => {
        navigate('/user_list')
    };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };

  const goUser_delete = () => {
    navigate('/User_delete')
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
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell>email</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">{row.id} </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
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
  );
        </Paper>
      </Box>
    </div>
  );
}

export default User_list;