import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Tab, Tabs, Button, Checkbox, IconButton, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip } from '@mui/material';


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
    id: string,
    name: string,
    location: string,
    keyword: string,
    edit: string,
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
    location: string,
    keyword: string,
    edit: string,
  ) {
    return { id, name, location, keyword, edit };
  }

const rows = [
    createData('1', 'Snow', '판교', '연봉', 'Edit'),
    createData('2', 'kakao', '강남', '사내복지', 'Edit'),
    createData('3', 'coopang', '종로', '꼰대문화', 'Edit'),
    createData('4', 'naver', '마곡', '조식','Edit'),
    createData('5', 'toss', '여의도', '야근수당', 'Edit'),
    createData('6', 'namu', '양재', '출퇴근자율제', 'Edit'),
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
          <StyledTableCell padding="checkbox" />

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

interface EnhancedTableToolbarProps {
    numSelected: number;
  }

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const navigate = useNavigate();

    const goWrite = () => {
        navigate('/write')
    }; 

    return (
      <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main, 
                theme.palette.action.activatedOpacity),
            }),
        }} >
  
        {numSelected > 0 ? (
          <Tooltip title="Delete" >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ):(
          <Button 
            variant="contained" 
            size="small" 
            onClick={() => { goWrite() }}
            sx={{ width: 100,
                  color:'#ffff',
                  backgroundColor: '#009688', 
                  borderColor:'#434343'}} >
            글쓰기
          </Button>

        )}
      </Toolbar>
    );
  }

const Company_Basic_List: React.FC = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const goUser_list = () => {
        navigate('/user_list')
    };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };
  const goInfo_update = () => {
      navigate('/info_update')
  };

  const [value, setValue] = React.useState(state);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
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
    <div className='company_basic_list'>
      <Box sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} >
          <Tab label="회원 목록" {...a11yProps(0)} onClick={() => { goUser_list(); }} />
          <Tab label="기업 목록" {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }} >
        <Paper sx={{ width: '100%', mb: 2 }} >
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
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected} >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.id)}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId }}/>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center' >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.location}</TableCell>
                      <TableCell align="center">{row.keyword}</TableCell>
                      <TableCell align="center">
                        <Button
                          color = "primary"
                          size = "small"
                          variant = "text"
                          onClick = {() => { goInfo_update() }}
                          sx={{ height:20 }} >
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
        <EnhancedTableToolbar numSelected={selected.length}/>
      </Box>
    </div>
  );
}

export default Company_Basic_List;