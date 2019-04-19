import Vue from "nativescript-vue";
import Vuex from "vuex"
import firebase from "nativescript-plugin-firebase"

Vue.use(Vuex)

    export default new Vuex.Store({
        state:{
          user: {
            email: null,
            password: null,
            logged:false
          }
        },
        mutations: {
            setEmailAndPass (state, newuser) {
              state.user.password = newuser.password
              state.user.email = newuser.email
            },
            setAuth (state,logged) {
              state.user.logged = logged
            }
          }, 
          actions: {
            signUserUp ({commit},newuser) {
                commit('setEmailAndPass',newuser)
                firebase.createUser({
                  email: newuser.email,
                  password: newuser.password
                }).then(
                    function (user) {
                      console.log(
                      "User"+" "+user.email+" created"
                      )              
                    }
                ) 
             },
            signUserIn ({commit}, user) {
              return new Promise ((resolve,reject) => {
                commit('setEmailAndPass',user)
                firebase.login(
                  {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                      email: user.email,
                      password: user.password
                    }
                  })
                  .then((user) => {
                    console.log(user.email+" is logged")
                    commit('setAuth',true)
                    console.log("logged: "+this.state.user.logged)
                    resolve(user)
                  })
                  .catch((error) => {
                    reject(error)
                    alert("the user not exist")
                  })
            })
          }
        },
        getters: {
            user (state) {
              return state.user
            }
          }
    })