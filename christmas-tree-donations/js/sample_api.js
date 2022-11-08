const data = [
    {size: "s", img: "donor1.jfif"},
    {size: "m", img: "donor2.jfif"},
    {size: "l", img: "donor3.jfif"},
    {size: "xl", img: "donor4.jfif"},
    {size: "s", img: "donor5.jfif"},
    {size: "m", img: "donor6.jfif"},
    {size: "l", img: "donor7.jfif"},
    {size: "xl", img: "donor8.jfif"},
    {size: "s", img: "donor9.jfif"},
    {size: "m", img: "donor10.jfif"},
    {size: "l", img: "donor1.jfif"},
    {size: "xl", img: "donor2.jfif"},
    {size: "s", img: "donor3.jfif"},
    {size: "m", img: "donor4.jfif"},
    {size: "l", img: "donor5.jfif"},
]

function get_donation () {

    // Get random element
    const sphere_index = Math.floor((Math.random()*data.length))
    const sphere_data = data[sphere_index]

    // Remove element from list
    data.splice (sphere_index, 1)

    return sphere_data
}