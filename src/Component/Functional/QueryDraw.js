import React, { useContext, useEffect, useState } from 'react';
import { Topcontext } from "../Context/Topcontext";
import styled from "styled-components"
import { FlexCol, FlexRow } from '../Common/Flexs/Flexs'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Dialog';
import CardActions from '@material-ui/core/DialogActions';
import CardContent from '@material-ui/core/DialogContent';
import CardContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

const LeftNavFlexCol = styled(FlexCol)`
    width:80vw;
    height: ${props => props.totalheight + "px"};
    background-color:#f8b195;
    min-height: 600px;
    
`
const LeftNavFlexRow = styled(FlexRow)`
    width:80vw;
    height:90px;
    background-color:#f8b195;
    
`
const LasterPeriodTextField = styled(TextField)`
    width: 200px;
    height:50px;

    &.MuiTextField-root{
        margin: 20px;
        & .MuiFormHelperText-root {
            color: red;
        }
    }
    
`

const Btn = styled(Button)`
    width: 100px;
    text-align: center;
    line-height: 100px;
    
    &.MuiButton-root {
        margin-top: 24px;
        height: 50px;
        font-size: 26px;
    }
`

const Btn1 = styled(Button)`
    width: 200px;
    text-align: center;
    line-height: 100px;
    
    &.MuiButton-root {
        margin-left: 10px;
        margin-top: 24px;
        height: 50px;
        font-size: 26px;
    }
`
const Card1 = styled(Card)`
&& .MuiDialog-root{
    && .MuiDialog-container{
    && .MuiPaper-root {
        max-width: 100vw;
        max-height: 100vh;
        width: 100vw;
        height: 100vh;
    }
}
&& .MuiDialog-root{

    && .MuiPaper-root {
        max-width: 100vw;
        max-height: 100vh;
        width: 100vw;
        height: 100vh;
    }

}
&& .MuiPaper-root {
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
}
`

const QueryDraw = ({ props, ...other }) => {
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);
    const [state, setstate] = useState(20);
    const [query, setquery] = useState(true);
    const [vaild, setvaild] = useState("");
    const [queryresult, setqueryresult] = useState();
    const [totalheight, settotalheight] = useState(20);
    const [open, setOpen] = useState(false);
    const [ok, setok] = useState(false);
    const [progress, setProgress] = useState(90);
    const Zreg = /^[0-9]*[1-9][0-9]*$/;
    useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 10));
        }

        const timer = setInterval(tick, 1500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {

        if (Zreg.test(state)) {
            setvaild("");
            let url = new URL(Globalcontext.UrlHeader + "api/WinNumbers/GetlasterPeriod?lasterPeriod=" + state);
            const PData = async () => {
                let result = await fetch(url, {
                    method: "GET",
                })
                    .then(res => {
                        res.clone().json();
                        //console.log(res.ok);
                        return res;
                    }, reject => console.log("failed"))
                    .then(data => {
                        //console.log(data);
                        return data.json();
                    });
                console.log(result);
                await settotalheight(state);
                await setqueryresult(result);
            }
            PData();

        } else {
            //輸入錯誤
            setvaild("請輸入正整數");
        }

    }, [query])

    const mapqueryresult = () => {

        return (queryresult && queryresult.ok.map((item, index) => {
            //console.log(item)
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">{item.date}{item.dayOfWeek}</TableCell>
                    <TableCell align="right">{item.asC1}</TableCell>
                    <TableCell align="right">{item.asC2}</TableCell>
                    <TableCell align="right">{item.asC3}</TableCell>
                    <TableCell align="right">{item.asC4}</TableCell>
                    <TableCell align="right">{item.asC5}</TableCell>
                </TableRow>
            )
        })
        )
    }

    const updateDraw = () => {
        let url = new URL(Globalcontext.UrlHeader + "api/WinNumbers");
        setOpen(true);
        const PData1 = async () => {
            let result = await fetch(url, {
                method: "GET",
            })
                .then(res => {
                    res.clone().json();
                    //console.log(res.ok);
                    return res;
                }, reject => console.log("failed"))
                .then(data => {
                    //console.log(data);
                    return data.json();
                });
            //console.log(result);
            await setok(true);
        }
        PData1();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <LeftNavFlexCol totalheight={totalheight * 36 + 100}>
            查詢中獎號碼
            <LeftNavFlexRow>
                <LasterPeriodTextField variant="outlined" label="查詢最近幾期 : " helperText={vaild} value={state} onChange={(e) => { setstate(e.target.value) }} />
                <Btn color="primary" variant="contained" onClick={() => { setquery(!query) }}>查詢</Btn>
                <Btn1 color="primary" variant="contained" onClick={() => { updateDraw() }}>更新中獎號碼</Btn1>
            </LeftNavFlexRow>
            <Table size="small" style={{ width: "700px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>開獎日期</TableCell>
                        <TableCell align="right">開獎號碼1</TableCell>
                        <TableCell align="right">開獎號碼2</TableCell>
                        <TableCell align="right">開獎號碼3</TableCell>
                        <TableCell align="right">開獎號碼4</TableCell>
                        <TableCell align="right">開獎號碼5</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mapqueryresult()}
                </TableBody>
            </Table>
            <Card1
                open={open}
                onClose={handleClose}
            >
                <CardContent>
                    <CardContentText style={{ width: "400px", height: "400px" ,fontSize:"60px"}} >
                        更新...
                      
                    </CardContentText>
                </CardContent>
                <CardActions>
                    {ok ? (<Button onClick={handleClose} color="primary">
                        完成
                    </Button>) : (<CircularProgress variant="determinate" value={progress} color="secondary" />)}
                </CardActions>
            </Card1>

        </LeftNavFlexCol>
    );
};

export default QueryDraw;