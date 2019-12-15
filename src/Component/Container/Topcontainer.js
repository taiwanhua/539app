import React from 'react';
import { Topcontextfunction } from "../Context/Topcontext";
import LeftNav from '../Common/Navs/LeftNav'
import { FlexRow } from '../Common/Flexs/Flexs'
import MainBody from '../Common/MainBody/MainBody'

function Topcontainer({ props, ...other }) {

    return (
        <Topcontextfunction >
            <div style={{ backgroundColor: "red" ,height:"100vh"}}>
                <FlexRow>
                    <LeftNav />
                    <MainBody />
                </FlexRow>
            </div>
        </Topcontextfunction>
    );
}

export default Topcontainer;
