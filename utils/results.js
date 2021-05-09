exports.BLOOD_TYPES = [
    "O+",
    "O-",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
]

/*  the rarest blood types:
O positive: 35%
O negative: 13%
A positive: 30%
A negative: 8%
B positive: 8%
B negative: 2%
AB positive: 2%
AB negative: 1%
*/

exports.randomise = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}