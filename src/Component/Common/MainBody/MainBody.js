import React ,{useContext}from 'react';
import {FlexCol} from '../Flexs/Flexs'
import { Topcontext } from "../../Context/Topcontext";
import QueryDraw from '../../Functional/QueryDraw'
import QueryNumber from '../../Functional/QueryNumber'
import QueryNumberTail from '../../Functional/QueryNumberTail'

const MainBody = ({ props, ...other }) => {
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);
    return (
        <FlexCol style={{left:"20vw",position: "relative"}}>
            {Globalcontext.OpenFunction.QueryDraw && <QueryDraw />}
            {Globalcontext.OpenFunction.QueryNumber && <QueryNumber />}
            {Globalcontext.OpenFunction.QueryNumberTail && <QueryNumberTail />}
        </FlexCol>
    )
};

export default MainBody;