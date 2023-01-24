import { Box, Button, Checkbox, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';

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
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

function createData(
    id: string,
    name: string,
    title: string,
    time: string,
) {
return { id, name, title, time };
}

const rows = [
    createData('1', 'Snow','이력서_센스있고 손이 빠릅니다',  '23년 01월 01일' ),
    createData('2', 'kakao', '카카오와 함께 도전하겠습니다.', '23년 01월 01일' ),
    createData('3', 'coopang','쿠팡의 성장 가능성에 주목하겠습니다', '23년 01월 02일' ),
    createData('4', 'naver', '변화에 맞춰 도전하는 자세', '23년 01월 03일' ),
    createData('5', 'toss', '소통과 신뢰로 목료달성하기', '23년 01월 04일' ),
    createData('6', 'namu', '함께일 때 빛나는, 나무와 같은사람', '23년 01월 05일'),
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

interface EnhancedTableToolbarProps {
    numSelected: number;
  }

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const navigate = useNavigate();
    const goNewprdict = () => {
       navigate('/newpredict')
    };

    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >  
        </Typography>    
        {numSelected > 0 ? (
        <Typography>
            <Button variant="outlined" size="small" 
                    onClick={() => { goNewprdict()}}
                    sx={{ width: 100, 
                          mt:3, 
                          mx:'auto', 
                          color:'#ffff', 
                          backgroundColor: '#009688', 
                          borderColor:'#434343'
                        }} 
                   >
                          선택
                   </Button>
        </Typography>
      ):(
        <Typography>
           <IconButton>
            </IconButton>
        </Typography>
      )}
    </Toolbar>
);
}

const Board_mylist_chek: React.FC = () => {
 
    const navigate = useNavigate();
      
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
        <div className='board_mylist_chek'>
                  <Box sx={{ width: '100%' }}>
                  <Paper sx={{ width: '100%', mb: 2 }}>
                  <TableContainer>
                  <Table
                      sx={{ Width: '100%'}}
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
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                              <TableRow
                                  hover
                                  onClick={(event) => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.id}
                                  selected={isItemSelected}
                              >
                              <TableCell padding="checkbox">
                                  <Checkbox
                                      color="primary"
                                      icon={<Checkbox/>}
                                      checkedIcon={<Checkbox/>}
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
                              <TableCell align="center">{row.title}</TableCell>
                              <TableCell align="center">{row.time}</TableCell>
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
              <EnhancedTableToolbar numSelected={selected.length}/>
            </Box>
        </div>
    
    );
}

export default Board_mylist_chek;