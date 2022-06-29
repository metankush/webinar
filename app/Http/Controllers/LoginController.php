<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->_machine = str_pad(dechex(rand(0, 16777215)), 6, "0", STR_PAD_LEFT);
        $this->_pid = str_pad(dechex(rand(0, 32767)), 4, "0", STR_PAD_LEFT);
        $this->_increment = rand(0, 16777215);

        //We need a DateTime object to get timestamps, cache it
        $this->_datetime = Carbon::now()->timestamp;
    }

    public function showLoginForm()
    {
        if (Auth::guard('web')->check()) {
            // Auth::logout();
            return redirect()->route('main-broadcast');
        } else {
            return view('login');
        }
    }

    public function showSignupForm()
    {
        if (Auth::guard('web')->check()) {
            return redirect()->route('user-dashboard');
        } else {
            return view('signup');
        }

    }

    public function logout()
    {
        if (Auth::guard('web')->check()) {
            Auth::logout();
            return redirect()->route('login-form');
        } else {
            return redirect()->route('login-form');
        }
    }

    public function Loginprocess(Request $request)
    {
        $rules = ['email' => 'required|email', 'password' => 'required'];
        $customs = [];
        $validator = Validator::make($request->all(), $rules, $customs);
        if ($validator->fails()) {
            $res = array("result" => false, 'msg' => $validator->errors()->first());
        } else {
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $res = array("result" => true, 'msg' => 'Login Successfully done.');
            } else {
                $res = array("result" => false, 'msg' => 'Credentials Doesn\'t Match !');
            }
        }
        echo json_encode($res);
    }

    public function Signupprocess(Request $request)
    {
        $rules = ['name' => 'required', 'email' => 'required|email|unique:users'];
        $customs = ['email.unique' => 'Sorry, Email Already Exists', 'name.required' => 'The Full Name field is required.'];
        $validator = Validator::make($request->all(), $rules, $customs);
        if ($validator->fails()) {
            $res = array("result" => false, 'msg' => $validator->errors()->first());
        } elseif ($request->password != $request->cpassword) {
            $res = array("result" => false, 'msg' => 'Password and Confirm Password are not same');
        } else {
            $user = new User;
            $input = $request->all();
            $input['password'] = bcrypt($request->password);
            $user->fill($input)->save();
            $last_id = $user->id;
            $user_token = $this->getNewId();
            $user_token = $last_id . $user_token . $last_id;
            User::where('id', $last_id)->update([
                'user_token' => $user_token,
            ]);
            $res = array("result" => true, 'msg' => 'Successfully Registered');
        }
        echo json_encode($res);
    }

    public function getNewId($forcedincrement = null)
    {
        if (is_null($forcedincrement)) {
            $this->_increment++;
            if ($this->_increment > 0xffffff) {
                $this->_increment = 0;
            }
        } else {
            $this->_increment = $forcedincrement;
        }
        $timestamp = $this->_datetime;

        $timestamp_final = str_pad(dechex($timestamp), 8, "0", STR_PAD_LEFT);
        $increment_final = str_pad(dechex($this->_increment), 6, "0", STR_PAD_LEFT);
        return $timestamp_final . $this->_machine . $this->_pid . $increment_final;
    }
}
