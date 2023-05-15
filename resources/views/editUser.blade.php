<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>

<head>
    <title>ALPHAUPO</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--JQUERY-->
    <script src="{{asset('lib/Jquery/jquery-3.6.0.min.js')}}"></script>

    <!--BOOTSTRAP-->
    <link href="{{ asset('lib/Bootstrap5/bootstrap.css') }}" rel="stylesheet">
    <script src="{{ asset('lib/Bootstrap5/bootstrap.bundle.js')}}"></script>

    <!--BOARD STYLES-->
    <link href="{{ asset('css/board.css')}}" rel="stylesheet">

    @include('Layout.linksPortada')
</head>




<body>

@extends('Layout.header')

<div class="container" style="margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Edit User') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{route('userEdit')}}">
                        @csrf

                        <div class="row mb-3">
                            <input id="idUser" type="text" name="idUser" value="{{$user->id}}" hidden>


                            <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{$user->name}}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{$user->email}}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div style="width: fit-content; margin:auto;">
                            @if($user->is_admin == 0)
                                <label class="form-check-label" style="margin-right: 1vh" for="esAdmin">Es Administrador</label>
                                <input class="form-check-input" type="checkbox" id="esAdmin" name="esAdmin" value="1">
                                
                            @else
                                <label class="form-check-label" style="margin-right: 1vh" for="esAdmin">Es Administrador</label>
                                <input class="form-check-input" type="checkbox" id="esAdmin" name="esAdmin" value="1" checked>
                            @endif
                            </div>
                        </div>
                        <br/>
                        
                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Edit') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
