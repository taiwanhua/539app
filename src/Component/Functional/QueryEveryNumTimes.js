import React, { useRef, useEffect, useState, useContext/*React Hooks*/ } from 'react';
import { Bar } from '../Common/BarChart/Bar'
import { Topcontext } from "../Context/Topcontext";
import { FlexCol, FlexRow } from '../Common/Flexs/Flexs'
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LeftNavFlexCol = styled(FlexCol)`
    width:80vw;
    height:600px;;
    background-color:#f8b195;
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
const QueryEveryNumTimes = ({ props, ...other }) => {
    const [howMany, sethowMany] = useState(1);
    const [period, setperiod] = useState(20);
    const [query, setquery] = useState(1);
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);
    const [data, setdata] = useState([]);

    useEffect(() => {
        if (howMany !== "" && period !== "") {
            let url = new URL(Globalcontext.UrlHeader + "api/WinNumbers/GetNumberTimes?lasterPeriod=" + period + "&CountOfSameOpenNumber=" + howMany);
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
                setdata(result);
            }
            PData();
        }
    }, [query])


    return (

        <LeftNavFlexCol>
            中獎號碼統計(中獎號碼)
           <LeftNavFlexRow>
                <LasterPeriodTextField variant="outlined" label="最近幾期內 : " value={period} onChange={(e) => { setperiod(e.target.value) }} />
                <LasterPeriodTextField variant="outlined" label="同時開出數量 : " helperText={"1~5"} value={howMany} onChange={(e) => {
                    sethowMany(e.target.value);
                    if (e.target.value !== "") {
                        if (e.target.value > 5) {
                            sethowMany(5);

                        } else if (e.target.value < 1) {
                            sethowMany(1);
                        } else {
                            sethowMany(e.target.value);
                        }
                    }
                }} />
            </LeftNavFlexRow>
            <LeftNavFlexRow>
                <Btn color="primary" variant="contained" onClick={() => { setquery(query + 1) }}>查詢</Btn>
            </LeftNavFlexRow>


            <div style={{ height: "800px", width: "80vw", backgroundColor: "rgb(224, 142, 78)" }}>
                <Bar data={data} />
            </div>
        </LeftNavFlexCol>
    )
};

export default QueryEveryNumTimes;