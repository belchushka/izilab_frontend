import * as moment from "moment";


export default function check_card_type(analysis){
    const has_stock = analysis.analysis_data.has_stock;
    if (!has_stock){
        return {
            type:'default',
            analysis: analysis
        }
    }else{
        const stock_actual = moment.default()
            .utc()
            .isBefore(moment.default(analysis.analysis_data.stock_until));
        if (has_stock) {
            if (stock_actual) {
                return {
                    type:'stock',
                    analysis: analysis
                }
            } else {
                return {
                    type:'default',
                    analysis: {
                        ...analysis,
                        analysis_data:{
                            ...analysis.analysis_data,
                            price:analysis.analysis_data.prev_stock_price
                        }
                    }
                }
            }
        }
    }
}