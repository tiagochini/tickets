<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv=”X-UA-Compatible” content=”IE=edge”>

        <title>Laravel</title>

        <meta id="csrf-token" name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
    <div id="app"></div>
    <script src="{{ mix('js/index.js') }}"></script>
    </body>
</html>
