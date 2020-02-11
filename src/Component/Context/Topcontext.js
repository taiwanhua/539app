import React, { createContext, useReducer } from "react";

//創建Context並導出
export const Topcontext = createContext({});

//給符合action格式的Type並導出，設type為true是為對應promise的OK欄位，true為獲取數據成功
export const Topcontexttype = true;


//全域共享變數reducer
const Globalcontextreducer = (state, action) => {
    console.log("old", state);
    console.log("new", action);
    // console.log("new", action.payload);
    console.log("----------------------")
    switch (action.type) {
        case "OpenFunction":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

//創建外層組件，透過props屬性，使得包裹的所有元件都可以訪問useReducer的參數[state,dispatch](主要是要調用disspatch更新State)
export const Topcontextfunction = props => {

    const [Globalcontext, Globalcontextdispatch] = useReducer(Globalcontextreducer, {
        UrlHeader: "http://localhost:57494/",

        OpenFunction: { QueryDraw: true, QueryNumber: false, QueryNumberTail: false, QuerySameDealerNumber: false, QueryEveryNumTimes: false },
    });//設定useReducer
    // console.log(color, dispatch);
    // console.log(props)
    return (
        <Topcontext.Provider value={{ Globalcontext, Globalcontextdispatch }}>
            {props.children}{/*渲染子組件*/}
        </Topcontext.Provider>
    );
};
