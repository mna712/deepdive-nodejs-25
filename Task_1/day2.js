function getGrade(score) {
    let grade;
    score>25&&score<=30?grade="A"
        :score>20&&score<=25?grade="B"
            : score>15&&score<=20? grade="C"
                :score>10&& score<=15? grade="D"
                    : score>5&&score<=10? grade="E"
                        :grade="F";
    return grade;

}

function getLetter(s) {
    let letter;
    switch (s[0]) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u':
            letter = 'A';
            break;
        case 'b':
        case 'c':
        case 'd':
        case 'f':
        case 'g':
            letter = 'B';
            break;
        case 'h':
        case 'j':
        case 'k':
        case 'l':
        case 'm':
            letter = 'C';
            break;
        default:
            letter = 'D';
    }
    return letter;
}
