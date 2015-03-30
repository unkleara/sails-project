<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="admin/css/ng-admin.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.14/angular.js"></script>

</head>
<body ng-app="adtAdmin">
<script> var adminConfig = {{ adminConfig | json | safe }}</script>

<div ui-view></div>


<script src="admin/js/ng-admin-configuration.min.js" type="text/javascript"></script>
<script src="admin/js/ng-admin.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.5.0/lodash.min.js" type="text/javascript"></script>
<script src="admin/js/ng-admin.models.js" type="text/javascript"></script>

</body>
</html>
