/**
 * Created by phule on 29/07/2014.
 */
var fortuneCookies = ["Conquer your fears or they will conquer you",
    "Rivers need springs",
    "Do not feat what you don'n know",
    "You will have a pleasant surpise",
    "Whenever possible, keep it smile"
];

exports.getFortune = function() {
  var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};