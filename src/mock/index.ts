// 引入mockjs
import Mock from 'mockjs';

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "权限管理",
    icon: "lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "页面权限",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "按钮权限",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    }
  ]
};

Mock.mock("/getAsyncRoutes",'get',{
  success: true,
  data: [permissionRouter]
});

Mock.mock("/login",'post',({ body })=> {
  if (body.username === "admin") {
    return {
      success: true,
      data: {
        username: "admin",
        // 一个用户可能有多个角色
        roles: ["admin"],
        accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
        expires: "2023/10/30 00:00:00"
      }
    };
  } else {
    return {
      success: true,
      data: {
        username: "common",
        // 一个用户可能有多个角色
        roles: ["common"],
        accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
        expires: "2023/10/30 00:00:00"
      }
    };
  }
});

Mock.mock("/refreshToken",'post',({ body })=> {
  if (body.refreshToken) {
    return {
      success: true,
      data: {
        accessToken: "eyJhbGciOiJIUzUxMiJ9.newAdmin",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.newAdminRefresh",
        // `expires`选择这种日期格式是为了方便调试，后端直接设置时间戳或许更方便（每次都应该递增）。如果后端返回的是时间戳格式，前端开发请来到这个目录`src/utils/auth.ts`，把第`38`行的代码换成expires = data.expires即可。
        expires: "2023/10/30 23:59:59"
      }
    };
  } else {
    return {
      success: false,
      data: {}
    };
  }
});

export default Mock