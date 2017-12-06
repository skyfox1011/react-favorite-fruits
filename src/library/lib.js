export const sortByAsc = (a, b) => {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
}

export const sortByDesc = (a, b) => {
    var x = b.name.toLowerCase();
    var y = a.name.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
}