const gulp = require('gulp');
const shell = require('gulp-shell')
const package = require("./package.json")

gulp.task("npmSetconfig", shell.task([
    "npm set //" + package.npmPublish.ip + '/:username=' + package.npmPublish.userName,
    "npm set //" + package.npmPublish.ip + '/:_password=' + package.npmPublish.passWord,
    "npm set //" + package.npmPublish.ip + '/:email=' + package.npmPublish.email,
    "npm set //" + package.npmPublish.ip + '/:always-auth=false'
]))