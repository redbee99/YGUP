import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React  from 'react';
import '../../App.css';
import { Stack } from '@mui/system';
import { useNavigate, useLocation, JsonFunction } from 'react-router-dom';
import axios from "axios"
import { BaseUrl } from '../../util/axiosApi';


type ReadCompanyState = {
    type : String
    cname: String
    courl: String
    info: String
    sales: String
    pay: String
    resign: String
    owner: String
    address: String
    form: String
}

const Info_Update: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const state = location.state as {cname:string,courl:string,info:string,sales:string,pay:string,resign:string,owner:string,address:string,form:string};
    const state = location.state as {data:ReadCompanyState};
    const cname = state.data.cname
    const courl = state.data.courl
    const info = state.data.info
    const sales = state.data.sales
    const pay = state.data.pay
    const resign = state.data.resign
    const owner = state.data.owner
    const address = state.data.address
    const form = state.data.form
    



    const [companyName, setNameValue] = React.useState(state.data.cname);
    const nameChange = (newValue: string) => {
        setNameValue(newValue);
    };

    const [companyUrl, setUrlValue] = React.useState(state.data.courl);
    const urlChange = (newValue: string) => {
        setUrlValue(newValue);
    };

    const [companyInfo, setInfoValue] = React.useState(state.data.info);
    const infoChange = (newValue: string) => {
        setInfoValue(newValue);
    };

    const [companySales, setSalesValue] = React.useState(state.data.sales);
    const salesChange = (newValue: string) => {
        setSalesValue(newValue);
    };
    const [companyPay, setPayValue] = React.useState(state.data.pay);
    const payChange = (newValue: string) => {
        setPayValue(newValue);
    };
    const [companyResign, setResignValue] = React.useState(state.data.resign);
    const resignChange = (newValue: string) => {
        setResignValue(newValue);
    };

    const [companyCeo, setCeoValue] = React.useState(state.data.owner);
    const ceoChange = (newValue: string) => {
        setCeoValue(newValue);
    };

    const [companyAdr, setAdrValue] = React.useState(state.data.address);
    const adrChange = (newValue: string) => {
        setAdrValue(newValue);
    };

    const [companyContent, setContentValue] = React.useState(state.data.form);
    const contentChange = (newValue: string) => {
        setContentValue(newValue);
    };

    const [file, setFile] = React.useState<File>();
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    }, [file]);

    const complete = (event: React.MouseEvent) => {
        const data = {
            cname: companyName,
            address: companyAdr,
            sales: companySales,
            owner: companyCeo,
            info: companyContent,
            pay: companyPay,
            resign: companyResign,
            form: companyInfo,
            courl: companyUrl,
            uno: 0
        }
    
    
        axios.post( BaseUrl+'/company/update'
            //, formData
            , {
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    'data': data
                }
            }
        ).then(res => {
            navigate('/info',  { state: data['cname'] })
        }).catch(err => {
            alert('정보를 다시 입력해 주세요')
        });
};

return (
    <div className='writeform'>
        <Box sx={{ display: 'flex',
                   position:'relative', 
                   width:800, 
                   height:780,
                   margin:'auto', 
                   textAlign:'center', 
                   border: 1, 
                   borderRadius: 5, 
                   backgroundColor:'#ffffff', 
                   flexDirection: 'column', 
                   mt:5,
                   px:5
                }}
        >
            <Stack direction='column' marginTop={10} marginBottom={-10} marginLeft={5} >
                <TextField id="company-name" defaultValue={cname} onChange={(newValue) => nameChange(newValue.target.value)} label="기업명" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-url" defaultValue={courl} onChange={(newValue) => urlChange(newValue.target.value)} label="홈페이지주소" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-infomation" defaultValue={info} onChange={(newValue) => infoChange(newValue.target.value)} label="기업정보" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-sales" defaultValue={sales} onChange={(newValue) => salesChange(newValue.target.value)} label="매출" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-pay" defaultValue={pay} onChange={(newValue) => payChange(newValue.target.value)} label="연봉" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-resign" defaultValue={resign}onChange={(newValue) => resignChange(newValue.target.value)} label="퇴사율" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-ceo" defaultValue={owner} onChange={(newValue) => ceoChange(newValue.target.value)} label="대표" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-adress" defaultValue={address} onChange={(newValue) => adrChange(newValue.target.value)} label="주소" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-content" defaultValue={form} onChange={(newValue) => contentChange(newValue.target.value)} label="기업내용" variant="outlined" size="small" sx={{ width:700, height:200 }} margin="dense"/>
                <Button onClick={(event) => complete(event)} variant="contained" component="label" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343', maxWidth:700}}>
                        수정
                </Button>
            </Stack>
        </Box>
    </div>

);
}
export default Info_Update;