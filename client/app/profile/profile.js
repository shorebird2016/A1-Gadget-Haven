//support profile page functionalities outside of AngularJS
const stateList = [
    { country: 'US', state: ['CA', 'NV', 'OR' ] },
    { country: 'China', state: ['Canton', 'Sichuan', 'Shandong' ] },
    { country: 'Canada', state: ['Ontario', 'Alberta', 'Quebec' ] }
];
const cityList = [
    { state: 'CA', city: ['San Francisco', 'San Jose', 'Los Angeles' ] },
    { state: 'NV', city: ['Las Vegas', 'Reno', 'Carson City' ] },
    { state: 'OR', city: ['Portland', 'Salem', 'Beaverton' ] },
    { state: 'Canton', city: ['Guangzhou', 'Foshan', 'Shenzhen' ] },
    { state: 'Shandong', city: ['Jinan', 'Qingdao', 'Yantai' ] },
    { state: 'Sichuan', city: ['Chengdu', 'Mianyang', 'Nanchong' ] },
    { state: 'Ontario', city: ['Upland', 'Pomona', 'Fontana' ] },
    { state: 'Alberta', city: ['McMurray', 'Edmonton', 'Calgary' ] },
    { state: 'Quebec', city: ['Wendake', 'Shannon', 'Beaumont' ] }
];

//helper to find city list, null returned if not found
function findCityList(state) {
    for (var idx = 0; idx < cityList.length; idx++) {
        var st = cityList[idx].state;
        if (st === state)
            return cityList[idx].city;
    }
    return null;
}
//helper to find state list, null returned if not found
function findStateList(country) {
    for (var idx = 0; idx < stateList.length; idx++) {
        var ct = stateList[idx].country;
        if (ct === country)
            return stateList[idx].state;
    }
    return null;
}
function handleStateChange(cur_state) {
    var citylist = findCityList(cur_state);
    var elem_select_city = document.getElementById('city-id');
    elem_select_city.innerHTML = '';//remove all
    citylist.forEach(function (item, index) {//append children of options
        elem_select_city.options[index] = new Option(item, item);
    })
}
function handleCountryChange(cur_country) {
    document.getElementById('country-id').addEventListener('change', function (evt) {
        var cur_country = evt.target.options[evt.target.selectedIndex].value;
        var state_list = findStateList(cur_country);
        var elem_state_select = document.getElementById('state-id');
        elem_state_select.innerHTML = '';
        state_list.forEach(function (item, index) {
            elem_state_select.options[index] = new Option(item, item);
        });
        handleStateChange(state_list[0]);
    });
}

