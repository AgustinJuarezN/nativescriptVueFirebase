import Vue from "nativescript-vue";
import Login from "./components/login";
import store from "./store"
import firebase from "nativescript-plugin-firebase"

firebase
    .init()
    .then(() => (console.log("firebase is ok")))
    .catch((error) => (console.log(error)))

new Vue({
    render: h => h('frame',[h(Login)]),
    store
}).$start();
