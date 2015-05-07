/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'ObjectPascal Forms Module',
        name: 'objectpascal-forms-module',
        mimeTypes: [],
        ignoreCase: true,
        defaultToken: '',
        lineComment: '//',
        blockCommentStart: '(*',
        blockCommentEnd: '*)',
        
        brackets: [            
            { token: 'delimiter.array', open: '[', close: ']' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' },
            { token: 'delimiter.generic', open: '<', close: '>' },
            { token: 'keyword.tag-begin', open: 'object', close: 'end' },
            { token: 'keyword.tag-begin', open: 'inherited', close: 'end' },          
        ],

        textAfterBrackets: true,
        autoClosingPairs: [
          ['{', '}'], 
          ['[', ']'], 
          ['(', ')'], 
          ['<', '>'], 
          ['\'', '\'']],
        
        // the default separators except `@$`
        wordDefinition: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        keywords: [
            'OBJECT',
            'INHERITED',
            'END'
        ],
        
        tagwords: [
            'object',
            'inherited',
            'end'
        ],     
           
        operators: [
            '=',
            '>',
            '<',                                             
            '!',
            '~',
            '?',
            ':',            
            '+',
            '-',
            '*',
            '/',
            'div',
            'mod',
            'not',
            'and',
            'or',
            'xor',
            'shl',
            'shr',
            'is',
            'as', 
            '&',
            '^',
            '@',
            ':=',            
          ],
          
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                { include: '@whitespace' },
                [/[a-zA-Z_]\w*/, { cases: { 
                  '@tagwords': '@brackets',
                  '@operators': 'keyword.operator',
                  '@keywords': { token: 'keyword.$0' }, 
                  '@default': 'identifier' } }],
                [/[()\[\]]/, '@brackets'],                                
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, { cases: {   
                  '@operators': 'keyword.operator',
                  '@default': '' } }],
                [/@\s*[a-zA-Z_\$][\w\$]*/, 'number.hex'],
                [/\d*\d+[eE]([\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/0[xX][0-9a-fA-F_]*[0-9a-fA-F][Ll]?/, 'number.hex'],
                [/0[0-7_]*[0-7][Ll]?/, 'number.octal'],
                [/0[bB][0-1_]*[0-1][Ll]?/, 'number.binary'],
                [/\d+[fFdD]/, 'number.float'],
                [/\d+[lL]?/, 'number'],
                [/[;,.]/, 'delimiter'],
                [/'([^'\\]|\\.)*$/, 'string.invalid'],
                [/'/, 'string', '@string'],
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid']
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/{(?!\$)/, 'constant.numeric.hex', '@hexvalues'],
                [/{\$/, 'annotation', '@compilerdirective'],                
                [/\(\*/, 'comment', '@braceasteriskcomment'],
                [/\/\/.*$/, 'comment'],
            ],
            
            hexvalues: [
                [/[^}]+/, 'constant.numeric.hex'],
                [/}/, 'constant.numeric.hex', '@pop'],
                [/{/, 'constant.numeric.hex'],                   
            ],
            
            braceasteriskcomment: [
                [/((?!\*\)).)+/, 'comment'],
                [/\*\)/, 'comment', '@pop'],
                [/\(\*/, 'comment'],                    
            ],     
            
            compilerdirective: [
                [/[^}]+/, 'annotation'],
                [/}/, 'annotation', '@pop'],
                [/{\$/, 'annotation'],                   
            ],                   

            string: [
                [/[^\\']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/'/, 'string', '@pop']
            ],
        },
    };
});
