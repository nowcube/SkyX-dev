import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { useUserStore } from '../store/user.js'

const routes = [
	{
		name: "Home",
		path: "/",
		component: () => import("../views/index.vue")
	},
	{
		name: "Post",
		path: "/post/:post_id",
		component: () => import("../views/post.vue")
	},
	{
		name: "Login",
		path: "/login/",
		component: () => import("../views/login.vue")
	},
	{
		name: "Register",
		path: "/register/",
		component: () => import("../views/register.vue")
	},
	{
		name: "Like",
		path: "/like/",
		component: () => import("../views/like.vue")
	},
	{
		name: "User",
		path: "/user/",
		component: () => import("../views/user.vue")
	}
]

const router = createRouter({
	//使用url的#符号之后的部分模拟url路径的变化,因为不会触发页面刷新,所以不需要服务端支持
	//history: createWebHashHistory(), 
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	}
})

// router.beforeEach(async (to, from, next) => {
// 	const token = localStorage.getItem('token')
// 	if (to.name !== 'Login' && !token ) next({name: 'Login'})
// 	else next()
// })

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()
	const token = userStore.getToken();
	// 如果目标路由不是登录页也不是注册页，并且没有token，则重定向到登录页
	// todo
	// 需要做注销
	// 保证用户唯一性
	if (to.name !== 'Login' && to.name !== 'Register' && !token) {
		next({ name: 'Login' });
	} else {
		next(); // 否则正常进入目标路由  
	}
});

export default router
