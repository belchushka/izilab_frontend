import {AppDispatch, AppThunkAction} from "../types";
import {$host} from "../../http";
import {setCity, setOffices} from "../reducers/citySlice";

export const getCitySuggestion: AppThunkAction = () => async () => {
    // const {data: ip} = await $host.get("user/get_ip")
    // const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
    // const token = "d9e40c314c1b459d03bac9b5b6bd4b7d4021166b";
    // const options = {
    //     method: "GET",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": "Token " + token
    //     }
    // }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // const {location} = await (await fetch(url + "31.13.130.213", options)).json()
    // if (location == null) {
    //     return null
    // }
    try {
        const {data: city_instance} = await $host.get("/city/get_from_name", {
            params: {
                name: "Казань"
            }
        })
        return city_instance
    } catch (e) {
        return null
    }
}

export const setCurrentCity: AppThunkAction = (city: any) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setCity({
            id: city.id,
            name: city.name
        }))

        const {data: offices} = await $host.get("/city/offices", {
            params: {
                city_id: city.id
            }
        })
        dispatch(setOffices(offices))
    } catch (e) {
        console.log(e)
    }
}