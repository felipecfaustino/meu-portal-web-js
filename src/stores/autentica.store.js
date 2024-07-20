//import { action, makeObservable, observable } from "mobx";

class AutenticaStore {
    estaAutenticado = false;
    usuario = {email: "", token: ""};

    contructor() {
        // makeObservable(this, {
        //     estaAutenticado: observable,
        //     usuario: observable,
        //     login: action,
        //     logout: action
        // })
    }

    login(email, token) {
        this.estaAutenticado = true;
        this.usuario = {email, token};
    }

    logout(email, token) {
        this.estaAutenticado = false;
        this.usuario = {email: "", token: ""};
    }
}

const autenticaStore = new AutenticaStore();

export default autenticaStore;