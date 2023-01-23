import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { set } from '../../reducers/headerReducer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Button, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';

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
  time: string,
  title: string,
  edit: string,
}

function createData(
  id: string,
  name: string,
  title: string,
  time: string,
  edit: string,
) {
return { id, name, title, time, edit };
}

const rows = [
  createData('1', '가','제목1',  '23년 01월 01일', 'Edit'),
  createData('2', '나', '제목2', '23년 01월 01일', 'Edit'),
  createData('3', '다','제목3', '23년 01월 02일', 'Edit' ),
  createData('4', '라', '제목4', '23년 01월 03일', 'Edit' ),
  createData('5', '마', '제목5', '23년 01월 04일', 'Edit' ),
  createData('6', '바', '제목6', '23년 01월 05일', 'Edit' ),
  createData('7', '사','제목7',  '23년 01월 01일', 'Edit'),
  createData('8', '아', '제목8', '23년 01월 01일', 'Edit'),
  createData('9', '자','제목9', '23년 01월 02일', 'Edit' ),
  createData('10', '차', '제목10', '23년 01월 03일', 'Edit' ),
  createData('11', '카', '제목11', '23년 01월 04일', 'Edit' ),
  createData('12', '타', '제목12', '23년 01월 05일', 'Edit' ),
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
      id: 'title',
      numeric: true,
      disablePadding: false,
      label: '제목',
  },

  {
      id: 'time',
      numeric: true,
      disablePadding: false,
      label: '작성시간',
  },

  {
      id: 'edit',
      numeric: true,
      disablePadding: false,
      label: '수정',
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
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
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

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const Board_MyList: React.FC = () => {
  
  const currentPage = useSelector((state: RootState) => state.headerReducer.page);
  console.log(currentPage);
  const dispatch = useDispatch();
  dispatch(set('company'));

  const navigate = useNavigate();

  const goCoverletter_write = () => {
    navigate('/coverletter_write')
};
const goCoverLetter_Update = () => {
  navigate('/coverletter_update')
};
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
    <div className='board_MyList'>  
    <Box sx={{ backgroundColor:'#E6EAF3', height:300, borderBottom:10, borderBlockColor:'#E6EAF3'}}>
      <Box sx={{ display: 'flex', 
                flexWrap: 'wrap', 
                  '& > :not(style)' : { 
                m: 1, 
                marginTop:6,
                marginBottom:4,
                padding:3,
                minwidth: 128, 
                height: 150,
                marginLeft:25,
                },
              }}
      >
        <Card  sx={{height:100, width:300}} variant="outlined">
      <CardContent>
        <Typography sx={{ mb: 1 }}>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={() => { goCoverletter_write()}}>자소서 작성</Button>
      </CardActions>
      </Card>
      </Box> 
      </Box>
      <Box sx={{ width: '100%', mb: 15 }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h5"
            id="tableTitle"
            component="div"
            marginLeft={3}
            paddingTop={4}
            paddingBottom={5}
            >
            최근 목록
            </Typography>
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

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">
                        <Button
                            color="primary"
                            size="medium"
                            variant="text"
                            onClick={() => { goCoverLetter_Update() } }
                            >
                              Edit
                            <IconButton aria-label="Edit" size="small" disabled color="primary" >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                       </Button>
                        </TableCell>
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

export default Board_MyList;