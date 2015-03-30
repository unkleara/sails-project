
(function() {
    'use strict';

    var app = angular.module('adtAdmin', ['ng-admin']);
    var appConfig = {
        actions: ['edit', 'delete']
    };

    app.config(function (AdminDescription, NgAdminProvider, RestangularProvider) {

        //console.log(adminConfig);


        var nga = AdminDescription;
        var buildDashboardViews = buildDashboardViews;
        var buildListViews = buildListViews;
        var buildCreationViews = buildCreationViews;
        var buildEditViews = buildEditViews;

        var app = nga.application('Admin') // application main title
            .baseApiUrl('http://localhost:1337/'); // main API endpoint

        RestangularProvider.addElementTransformer('post', function(element) {
          element.bodyClean = element.body;
          for (var key in element.values) {
              element[key] = element.values[key];
            }
          return element;
        });

        RestangularProvider.addElementTransformer('user', function(element) {
            for (var key in element.values) {
                element[key] = element.values[key];
            }

            return element;
        });

        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
          //console.log(element, operation, what, url, headers, params);
            if (operation == "getList") {
                // custom pagination params
                //params._start = (params._page - 1) * params._perPage;
                //params._end = params._page * params._perPage;
                delete params._page;
                delete params._perPage;
                // custom sort params
                if (params._sortField) {
                    params.sort = params._sortField + ' ' + params._sortDir;
                    delete params._sortField;
                    delete params._sortDir;
                }
                // custom filters
                if (params._filters) {
                    for (var filter in params._filters) {
                        params[filter] = params._filters[filter];
                    }
                    delete params._filters;
                }
            }

            return { params: params };
        });

        var user = nga.entity('user').identifier(nga.field('id'));
        var post = nga.entity('post');
        var role = nga.entity('role');

        buildDashboardViews();
        buildListViews();
        buildCreationViews();
        buildEditViews();



        function buildDashboardViews() {

            user.menuView().order(5);
            post.menuView().order(50);
            role.menuView().order(50);

            user.dashboardView()
            .title('Recent user')
            //.order(1)
            .fields([nga.field('displayName').isDetailLink(true)]);

            // set the list of fields to map in each post view
            post.dashboardView() // customize the dashboard panel for this entity
            .title('Recent post');
            //.order(1) // display the post panel first in the dashboard
            //.limit(5) // limit the panel to the 5 latest post
            //.fields([nga.field('title').isDetailLink(true).map(truncate)]);

        }

        function buildListViews() {

            post.listView()
            .title('All post') // default title is "[Entity_name] list"
            .fields([
                nga.field('title', 'string'),//.label('ID'), // The default displayed name is the camelCase field name. label() overrides id
                nga.field('createdAt', 'date'), // Date field type allows date formatting
                nga.field('creator_id', 'reference')
                .label('Creator') // a Reference is a particular type of field that references another entity
                .targetEntity(user) // displayName tag entity is defined later in this file
                .targetField(nga.field('displayName')), // the field to be displayed in this list

            ])
            .listActions(appConfig.actions);

            user.listView()
            .title('All user')
            .description('List of users')
            .fields([
                nga.field('id', 'string').label('ID'),
                nga.field('displayName')
            ])
            .listActions(appConfig.actions);

            role.listView()
            .title('Roles')
            .description('List of roles')
            .fields([
                nga.field('id', 'string').label('ID'),
                nga.field('name')
            ])
            .listActions(appConfig.actions);
        }

        function buildCreationViews() {

            user.creationView()
            .fields([
                nga.field('displayName'),
                nga.field('email')
            ]);

            role.creationView()
            .fields([
                nga.field('name'),
                nga.field('description'),
                nga.field('users', 'reference_many')
                .targetEntity(user)
                .targetField(nga.field('displayName'))
            ]);

            post.creationView()
            .fields([
                nga.field('title'),
                nga.field('published', 'date'),
                nga.field('active', 'boolean'),
                nga.field('body', 'wysiwyg'),
                nga.field('bodyClean', 'text'),
                nga.field('creator_id', 'reference')
                  .label('Creator')
                  .targetEntity(user)
                  .targetField(nga.field('displayName'))
            ]);
        }

        function buildEditViews() {

            user.editionView()
            .title('Edit user "{{ entry.values.id }}"')
            .fields([
              nga.field('displayName'),
              nga.field('email'),
              nga.field('isAdmin', 'boolean'),
              nga.field('roles', 'referenced_list') // display list of related roles
              .targetEntity(role)
              .targetReferenceField('user_id')
              .targetField(nga.field('name'))
            ]);

            role.editionView()
            .title('Edit role "{{ entry.values.name }}"')
            .fields([
              nga.field('name'),
              nga.field('description'),
              nga.field('users', 'reference_many')
              .targetEntity(user)
              .targetField(nga.field('displayName'))
            ]);

            post.editionView()
            .title('Edit post "{{ entry.values.title }}"')
            .fields([
                post.creationView().fields()
            ]);
        }

        function truncate(value) {
            if (!value) return '';
            return value.length > 50 ? value.substr(0, 50) + '...' : value;
        }


        app.addEntity(post);
        app.addEntity(user);
        app.addEntity(role);

        NgAdminProvider.configure(app);

    });
}());
