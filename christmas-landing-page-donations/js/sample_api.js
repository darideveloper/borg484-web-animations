const original_data = [
    {size: "small", donor: "sample donor name A", photo: "donor1.jfif"},
    {size: "medium", donor: "sample donor name B", photo: "donor2.jfif"},
    {size: "large", donor: "sample donor name C", photo: "donor3.jfif"},
    {size: "small", donor: "sample donor name D", photo: "donor4.jfif"},
    {size: "medium", donor: "sample donor name E", photo: "donor5.jfif"},
    {size: "large", donor: "sample donor name F", photo: "donor6.jfif"},
    {size: "small", donor: "sample donor name G", photo: "donor7.jfif"},
    {size: "medium", donor: "sample donor name H", photo: "donor8.jfif"},
    {size: "large", donor: "sample donor name I", photo: "donor9.jfif"},
    {size: "small", donor: "sample donor name J", photo: "donor10.jfif"},
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