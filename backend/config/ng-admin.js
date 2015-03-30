var hasMany = {
  roles: {
    targetField: 'name',
    refType: 'referenced_list'
  },
  permissions: {
    targetField: 'name'
  },
  users: {
    targetField: 'displayName',
    refType: 'reference_many'
  },
  posts: {
    targetField: 'displayName',
    refType: 'reference'
  },
  games: {
    targetField: 'name'
  }
};

var hasOne = {
  role: {
    targetField: 'name',
    inListView: true
  },
  user: {
    targetField: 'displayName'
  },
  game: {
    targetField: 'name'
  }
};


module.exports.ngAdmin = {
  models: {

    user: {
      primaryField: 'displayName',
      fields: {
        displayName: {},
        email: {},
        roles: hasMany.roles
      }
    },

    role: {
      primaryField: 'name',
      fields: {
        name: {},
        description: {},
        users: hasMany.users
      }
    },

    post: {
      primaryField: 'title',
      fields: {
        title: {},
        body: {},
        creator: hasOne.user
      }
    }
  }
};
