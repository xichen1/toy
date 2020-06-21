#include <stdlib.h>
#include <iostream>
#include <string>

using namespace std;

// Term=<Number> | "(" Exp ")"
// Factor = Term ( ( "*" | "/" ) Term) *
// Exp = Factor ( ( "+" | "-" ) Factor) *

struct Expression {
    bool Isnumber;
    int Number;
    char Operator;
    Expression *Left;
    Expression *Right;

    // arrive the bottom of the AST, only number on the node
    Expression(int aNumber) {
        Number = aNumber;
        Isnumber = true;
        Left = nullptr;
        Right = nullptr;
        Operator = 0;
    }

    // operator nodes of the AST
    Expression(char aOperator, Expression *left, Expression *right){
        Operator = aOperator;
        Left = left;
        Right = right;
        Isnumber = false;
        Number = 0;
    }


};

// used to compare '(' , ')' and other operators in this program
bool comp(char *&Stream, const char *Text) {
    int len = strlen(Text);
    char *Read = Stream;
    // skip all empty space
    while (*Read == ' ') {
        Read++;
    }
    if (*Read == *Text) {
        Stream = Read + len; // Move to the following char
        return true;
    } else {
        return false;
    }
}

// check if the token is a number or not, if yes, return the int format
Expression *number(char *&Stream){
    // init the required variable
    int num;
    string result = "";
    char *Read = Stream; 
    while (*Read == ' ') {
        Read++;
    }
    while (true) {
        // letter is between '0' and '9'
        if (*Read >= '0' && *Read <= '9') {
            result = result + *Read; // add the letter at the end
            Read++;
        }
        else {
            break;
        }
    }
    // if there is a number
    if (result.length()) {
        num = stoi(result); // convert the string into int
        Stream = Read; // update the Stream, move the pointer to the next pos
        return new Expression(num); // create a leaf node
    } else {
        return nullptr;
    }
}

Expression *expr(char *&Stream);
Expression *term(char *&Stream);
Expression *fact(char *&Stream);

// check if there exists a term
Expression *term(char *&Stream) {
    Expression *t = number(Stream); // try to get a number first
    // if there exists a direct number
    if (t) {
        return t;
    // check if there exist (expression)
    } else {
        char *Read = Stream;
        if (comp(Read, "(")) {
            Expression *result = expr(Read);
            if (comp(Read, ")")) {
                Stream = Read;
                return result;
            // if there is only ( and no ), wrong input
            } else {
                return nullptr;
            }
        }
        else {
            return nullptr;
        }
    }
}

//check if there exists factor
Expression *fact(char *&Stream) {
    char *Read = Stream;
    // try to get one term
    Expression *t = term(Read);
    if (t) {
        Expression *result = t;
        // put all continuous terms into one factor
        while (true) {
            char sign = 0;
            if (comp(Read, "*")) {
                sign = '*';
            } else if (comp(Read, "/")) {
                sign = '/';
            } else {
                break;
            }
            Expression *next = term(Read);
            // put the original result on left and the new term on right
            if (next) {
                result = new Expression(sign, result, next);
            } else {
                return nullptr;
            }
        }
        Stream = Read;
        return result;
    } else {
        return nullptr;
    }
}

// similar to factor
Expression *expr(char *&Stream) {
    char *Read = Stream;
    Expression *t = fact(Read);
    if (t) {
        Expression *result = t;

        while (true) {
            char sign = 0;
            if (comp(Read, "+")) {
                sign = '+';
            } else if (comp(Read, "-")) {
                sign = '-';
            } else {
                break;
            }
            Expression *next = fact(Read);
            if (next) {
                result = new Expression(sign, result, next);
            } else {
                return nullptr;
            }
        }
        Stream = Read;

        return result;
    } else {
        return nullptr;
    }
}

// use recussion to get the final result
int phrase(Expression *node, int *res) {
    if (node -> Isnumber) {
        return node->Number;
    }
    if ((node -> Operator) == '+') {
        *res = phrase(node -> Left, res) + phrase(node -> Right, res);
    } else if ((node -> Operator) == '-') {
        *res = phrase(node -> Left, res) - phrase(node -> Right, res);
    } else if ((node -> Operator) == '*') {
        *res = phrase(node -> Left, res) * phrase(node -> Right, res);
    } else if ((node -> Operator) == '/') {
        *res = phrase(node -> Left, res) / phrase(node -> Right, res);
    }
    return *res;
}


int main() {
    // TODO: add user input function get get any expression
    char greeting[] = "(2*(6-9)*12/3)";
    char *s = greeting;
    int value = 0, *aaa = &value;
    Expression *result = expr(s);
    if (!result){
        cout << "Wrong input" << endl;
    } else {
        value = phrase(result, aaa);
        cout << value <<endl;
    }
    return 0;
}
