import React, { useContext } from 'react';
import { Topcontext } from "../../Context/Topcontext";
import styled from "styled-components"
import { FlexCol } from '../Flexs/Flexs'
import Button from '@material-ui/core/Button';

const LeftNavFlexCol = styled(FlexCol)`
    position:fixed;
    top:0px;
    left:0px;
    width:20vw;
    height:100vh;
    background-color:#ef4339;
    
`
const ListItem = styled(Button)`
    height: 100px;
    text-align: center;
    line-height: 100px;
    &.MuiButton-root {
        font-size: 26px;
    }
`
const LeftNav = ({ props, ...other }) => {
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);

    return (
        <LeftNavFlexCol>
            <ListItem onClick={() => {
                Globalcontextdispatch({
                    type: "OpenFunction",
                    payload: {
                        OpenFunction: { ...Globalcontext.OpenFunction, QueryDraw: !Globalcontext.OpenFunction.QueryDraw }
                    }
                });

            }}>查詢中獎號碼</ListItem>
            <ListItem onClick={() => {
                Globalcontextdispatch({
                    type: "OpenFunction",
                    payload: {
                        OpenFunction: { ...Globalcontext.OpenFunction, QueryNumber: !Globalcontext.OpenFunction.QueryNumber }
                    }
                });

            }}>中獎號碼統計(中獎號碼)</ListItem>
            <ListItem onClick={() => {
                Globalcontextdispatch({
                    type: "OpenFunction",
                    payload: {
                        OpenFunction: { ...Globalcontext.OpenFunction, QueryNumberTail: !Globalcontext.OpenFunction.QueryNumberTail }
                    }
                });

            }}>中獎號碼統計(中獎尾數)</ListItem>
            <ListItem onClick={() => {
                Globalcontextdispatch({
                    type: "OpenFunction",
                    payload: {
                        OpenFunction: { ...Globalcontext.OpenFunction, QuerySameDealerNumber: !Globalcontext.OpenFunction.QuerySameDealerNumber }
                    }
                });

            }}>連莊中獎號碼統計</ListItem>
            <ListItem onClick={() => {
                Globalcontextdispatch({
                    type: "OpenFunction",
                    payload: {
                        OpenFunction: { ...Globalcontext.OpenFunction, QueryEveryNumTimes: !Globalcontext.OpenFunction.QueryEveryNumTimes }
                    }
                });

            }}>各號碼開出次數統計</ListItem>
        </LeftNavFlexCol>
    );
};

export default LeftNav;