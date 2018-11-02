// Lecture: Closures

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function (yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}
var retirementUS = retirement(66);
// Even after function retirement execution a clouse stays in memory as clouser

var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);