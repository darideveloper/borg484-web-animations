// Simulate api for get names

const names_initial = [
    "Dari Developer Dari Developer 1",
    "Sample 1",
    "Company name Dari Developer 1",
    "John Doe 1",
    "Dari Developer 2",
    "Sample 2",
    "Company name Dari Developer 2",
    "John Doe 2",
    "Dari Developer 3",
    "Sample 3",
    "Company name 3",
    "John Doe 3",
    "Dari Developer 4",
    "Sample 4",
    "Company name Dari Developer 4",
    "John Doe 4",
    "Dari Developer 5",
    "Sample 5",
    "Company name 5",
    "John Doe 5",
    "Dari Developer 6",
    "Sample 6",
    "Company name 6",
    "John Doe 6",
    "Dari Developer 7",
    "Sample 7",
    "Company name 7",
    "John Doe 7",
    "Dari Developer 8",
]

let names = [...names_initial]

function get_random_name () {
    // Return random name and delete from copy list
    const random_name = names[Math.floor(Math.random() * names.length)]
    names.splice (names.indexOf (random_name), 1)
    
    // restart list if is empty
    if (names.length == 0) {
        names = [...names_initial]
    }

    return random_name
}