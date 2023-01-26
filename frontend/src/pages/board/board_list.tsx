import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { set } from '../../reducers/headerReducer';



interface Data {
  location: string;
  keyword: string;
  name: string;
}

function createData(
  name: string,
  location: string,
  keyword: string,
): Data {
  return {
    name,
    location,
    keyword,
  };
}

const rows = [
  createData('기업 1', "위치2", "키워드"),
  createData('기업 2', "위치4", "키워드"),
  createData('기업 3',  "위치5", "키워드"),
  createData('기업 4',  "위치2", "키워드"),
  createData('기업 5',  "위치1", "키워드"),
  createData('기업 6',  "위치7", "키워드"),
  createData('기업 7',  "위치6", "키워드"),
  createData('기업 8',  "위치9", "키워드"),
  createData('기업 9', "위치8", "키워드"),
  createData('기업 10',  "위치7", "키워드"),
  createData('기업 11',  "위치3", "키워드"),
  createData('기업 12',  "위치1", "키워드"),
  createData('기업 13',  "위치6", "키워드"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
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

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}

            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const Board_List: React.FC = () => {
  
  const [email, setemail] = React.useState('');
    const emailAdress = [
        'gmail.com',
        'naver.com',
        'hanmail.net',
        'nate.net',
    ];

  const currentPage = useSelector((state: RootState) => state.headerReducer.page);
  console.log(currentPage);
  const dispatch = useDispatch();
  dispatch(set('company'));

  const navigate = useNavigate();

  const goLike = (state: number) => {
    navigate('/board_like', { state: state })
  };
  const goFav = (state: number) => {
    navigate('/board_Fav', { state: state })
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('location');
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

const [value, setValue] = React.useState(0);

  return (
    <div className='board_list'>  
      <Box sx={{ backgroundColor:'#009688', border: '#26a69a', height:60, pt:3 }}>
        <Stack direction="row">
          <Box sx={{ height:40, '& .MuiSvgIcon-root': { height:'3rem' } }}  >
            <SearchIcon sx={{ color: 'white' }}/>
          </Box>
          <input type="text" className='company_input'/>
        </Stack>
      </Box>
      <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" {...a11yProps(0)} onClick={() => {  }}/>
          <Tab label="실시간 급상승" {...a11yProps(1)} onClick={() => { goLike(1); }}/>
          <Tab label="인기 기업" {...a11yProps(2)} onClick={() => { goFav(2); }}/>
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
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
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          align="center"
                        >
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
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>  
  );
}

export default Board_List ;