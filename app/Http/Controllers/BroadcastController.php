<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BroadcastController extends Controller
{
    //
    public function __construct()
    {
    }

    public function mainbroadcast($link = "")
    {
        if (!empty($link)) {
            $link = base64_decode(urldecode($link));
            $user = User::where('user_token', $link)->first();
            if (!empty($user)) {
                // $Invite = new Invite;
                // $Invite->name = "";
                // $Invite->ref_name = $user->name;
                // $Invite->ref_token = $user->user_token;
                // $Invite->save();
                // $user = "";
                return view('broadcast', compact('user'));
            } else {
                return redirect()->route('log-out');
            }
        } else {
            if (Auth::guard('web')->check()) {
                // Auth::logout();
                $user = Auth::user();
                // dd(Auth::user()->name);
                return view('broadcast', compact('user'));
            } else {
                return redirect()->route('log-out');
            }
        }
    }

    public function test()
    {
        echo "hi i am test here";
    }
}
