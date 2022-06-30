
const days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс"
]

export const get_office_schedule = (schedule: any)=>{
    const sorted = schedule.sort((el: any, el2: any)=>el.day-el2.day)
    const schedule_arr = {

    }
    let day_start = 0
    let schedule_key = ""
    let streak = 0
    let prev_val = ""
    for(let i = 0; i<14; i+=2){
        const main_start = new Date(sorted[i].from)
        const additional_end = new Date(sorted[i+1].to)
        const time = `${main_start.getHours()}:${main_start.getMinutes()}-${additional_end.getHours()}:${additional_end.getMinutes()}`
        if (time==prev_val){

            if (streak==0){
                schedule_key = `${days[day_start]}`
            }else{
                schedule_key = `${days[day_start]} - ${days[day_start+streak]}`
            }

            streak+=1
        }else{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            schedule_arr[schedule_key] = prev_val
            day_start+=streak
        }
        prev_val = time

    }

    return schedule_arr
}