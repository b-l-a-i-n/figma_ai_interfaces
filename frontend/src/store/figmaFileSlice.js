import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { figmaApi } from '../api'
import { CreateComponent } from '../components/CreateComponent'
import React from 'react';

// const prepareToParse = () => {
//     const parsedObject = {};
//     const parse = (rawObject) => {
//         for (let key in rawObject) {
//             if (typeof rawObject[key] === 'object' || Array.isArray(rawObject[key])) {
//                 if (key === 'document') {
//                     parsedObject[key] = {
//                         id: rawObject[key].id,
//                         children: []
//                     }
//                     parsedObject[key].children.push(...rawObject[key].children.map(child => ({
//                         id: child.id,
//                         style: child.style ? child.style : ''
//                     })))
//                     rawObject = rawObject[key];

//                 } else if (key === 'children') {
//                     parsedObject[key] = {
//                         id: rawObject[key].id,
//                         children: []
//                     }
//                     parsedObject[key].children.push(...rawObject[key].map(child => ({
//                         id: child.id,
//                         style: child.style ? child.style : ''
//                     })))
//                     rawObject = rawObject[key];

//                 }
//                 parse(rawObject);
//             }
//         }
//         return parsedObject;
//     }
//     return parse;
// }

const prepareToParse = () => {
    const parsedObject = {};
    const parse = (rawObject) => {
        for (let key in rawObject) {
            if (typeof rawObject[key] === 'object' && key === 'document') {
                rawObject = rawObject[key];
                parsedObject[key] = {
                    id: rawObject.id,
                    name: rawObject.name,
                    children: rawObject.children.map(child => ({
                        id: child.id,
                        name: child.name,
                        children: []
                    })),
                }
            } else if (Array.isArray(rawObject[key])) {
                console.log(rawObject)
            }
        }

        return parsedObject
    }
    return parse;
}

export const getFigmaRawFile = createAsyncThunk(
    'figmaFile/get',
    async () => {
        return await figmaApi.getFile();
    }
)

const initialState = {
    status: 'loading',
    rawFile: {},
    componentsTree: {}
}

const figmaFileSlice = createSlice({
    name: 'figmaFile',
    initialState,
    reducers: {},
    extraReducers: {
        [getFigmaRawFile.pending]: (state) => {
            state.status = 'loading';
            state.rawFile = {};
        },
        [getFigmaRawFile.fulfilled]: (state, action) => {
            state.status = 'success';
            state.rawFile = action.payload;
            const parseRawFile = prepareToParse();
            const componentsTree = parseRawFile(state.rawFile);
            state.componentsTree = componentsTree;
        },
        [getFigmaRawFile.rejected]: (state) => {
            state.status = 'error';
            state.rawFile = {};
        }
    }
})

export default figmaFileSlice.reducer;