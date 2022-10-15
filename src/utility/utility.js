
const getWatherForDay = (wdlist,dt) => {
    //console.log("In get weathefor Day ===>",wdlist,dt)
    const matchedWeather = wdlist.filter((item)=>{
        //console.log("item iteration ==>",item,dt,item.dt_txt,item.dt_txt.includes(dt));
        return item.dt_txt.includes(dt)
    })
    //console.log("matchedWeather ========>",matchedWeather);
    return matchedWeather[0];
};

export const get3DaysForecast = (wd) => {
    const today = new Date();
    const datestringToday = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();

    const weatherPlus1 = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate()+1);
    const weatherPlus2 = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate()+2);
    const weatherPlus3 = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate()+3);

    //console.log("Weather date ====================>",weatherPlus1,weatherPlus2,weatherPlus3);

    return [
        getWatherForDay(wd,weatherPlus1),
        getWatherForDay(wd,weatherPlus2),
        getWatherForDay(wd,weatherPlus3),
    ];
}

