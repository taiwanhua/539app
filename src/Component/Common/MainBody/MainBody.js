import React, { useContext } from 'react';
import { FlexCol } from '../Flexs/Flexs'
import { Topcontext } from "../../Context/Topcontext";
import QueryDraw from '../../Functional/QueryDraw'
import QueryNumber from '../../Functional/QueryNumber'
import QueryNumberTail from '../../Functional/QueryNumberTail'
import QuerySameDealerNumber from '../../Functional/QuerySameDealerNumber'
import QueryEveryNumTimes from '../../Functional/QueryEveryNumTimes'
const MainBody = ({ props, ...other }) => {
    const { Globalcontext, Globalcontextdispatch } = useContext(Topcontext);
    return (
        <FlexCol style={{ left: "20vw", position: "relative" }}>
            {Globalcontext.OpenFunction.QueryDraw && <QueryDraw />}
            {Globalcontext.OpenFunction.QueryNumber && <QueryNumber />}
            {Globalcontext.OpenFunction.QueryNumberTail && <QueryNumberTail />}
            {Globalcontext.OpenFunction.QuerySameDealerNumber && <QuerySameDealerNumber />}
            {Globalcontext.OpenFunction.QueryEveryNumTimes && <QueryEveryNumTimes />}
        </FlexCol >
    )
};

export default MainBody;