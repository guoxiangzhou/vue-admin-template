
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // verify code
  {
    url: '/verify/code',
    type: 'get',
    response: request => {
      console.log(request.query)

      return {
        code: 0,
        msg: 'ok'
      }
    }
  },

  // register user
  {
    url: '/user/register',
    type: 'post',
    response: request => {
      return {
        code: 0,
        msg: 'ok'
      }
    }
  },

  // user login
  {
    url: '/user/login',
    type: 'post',
    response: request => {
      console.log('login ' + JSON.stringify(request.body))
      return {
        code: 0,
        token: 'admin-token'
      }
    }
  },

  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: request => {
      const { token } = request.query
      const info = users[token]

      console.log(JSON.stringify(request))

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
