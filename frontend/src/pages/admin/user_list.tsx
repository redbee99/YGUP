import * as React from 'react';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, IconButton, Paper, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, Toolbar, Tooltip } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => {
  return ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#009688',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  });
});

interface Data {
  name: string;
  userid : string;
  email: string;
  del: string,
}

function createData(
  name: string,
  userid : string,
  email: string,
  del: string
): Data {
  return {
    name,
    userid,
    email,
    del
  };
}

const rows = [
  createData('Cupcake', '세훈','naver','del'),
  createData('Donut', '세훈2','google','del'),
  createData('Eclair', '세훈3','daum','del'),
  createData('Frozen yoghurt', '세훈4','kakao','del'),
  createData('Gingerbread', '세훈5','nate','del'),
  createData('Honeycomb', '세훈6','naver','del'),
  createData('Ice cream sandwich', '세훈7','daum','del'),
  createData('Jelly Bean', '세훈8','nexon','del'),
  createData('KitKat', '세훈9','hanmail','del'),
  createData('Lollipop', '세훈10','naver','del'),
  createData('Marshmallow', '세훈11','naver','del'),
  createData('Nougat', '세훈12','naver','del'),
  createData('Oreo', '세훈13','naver','del'),
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
    numeric: false,
    disablePadding: true,
    label: 'name',
  },
  {
    id: 'userid',
    numeric: true,
    disablePadding: false,
    label: 'userid',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'email',
  },
  {
    id: 'del',
    numeric: true,
    disablePadding: false,
    label: ' ',
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
  const { order, orderBy,  onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
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

const User_list: React.FC = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const goUser_list = () => {
        navigate('/user_list')
  };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };
  
  const [value, setValue] = React.useState(state);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('userid');
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

  function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };


  return (
    <div className='user_list'>
      <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="회원 목록" {...a11yProps(0)} onClick={() => { goUser_list(); }}/>
          <Tab label="기업 목록" {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }}/>
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle" >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length} />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center' >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.userid}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <DeleteIcon fontSize="small"/>
                        </IconButton>   
                      </TableCell>        
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </div>
  );
}

export default User_list;