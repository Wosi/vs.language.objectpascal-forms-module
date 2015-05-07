/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './objectpascal-forms-moduleDef', 'monaco'], function (require, exports, languageDef, monaco) {
    monaco.Modes.registerMonarchDefinition('objectpascal-forms-module', languageDef.language);
});
