import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";

export function PriceRange() {

    const [price, setPrice] = useState();
    const mark = [{value:0,label:"$0"},{value:1000,label:"$1000"}]

    function handlePriceChange(e,value) {
        setPrice(value);
    }

    return(
        <div className="container-fluid mt-4">
            <h5>Set Price</h5>
            <Box>
                <Slider max={1000} min={0} step={10} value={price} onChange={handlePriceChange} valueLabelDisplay="auto" marks={mark}/>
            </Box>
        </div>
    )
}