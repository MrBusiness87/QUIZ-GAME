//code to count vowels in a string through console log.
function vowel_count(string) {
    var vowel_list = 'aeiouAEIOU';
    var vcount = 0;
    for(var x = 0; x < string.length ; x++) {
    if (vowel_list.indexOf(string[x]) !== -1) {
    vcount += 1;}
    }
    return vcount;
    }
    console.log("Hello", vowel_count("Hello"));