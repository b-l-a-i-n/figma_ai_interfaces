import { configureStore } from "@reduxjs/toolkit";
import figmaFileSlice, { getFigmaRawFile } from "./figmaFileSlice";


const store = configureStore({
    reducer: {
        figmaFile: figmaFileSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: getFigmaRawFile,
            },
            serializableCheck: false
        })
})

export default store