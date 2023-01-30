import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';
import User from '../components/user';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#009688',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

interface Data {
    name: string,
    location: string,
    keyword: string,
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  type Order = "asc" | "desc";
  
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) 
{
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: '기업명',
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: '위치',
    },
    {
        id: 'keyword',
        numeric: true,
        disablePadding: false,
        label: '키워드',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell padding="checkbox">
          
          </StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false} >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)} >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

const Bookmark: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const goUserInfo = () => {
        navigate('/userinfo')
    };
    const goBookmark = (state: number) => {
        navigate('/bookmark',  { state: state })
    };
    const goManage = (state: number) => {
        navigate('/manage',  { state: state })
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

    const [value, setValue] = React.useState(state);
      
      function createData(
        id: string,
        name: string,
        location: string,
        keyword: string,
      ) {
        return { id, name, location, keyword };
      }
    const rows = [
        createData('1', 'Snow', '판교', '연봉'),
        createData('2', 'kakao', '강남', '사내복지'),
        createData('3', 'coopang', '종로', '꼰대문화'),
        createData('4', 'naver', '마곡', '조식'),
        createData('5', 'toss', '여의도', '야근수당'),
        createData('6', 'namu', '양재', '출퇴근자율제'),
    ];

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <div className='bookmark'>
            <Box className='mypageheader' sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab value={0} label="회원정보" {...a11yProps(0)} onClick={() => { goUserInfo(); } }/>
                    <Tab value={1} label="북마크" {...a11yProps(1)} onClick={() => { goBookmark(1); } }/>
                    <Tab value={2} label="자소서 관리" {...a11yProps(2)} onClick={() => { goManage(2); } } />
                </Tabs>
            </Box>
            <Stack direction={'row'} spacing={2} className='mypagecontents'>
              <User />
              <Box sx={{ width: '100%', mb:10 }}>
                <Paper sx={{ width: '100%' }}>
                  <Typography
                      sx={{ flex: '1 1 100%' }}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                      marginLeft={3}
                      paddingTop={2}
                      paddingBottom={2} >
                      북마크 기업
                    </Typography>
                    <TableContainer>
                      <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected} >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        icon={<BookmarkBorderIcon />}
                                        checkedIcon={<BookmarkIcon />}
                                        checked={isItemSelected}
                                        onClick={(event) => handleClick(event, row.id)}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }} />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    align="center" >
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                                <TableCell align="center">{row.keyword}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </Paper>
              </Box>
            </Stack>
        </div>
    );
};

export default Bookmark;