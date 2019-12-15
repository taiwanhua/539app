import React, { useContext, useState, useEffect } from 'react';
import { Topcontext } from "../Context/Topcontext";
import styled from "styled-components"
import { FlexCol, FlexRow } from '../Common/Flexs/Flexs'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const LeftNavFlexCol = styled(FlexCol)`
    width:80vw;
    height:600px;;
    background-color:#f8b195;
    
`
const Btn = styled(Button)`
    width: 100px;
    text-align: center;
    line-height: 100px;
    
    &.MuiButton-root {
        margin-left: 20px;
        margin-top: 10px;
        height: 50px;
        font-size: 26px;
        
       
    }
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
        margin: 20px 5px;
        & .MuiFormHelperText-root {
            color: red;
        }
    }
    
`
const LasterPeriodTextField1 = styled(TextField)`
    width: 230px;
    height:50px;

    &.MuiTextField-root{
        margin: 20px 5px;
        & .MuiFormHelperText-root {
            color: red;
        }
        & .MuiInputLabel-root{
            width: 260px;
        }
    }
    
`


const QueryNumberTail = ({ props, ...other }) => {
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);

    const [query, setquery] = useState(true);

    const [state, setstate] = useState(20);
    const [vaild, setvaild] = useState("");

    const [next, setnext] = useState(1);
    const [vaildnext, setvaildnext] = useState("");

    const [asC1, setasC1] = useState("");
    const [asC2, setasC2] = useState("");
    const [asC3, setasC3] = useState("");
    const [asC4, setasC4] = useState("");
    const [asC5, setasC5] = useState("");
    const [vaild1, setvaild1] = useState("");
    const [vaild2, setvaild2] = useState("");
    const [vaild3, setvaild3] = useState("");
    const [vaild4, setvaild4] = useState("");
    const [vaild5, setvaild5] = useState("");

    const [queryresult, setqueryresult] = useState();
    const [keyArr, setkeyArr] = useState([]);
    const [valueArr, setvalueArr] = useState([]);

    const Zreg = /^[0-9]*[1-9][0-9]*$/;
    useEffect(() => {
        let str = "";
        if (!Zreg.test(state)) {
            setvaild("請輸入正整數");
        } else if (!Zreg.test(next)) {
            setvaildnext("請輸入正整數");
        } else if (!Zreg.test(asC1)) {
            setvaild1("請輸入正整數");
        } else {
            str = str + "&EasyDrawNumber1=" + asC1;
            if (asC2 !== "") {
                if (!Zreg.test(asC2)) {
                    setvaild2("請輸入正整數");
                } else {
                    str = str + "&EasyDrawNumber1=" + asC2;
                }
            }
            if (asC3 !== "") {
                if (!Zreg.test(asC3)) {
                    setvaild3("請輸入正整數");
                } else {
                    str = str + "&EasyDrawNumber1=" + asC3;
                }
            }
            if (asC4 !== "") {
                if (!Zreg.test(asC4)) {
                    setvaild4("請輸入正整數");
                } else {
                    str = str + "&EasyDrawNumber1=" + asC4;
                }
            }
            if (asC5 !== "") {
                if (!Zreg.test(asC5)) {
                    setvaild5("請輸入正整數");
                } else {
                    str = str + "&EasyDrawNumber1=" + asC5;
                }
            }
            if (!((asC2 !== "" && !Zreg.test(asC2)) || (asC3 !== "" && !Zreg.test(asC3)) || (asC4 !== "" && !Zreg.test(asC4)) || (asC5 !== "" && !Zreg.test(asC5)))) {
                let url = new URL(Globalcontext.UrlHeader + "api/WinNumbers/GetEasyDrawNumberStatisticsInlasterPeriodByNumberTail?lasterPeriod=" + state + "&NextWhichPeriod=" + next + str);
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
                    await setvaild("");
                    await setvaildnext("");
                    await setvaild1("");
                    await setvaild2("");
                    await setvaild3("");
                    await setvaild4("");
                    await setvaild5("");
                    await setqueryresult(result);
                    let keyArrpush = [];
                    let valueArrpush = [];
                    for (let ind = 1; ind < 40; ind++) {
                        let indstr = ind.toString();
                        if (ind.toString().length == 1) {
                            indstr = "0" + ind.toString();
                        }
                        if (Object.keys(result.ok).includes(indstr)) {
                            keyArrpush.push(indstr);
                            valueArrpush.push(result.ok[indstr]);
                        }
                    }
                    await setkeyArr(keyArrpush);
                    //console.log(keyArrpush);
                    await setvalueArr(valueArrpush);
                    //console.log(valueArrpush);
                }
                PData();
            }
        }
    }, [query])

    const mapqueryresult = () => {

        let head = () => (
            <TableHead>
                <TableRow >
                    {keyArr.length > 0 && <TableCell align="right">中獎號碼</TableCell>}
                    {
                        //queryresult && Object.keys(queryresult.ok).map((item, index) => {
                        keyArr.map((item, index) => {
                            return (
                                <TableCell key={index} align="right">{item}</TableCell>
                            )
                        })
                    }
                </TableRow>
            </TableHead>
        )

        let body = () => (
            <TableBody>
                <TableRow>
                    {keyArr.length > 0 && <TableCell align="right">開出次數</TableCell>}
                    {
                        //queryresult && Object.keys(queryresult.ok).map((item, index) => {
                        valueArr.map((item, index) => {
                            return (
                                // <TableCell key={index} align="right">{queryresult.ok[item]}</TableCell>
                                <TableCell key={index} align="right">{[item]}</TableCell>
                            )
                        })
                    }
                </TableRow>
            </TableBody>
        )
        return (
            <>
                {head()}
                {body()}
            </>
        )
    }

    return (
        <LeftNavFlexCol>
            中獎號碼統計(中獎尾數)
           <LeftNavFlexRow>
                <LasterPeriodTextField variant="outlined" label="最近幾期內 : " helperText={vaild} value={state} onChange={(e) => { setstate(e.target.value) }} />
                <LasterPeriodTextField1 variant="outlined" label="包含後列號碼尾數當期後的第幾期 : " helperText={vaildnext} value={next} onChange={(e) => { setnext(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="包含中獎尾數1 : " helperText={vaild1} value={asC1} onChange={(e) => { setasC1(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="包含中獎尾數2 : " helperText={vaild2} value={asC2} onChange={(e) => { setasC2(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="包含中獎尾數3 : " helperText={vaild3} value={asC3} onChange={(e) => { setasC3(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="包含中獎尾數4 : " helperText={vaild4} value={asC4} onChange={(e) => { setasC4(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="包含中獎尾數5 : " helperText={vaild5} value={asC5} onChange={(e) => { setasC5(e.target.value) }} />
            </LeftNavFlexRow>
            <LeftNavFlexRow>
                <Btn color="primary" variant="contained" onClick={() => { setquery(!query) }}>查詢</Btn>
            </LeftNavFlexRow>
            <Table size="small" style={{ width: "700px" }}>
                {mapqueryresult()}
            </Table>
        </LeftNavFlexCol>
    );
};

export default QueryNumberTail;