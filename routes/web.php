<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */


Route::get('/', 'App\Http\Controllers\LoginController@showLoginForm')->name('login-form');
Route::get('/login', 'App\Http\Controllers\LoginController@showLoginForm')->name('login-form');
Route::get('/logout', 'App\Http\Controllers\LoginController@logout')->name('log-out');
Route::post('/login', 'App\Http\Controllers\LoginController@Loginprocess')->name('login-process');
Route::get('/signup', 'App\Http\Controllers\LoginController@showSignupForm')->name('signup-form');
Route::post('/signup', 'App\Http\Controllers\LoginController@Signupprocess')->name('signup-process');

Route::get('/broadcast', 'App\Http\Controllers\BroadcastController@mainbroadcast')->name('main-broadcast');
Route::get('/invite/{link}', 'App\Http\Controllers\BroadcastController@mainbroadcast')->name('invite-broadcast');


Route::get('/record', 'App\Http\Controllers\BroadcastController@test')->name('record-broadcast');
