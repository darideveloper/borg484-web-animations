const original_data = [
    {size: "small", donor: "sample donor name A"},
    {size: "medium", donor: "sample donor name B"},
    {size: "large", donor: "sample donor name C"},
    {size: "small", donor: "sample donor name D"},
    {size: "medium", donor: "sample donor name E"},
    {size: "large", donor: "sample donor name F"},
    {size: "small", donor: "sample donor name G"},
    {size: "medium", donor: "sample donor name H"},
    {size: "large", donor: "sample donor name I"},
    {size: "small", donor: "sample donor name J"},
    {size: "medium", donor: "sample donor name K"},
    {size: "large", donor: "sample donor name L"},
]

let data = [...original_data]

function get_donation () {

    // Restartd data
    if (data.length == 0) {
        data = [...original_data]
    }

    // Get random element
    const sphere_index = Math.floor((Math.random()*data.length))
    const sphere_data = data[sphere_index]

    // Remove element from list
    data.splice (sphere_index, 1)

    return sphere_data
}