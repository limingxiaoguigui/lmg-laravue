<?php
/*
 * @Description:
 * @Author: LMG
 * @Date: 2020-03-08 19:45:07
 * @LastEditors: LMG
 * @LastEditTime: 2020-03-08 19:45:54
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LaravueController extends Controller
{
    /**
     * 列表页
     * @return void
     */
    public function index()
    {
        return view('laravue');
    }
}