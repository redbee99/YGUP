import * as React from 'react';
import { CircularProgress, Stack,
         experimentalStyled as styled,
         Card,
         CardMedia,
         Typography,
         Button,
         Box, Checkbox} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from "react-query";
import { BaseUrl } from '../../util/axiosApi';
import axios, { AxiosError } from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../reducers'
import { set } from '../../reducers/modalReducer'
import BasicModal from '../components/basicModal';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import * as setModal from '../../reducers/modalReducer'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 'auto',
    maxWidth: 400,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

type ReadInfoState = {
    type : String
    cname: String
}

const Info: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentId = useSelector((state: RootState) => state.userReducer.id);
    const [id, setIdValue] = React.useState(currentId);
    const [isBookmarkSelected, setisBookmarkSelectedValue] = React.useState(false);
    const state = location.state as {data:ReadInfoState};
    
    
    const Cname = state.data
    const goAdmin = () => {
        navigate('/company_basic_list')
    };
    const dispatch = useDispatch();
    const currentModal = useSelector((state: RootState) => state.modalReducer.state);
    const [cname, setCnameValue] = React.useState('');
    

    const info_delete = (_cname: string) => {
        setCnameValue(_cname)
        dispatch(set({state:'on', cashe1: cname, cashe2: ''}))
      }
  
    const ModalShow = () => {
      if(currentModal == 'on'){
          return <div className='info_delete_modal'>
            <BasicModal content='기업 삭제' _cashe={cname} />
          </div>
      }
      else{
        return <div/>
      }
    }

    const getCompany = async ()=>{
        const url = BaseUrl + "/company/readcompany"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { cname: Cname }
        })
        return data
    }

    const getBookmark = async ()=>{
        const url = BaseUrl + "/bookmark/read"
        const { data } = await axios.post(url, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id, cname: Cname }
        })

        if(data == "bookmark_button_on"){
            setisBookmarkSelectedValue(true)
        }
        else{
            setisBookmarkSelectedValue(false)
        }
        return data
    }
    const createBookmark = async ()=>{
        const url = BaseUrl + "/bookmark/create"
        const url2 = BaseUrl + "/bookmark/delete"
        let data = null

        try {
        // Check if bookmark exists
        const checkUrl = BaseUrl + "/bookmark/read1"
        const checkResponse = await axios.post(checkUrl, {
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: { id: id, cname: Cname }
        })
    
        
            // Delete existing bookmark
            const deleteResponse = await axios.post(url2, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { id: id, cname: Cname }
            })
    
            data = deleteResponse.data;
            
        } catch(error) {
            console.log(error);
            // Create new bookmark
            
            const createResponse = await axios.post(url, {
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: { id: id, cname: Cname, state: '1'}
            })
    
            data = createResponse.data;
        
        }
        return data
    }
    
    const { isLoading: CompanyIsLoading, data: CompanyData, error: CompanyError } = useQuery('getCompany', getCompany);
    const { isLoading: BookmarkIsLoading, data: BookmarkData, error: BookmarkError } = useQuery('getBookmark', getBookmark);   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 

    if(CompanyIsLoading && BookmarkIsLoading){
        return <CircularProgress />
    }
    else{
    const goUpdate = () => {
         navigate('/info_update',{
            state :{ data: CompanyData.result.company
              }
            })
          };
   
        return (
            <div className='info'>
                <ModalShow/>
                <Box sx={{ display: 'flex',position:'relative', width:550, height: 700, margin:'auto', textAlign:'center', border: 1, borderRadius: 5, backgroundColor:'#ffffff', flexDirection: 'column',mt:5, padding: 5 }} >
                    <Box>
                        <Checkbox 
                            sx={{ float: 'right'}} {...label}
                            icon={<BookmarkBorderIcon />} 
                            checkedIcon={<BookmarkIcon />}
                            checked={isBookmarkSelected}
                            onClick={() => { createBookmark()}}
                            />  
                    </Box>
                    <Stack  direction="row" spacing={2} alignItems="center" >
                    <Item sx={{margin:'auto'}}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{ height: 80}}
                                src={CompanyData['result']['company']['logo_url']}
                                alt="Logo"
                            />
                        </Card>
                    </Item>
                    </Stack>
                    <br/>
                    <Typography>회사명 : { CompanyData['result']['company']['cname'] }</Typography>
                    <br/>
                    <Typography>기업규모 : { CompanyData['result']['company']['form'] }</Typography>
                    <br/>
                    <Typography>홈페이지 : { CompanyData['result']['company']['courl'] }</Typography>
                    <hr className='info_underline'/>
                    <br/>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography>매출액 :<AutoGraphIcon/>{CompanyData['result']['company']['sales']}</Typography>
                    <Typography>평균연봉 : <AttachMoneyIcon/>{CompanyData['result']['company']['pay']}</Typography>
                    <Typography>퇴사율 : <DirectionsRunIcon/>{CompanyData['result']['company']['resign']}</Typography>
                    </Stack>
                    <br/>
                    <Typography>대표자명 : { CompanyData['result']['company']['owner'] }</Typography>
                    <br/>
                    <Typography>기업주소 : { CompanyData['result']['company']['address'] }</Typography>
                    <br/>
                    <Typography>기업내용 : { CompanyData['result']['company']['info'] }</Typography>
                    <hr className='info_underline'/>
                    <Item sx={{margin:'auto'}}>
                        <Card>
                            <CardMedia
                                component="img"
                                sx={{ height: 200}}
                                src={CompanyData['result']['company']['wcloud_url']}
                                alt="wcloud"
                            />
                        </Card>
                    </Item>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goAdmin() }}>
                            확인
                        </Button>
                        <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { goUpdate() }}>
                            수정
                        </Button>
                        <Button variant="contained" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343'}} onClick={() => { info_delete(CompanyData['result']['company']['cname']); }}>
                            삭제
                        </Button>
                    </Stack>
                </Box>
            </div>
        );
    }
}
export default Info;