<!DOCTYPE html>
<html>
<head>
    <title>Upload CSV</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
<div class="container">
    <h2 class="mt-5">Upload CSV File</h2>

    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
            <br>
            File path: {{ session('path') }}
        </div>
    @endif

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="/upload-csv" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="file">Choose CSV File</label>
            <input type="file" class="form-control" name="file" id="file" required>
        </div>
        <button type="submit" class="btn btn-primary">Upload</button>
    </form>
</div>
</body>
</html>
