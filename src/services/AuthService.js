import { api } from '../common';

export const AuthService =  {
    signup: (user) => {
        return api.post('/signup', user);
    },
    signin: (user) => {
        return api.post('/signin', user);
    }
}